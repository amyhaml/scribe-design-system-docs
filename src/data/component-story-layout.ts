/**
 * Layout for Storybook stories on `/components/:slug`.
 *
 * - **stack** (default): every story gets a full-width labeled block — works for any size.
 * - **row**: stories render in a wrapping horizontal strip with compact iframes — only for
 *   small, narrow UIs (pagination, chips, icon rows). Do not use for full-width tables, drawers,
 *   or docs-style canvases.
 *
 * Add a slug here only after checking all of that component’s stories fit comfortably side-by-side.
 * Slugs match `slugify(title)` from Storybook (e.g. `Components/Pagination` → `components-pagination`).
 */
export type StoryLayoutMode = "stack" | "row";

const ROW_LAYOUT_SLUGS = new Set<string>([
  // e.g. "components-pagination" once the docs slug matches Storybook `slugify(title)`.
]);

export function getStoryLayoutForSlug(slug: string): StoryLayoutMode {
  return ROW_LAYOUT_SLUGS.has(slug) ? "row" : "stack";
}
