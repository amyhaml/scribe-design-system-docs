/**
 * Maps docs component slugs (same as `/components/$slug` and `ComponentDoc.slug` from Storybook
 * `slugify(title)` in `src/lib/storybook.ts`) to Figma deep links in the Scribe Component Library.
 *
 * **How to add a link**
 * 1. Open the component frame in Figma → right‑click → *Copy link to selection*.
 * 2. From the URL, copy the `node-id` query value (e.g. `41-2174` — Figma uses hyphens instead of colons).
 * 3. Find the docs slug: open the component page in this site; the path is `/components/<slug>`.
 * 4. Add a row: `<slug>: '<node-id-from-url>'` to `FIGMA_NODE_ID_BY_DOC_SLUG` below.
 *
 * If a slug is missing, preview panels show no Figma button (Storybook / Open still appear).
 *
 * Library: https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library
 */
export const SCRIBE_FIGMA_LIBRARY_FILE_KEY = "j9rEb1JK8RdH7bs1Q74qJK";

const FIGMA_LIBRARY_CANONICAL_NAME = "Scribe-Component-Library";

/**
 * Docs slug → Figma `node-id` query value only (e.g. `41-2174`), not a full URL.
 * Keys must match `slug` from `buildComponentList` / the dynamic route param.
 */
const FIGMA_NODE_ID_BY_DOC_SLUG: Partial<Record<string, string>> = {
  /** Alert & Banner — [Scribe Component Library](https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library?node-id=11715-88323) */
  "alert-bar": "11715-88323",
  /** App Bar — [Scribe Component Library](https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library?node-id=14881-27064) */
  "app-bar": "14881-27064",
  /** Asset Bar — [Scribe Component Library](https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library?node-id=14881-27075) */
  "asset-bar": "14881-27075",
  /** Button — [Scribe Component Library](https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library?node-id=41-2174) */
  button: "41-2174",
  /** Card — [Scribe Component Library](https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library?node-id=56-3175) */
  card: "56-3175",
  /** Checkbox — [Scribe Component Library](https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library?node-id=11715-88420) */
  checkbox: "11715-88420",
  /** Chip — [Scribe Component Library](https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library?node-id=8372-114306) */
  chip: "8372-114306",
  /** Dialog — [Scribe Component Library](https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library?node-id=698-34457) */
  dialog: "698-34457",
  /** Dropzone — [Scribe Component Library](https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library?node-id=646-0) */
  dropzone: "646-0",
  /** Field — [Scribe Component Library](https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library?node-id=14926-76085) */
  field: "14926-76085",
  /** Filter — [Scribe Component Library](https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library?node-id=11723-88468) */
  filter: "11723-88468",
  /** Menu — [Scribe Component Library](https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library?node-id=11715-88417) */
  menu: "11715-88417",
};

export function getFigmaUrlForDocSlug(slug: string): string | undefined {
  const nodeId = FIGMA_NODE_ID_BY_DOC_SLUG[slug];
  if (!nodeId) return undefined;

  const base = `https://www.figma.com/design/${SCRIBE_FIGMA_LIBRARY_FILE_KEY}/${FIGMA_LIBRARY_CANONICAL_NAME}`;
  const params = new URLSearchParams({ "node-id": nodeId, p: "f" });
  return `${base}?${params.toString()}`;
}
