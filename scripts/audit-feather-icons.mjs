import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import * as FeatherIcons from "react-feather";

const __dirname = dirname(fileURLToPath(import.meta.url));

const FEATHER_SLUG_OVERRIDES = {
  github: "GitHub",
};

function slugToComponentName(slug) {
  if (slug in FEATHER_SLUG_OVERRIDES) return FEATHER_SLUG_OVERRIDES[slug];
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function loadFeatherSlugs() {
  const src = readFileSync(join(__dirname, "../src/data/feather-icon-slugs.ts"), "utf8");
  const match = src.match(/export const FEATHER_ICON_SLUGS = \[([\s\S]*?)\] as const/);
  if (!match) {
    throw new Error("Could not parse FEATHER_ICON_SLUGS from feather-icon-slugs.ts");
  }
  return [...match[1].matchAll(/"([a-z0-9-]+)"/g)].map(([, slug]) => slug);
}

const slugs = loadFeatherSlugs();
const missing = slugs.filter((slug) => !(slugToComponentName(slug) in FeatherIcons));

if (missing.length > 0) {
  console.error(`[audit:icons] ${missing.length} slug(s) missing from react-feather:`);
  for (const slug of missing) {
    console.error(`  - ${slug} (expected ${slugToComponentName(slug)})`);
  }
  process.exit(1);
}

console.log(`[audit:icons] OK — all ${slugs.length} feather slugs resolve to react-feather components.`);
