#!/usr/bin/env node
/**
 * Refresh description + Overview on hybrid Storybook component vault pages.
 * Updates frontmatter/body via string ops (avoids YAML re-parse issues on story labels with colons).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content/components");
const STORYBOOK_INDEX = "https://scribe.kubefeature.hearstapps.net/storybook/index.json";

const SKIP_SLUGS = new Set(["button", "alert-bar"]);

const GROUP_ALIASES = { shared: "Shared", icons: "Icons", components: "Components" };

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseTitle(title) {
  if (title.includes("/")) {
    const segments = title.split("/");
    const group = GROUP_ALIASES[segments[0].toLowerCase()] ?? segments[0];
    return { group, displayName: segments.slice(1).join(" / ") };
  }
  return { group: "Components", displayName: title };
}

function buildComponentList(index) {
  const byTitle = new Map();
  for (const entry of Object.values(index.entries)) {
    if (entry.type !== "story") continue;
    const existing = byTitle.get(entry.title);
    if (existing) {
      existing.stories.push(entry);
      continue;
    }
    const { group, displayName } = parseTitle(entry.title);
    byTitle.set(entry.title, { slug: slugify(entry.title), displayName, group, stories: [entry] });
  }
  return [...byTitle.values()];
}

function inferPurpose(name) {
  const n = name.toLowerCase();
  if (n.includes("drawer")) return "slide-out panels for editing content settings and metadata";
  if (n.includes("dialog") || n.includes("modal")) return "focused overlays for confirmations and short tasks";
  if (n.includes("toolbar")) return "horizontal action bars at the top of editor and listing surfaces";
  if (n.includes("table") || n.includes("listing")) return "tabular and list layouts for browsing content";
  if (n.includes("pagination")) return "moving between pages of list results";
  if (n.includes("checkbox") || n.includes("radio")) return "selecting one or more options in forms";
  if (n.includes("chip")) return "compact labels and filters in dense UI";
  if (n.includes("avatar")) return "representing people or entities with photo or initials";
  if (n.includes("card")) return "grouping related content in a contained surface";
  if (n.includes("error") || n.includes("validation")) return "communicating validation and failure states";
  if (n.includes("notification") || n.includes("status bar")) return "page-level status and system messages";
  if (n.includes("search")) return "finding and filtering content in lists and pickers";
  if (n.includes("icon")) return "iconography and symbolic affordances across the UI";
  if (n.includes("sidebar") || n.includes("navigation")) return "wayfinding and section navigation";
  if (n.includes("preview")) return "previewing content before publish or share";
  if (n.includes("filter")) return "narrowing lists and search results";
  if (n.includes("textarea") || n.includes("input")) return "collecting user text input in forms";
  if (n.includes("popover")) return "contextual content anchored to a trigger control";
  if (n.includes("header")) return "page titles, metadata, and top-level actions";
  return "common interaction patterns in Scribe product surfaces";
}

function buildCopy(component) {
  const name = component.displayName;
  const purpose = inferPurpose(name);
  const surface =
    component.group === "Shared"
      ? "shared surfaces across the product"
      : component.group === "Icons"
        ? "icon usage across the product"
        : "authoring and content-management workflows";

  const description = `${name} is used for ${purpose} in ${surface}.`;

  const variantLine =
    component.stories.length === 1
      ? "The live preview below matches the Storybook story used in design and QA."
      : `The ${component.stories.length} previews below map to Storybook variants used in design and QA.`;

  const overview = `${name} supports ${purpose} in Scribe. ${variantLine}`;

  return { description, overview };
}

function yamlQuote(s) {
  return JSON.stringify(s);
}

function quoteTocLabels(frontmatter) {
  return frontmatter.replace(/^(\s+label:\s*)(.+)$/gm, (_match, prefix, label) => {
    const trimmed = label.trim();
    if (trimmed.startsWith('"') || trimmed.startsWith("'")) return `${prefix}${trimmed}`;
    return `${prefix}${JSON.stringify(trimmed)}`;
  });
}

function replaceOverviewSection(content, overview) {
  const trimmed = content.trim();
  const rest = trimmed.replace(/^## Overview\b[\s\S]*?(?=\n## |$)/, "").trim();
  return rest ? `## Overview\n\n${overview}\n\n${rest}\n` : `## Overview\n\n${overview}\n`;
}

function updateFile(raw, description, overview) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return raw;
  let frontmatter = quoteTocLabels(match[1]);
  let body = match[2];

  if (/^description:/m.test(frontmatter)) {
    frontmatter = frontmatter.replace(/^description:.*$/m, `description: ${yamlQuote(description)}`);
  } else {
    frontmatter = `description: ${yamlQuote(description)}\n${frontmatter}`;
  }

  body = replaceOverviewSection(body, overview);
  return `---\n${frontmatter.trimEnd()}\n---\n\n${body.trimStart()}`;
}

async function main() {
  const res = await fetch(STORYBOOK_INDEX);
  if (!res.ok) throw new Error(`Storybook index HTTP ${res.status}`);
  const index = await res.json();
  const bySlug = new Map(buildComponentList(index).map((c) => [c.slug, c]));

  let updated = 0;
  for (const file of fs.readdirSync(CONTENT_DIR)) {
    if (!file.endsWith(".md")) continue;
    const slug = file.replace(/\.md$/, "");
    if (SKIP_SLUGS.has(slug)) continue;

    const component = bySlug.get(slug);
    if (!component) continue;

    const filePath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { description, overview } = buildCopy(component);
    fs.writeFileSync(filePath, updateFile(raw, description, overview), "utf8");
    updated += 1;
  }

  console.log(`Refreshed content on ${updated} component page(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
