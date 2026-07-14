# Scribe Design System — content vault

This folder is the **single source of truth** for documentation prose. Open it as an [Obsidian](https://obsidian.md) vault (or edit files in Cursor) — changes save to disk and the docs site hot-reloads when `npm run dev` is running.

## Folder layout

| Path | Route |
|------|-------|
| `getting-started/introduction.md` | `/` |
| `foundations/{token}.md` | `/foundations/{token}` |
| `components/{slug}.md` | `/components/{slug}` (bespoke + hybrid Storybook pages) |

## Frontmatter

```yaml
---
title: Page title
description: Shown under the h1 — 1–2 sentences describing what the component is and where it is used (not implementation notes).
route: /components/example
category: components
breadcrumbs:
  - label: Components
  - label: Example
toc:
  - id: overview
    label: Overview
---
```

- `toc` is optional — if omitted, sections are derived from `##` headings.
- Use `{#custom-id}` on a heading when the auto slug does not match the anchor you need, e.g. `## Editor toolbar (draft) {#editor-toolbar}`.
- Quote `toc` labels that contain colons: `label: "4. Example: Inside a Button"`

## Sections

Each `## Heading` becomes a `DocsSection` on the site.

### Live demos

**Bespoke** pages (Button, Alert & Banner) render React demos between prose blocks:

```markdown
<!-- demo -->
```

**Hybrid** Storybook pages do not use `<!-- demo -->` for variations — each Storybook story is rendered as its own section by [`components.$slug.tsx`](../src/routes/components.$slug.tsx). See [COMPONENT-PAGE-PATTERN.md § Storybook components (hybrid)](COMPONENT-PAGE-PATTERN.md#storybook-components-hybrid).

### Block spacing

Each section renders its content as a **block stack** (prose → demo → prose → …). [`DocSectionStack`](../src/components/docs/DocSectionStack.tsx) applies consistent vertical gap between blocks automatically — you do not need extra blank lines in markdown for spacing.

- A demo **between** prose blocks gets breathing room above and below.
- A demo at the **end** of a section only gets gap above it (no dead space below before the next `##` section).

The section `id` (used as the demo registry key) comes from the `##` heading. When the auto-generated slug would not match the demo key in `src/components/docs/demos/`, add an explicit anchor on the heading:

```markdown
## Editor toolbar (draft) {#editor-toolbar}
```

**Rule:** any bespoke section with `<!-- demo -->` must use `{#id}` matching the demo registry key when the auto-slug would differ (e.g. `flex-button` vs `flex`).

## Adding a component page

Follow [`COMPONENT-PAGE-PATTERN.md`](COMPONENT-PAGE-PATTERN.md).

### Bespoke (ported demos)

1. Copy `_templates/component-page.md` to `components/your-slug.md`.
2. Add `src/routes/components.your-slug.tsx` with `DocPageSections` + `demos` map.
3. Register Figma `node-id` in `src/data/component-figma-links.ts` and wire `headerExtra`.
4. Pin in `AppSidebar.tsx` if needed.

### Hybrid (Storybook)

1. Run `npm run scaffold:components` to create `components/{slug}.md` from Storybook (or copy `_templates/component-page-storybook.md`).
2. Refine `description` and `## Overview`; run `npm run refresh:component-content` for a metadata baseline.
3. Register Figma `node-id` in `component-figma-links.ts` when available (Open in Figma appears automatically).

## What stays in code

- Storybook iframe previews (hybrid variation sections)
- Token swatches, spacing bars, elevation visuals
- Live Scribe component ports (bespoke demos in `src/components/docs/demos/`)
- Data tables driven by `src/data/`
