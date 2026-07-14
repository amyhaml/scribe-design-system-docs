import { parseDoc, type ParsedDoc } from "./parse-doc";

const rawModules = import.meta.glob("../../../content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const docCache = new Map<string, ParsedDoc>();

function normalizeDocKey(globPath: string): string {
  return globPath.replace(/^.*\/content\//, "").replace(/\.md$/, "");
}

for (const [path, raw] of Object.entries(rawModules)) {
  const key = normalizeDocKey(path);
  if (key.startsWith("_templates/") || key === "README") continue;
  docCache.set(key, parseDoc(raw));
}

/** Load a parsed doc by path relative to `content/` (no `.md` extension). */
export function getDoc(relativePath: string): ParsedDoc {
  const key = relativePath.replace(/^\//, "").replace(/\.md$/, "");
  const doc = docCache.get(key);
  if (!doc) {
    throw new Error(
      `Missing content doc: content/${key}.md (available: ${[...docCache.keys()].join(", ")})`,
    );
  }
  return doc;
}

/** Returns null when no markdown file exists (e.g. optional Storybook overrides). */
export function getDocOptional(relativePath: string): ParsedDoc | null {
  const key = relativePath.replace(/^\//, "").replace(/\.md$/, "");
  return docCache.get(key) ?? null;
}

export function listDocKeys(): string[] {
  return [...docCache.keys()];
}
