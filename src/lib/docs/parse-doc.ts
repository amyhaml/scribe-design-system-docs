export type DocBreadcrumb = { label: string; to?: string };

export type DocTocItem = { id: string; label: string };

export type DocFrontmatter = {
  title: string;
  description?: string;
  route?: string;
  category?: string;
  breadcrumbs?: DocBreadcrumb[];
  toc?: DocTocItem[];
};

export type DocContentBlock = { type: "prose"; content: string } | { type: "demo" };

export type DocSection = {
  id: string;
  title: string;
  content: string;
  proseBefore: string;
  proseAfter: string;
  blocks: DocContentBlock[];
};

export type ParsedDoc = {
  frontmatter: DocFrontmatter;
  sections: DocSection[];
};

const DEMO_MARKER = "<!-- demo -->";
const SKILL_GUIDANCE_START_MARKER = "<!-- scribe-skill-guidance:start -->";
const SKILL_GUIDANCE_END_MARKER = "<!-- scribe-skill-guidance:end -->";
const SKILL_GUIDANCE_BLOCK_RE = /<!-- scribe-skill-guidance:start -->[\s\S]*?<!-- scribe-skill-guidance:end -->\s*/g;

const HEADING_RE = /^## (.+?)(?:\s+\{#([a-z0-9-]+)\})?\s*$/;
const FRONTMATTER_RE = /^---\s*\n([\s\S]*?)\n---\s*\n?/;

export { DEMO_MARKER, SKILL_GUIDANCE_END_MARKER, SKILL_GUIDANCE_START_MARKER };

export function sectionHasDemoMarker(section: DocSection): boolean {
  return section.content.includes(DEMO_MARKER);
}

function headingToId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function splitContentBlocks(content: string): DocContentBlock[] {
  if (!content.includes(DEMO_MARKER)) {
    const trimmed = content.trim();
    return trimmed ? [{ type: "prose", content: trimmed }] : [];
  }

  const segments = content.split(DEMO_MARKER);
  const blocks: DocContentBlock[] = [];

  segments.forEach((segment, index) => {
    const trimmed = segment.trim();
    if (trimmed) blocks.push({ type: "prose", content: trimmed });
    if (index < segments.length - 1) blocks.push({ type: "demo" });
  });

  return blocks;
}

function splitDemoContent(content: string): { proseBefore: string; proseAfter: string } {
  const idx = content.indexOf(DEMO_MARKER);
  if (idx === -1) {
    return { proseBefore: content.trim(), proseAfter: "" };
  }
  const lastIdx = content.lastIndexOf(DEMO_MARKER);
  return {
    proseBefore: content.slice(0, idx).trim(),
    proseAfter: content.slice(lastIdx + DEMO_MARKER.length).trim(),
  };
}

function parseSections(body: string): DocSection[] {
  const lines = body.split("\n");
  const sections: DocSection[] = [];
  let current: { title: string; id: string; lines: string[] } | null = null;

  const flush = () => {
    if (!current) return;
    const content = current.lines.join("\n").trim();
    const { proseBefore, proseAfter } = splitDemoContent(content);
    sections.push({
      id: current.id,
      title: current.title,
      content,
      proseBefore,
      proseAfter,
      blocks: splitContentBlocks(content),
    });
  };

  for (const line of lines) {
    const match = line.match(HEADING_RE);
    if (match) {
      flush();
      const title = match[1].trim();
      current = {
        title,
        id: match[2] ?? headingToId(title),
        lines: [],
      };
      continue;
    }
    if (current) current.lines.push(line);
  }

  flush();
  return sections;
}

function parseScalar(value: string): string {
  const trimmed = value.trim();
  const quoted = trimmed.match(/^["'](.*)["']$/);
  return quoted ? quoted[1] : trimmed;
}

function parseFrontmatter(raw: string): { frontmatter: DocFrontmatter; content: string } {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) return { frontmatter: { title: "" }, content: raw };

  const frontmatter: Record<string, unknown> = {};
  let currentArrayKey: string | null = null;
  let currentArrayItem: Record<string, string> | null = null;

  for (const line of match[1].split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const topLevel = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (topLevel) {
      const [, key, value] = topLevel;
      currentArrayKey = null;
      currentArrayItem = null;

      if (!value.trim()) {
        frontmatter[key] = [];
        currentArrayKey = key;
        continue;
      }

      frontmatter[key] = parseScalar(value);
      continue;
    }

    const arrayItem = line.match(/^\s*-\s+([A-Za-z0-9_-]+):\s*(.*)$/);
    if (arrayItem && currentArrayKey) {
      const [, key, value] = arrayItem;
      currentArrayItem = { [key]: parseScalar(value) };
      (frontmatter[currentArrayKey] as Record<string, string>[]).push(currentArrayItem);
      continue;
    }

    const nestedValue = line.match(/^\s+([A-Za-z0-9_-]+):\s*(.*)$/);
    if (nestedValue && currentArrayItem) {
      const [, key, value] = nestedValue;
      currentArrayItem[key] = parseScalar(value);
    }
  }

  return {
    frontmatter: frontmatter as DocFrontmatter,
    content: raw.slice(match[0].length),
  };
}

export function stripSiteOnlySkillGuidance(content: string): string {
  return content.replace(SKILL_GUIDANCE_BLOCK_RE, "").trim();
}

export function parseDoc(raw: string): ParsedDoc {
  const { frontmatter, content } = parseFrontmatter(raw);

  return {
    frontmatter,
    sections: parseSections(stripSiteOnlySkillGuidance(content)),
  };
}

export function getTocFromDoc(doc: ParsedDoc): DocTocItem[] {
  if (doc.frontmatter.toc?.length) return doc.frontmatter.toc;
  return doc.sections.map((s) => ({ id: s.id, label: s.title }));
}
