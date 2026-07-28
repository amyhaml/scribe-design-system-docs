# Scribe Design System — content vault

This folder is the **single source of truth** for documentation prose. Open it as an [Obsidian](https://obsidian.md) vault (or edit files in Cursor) — changes save to disk and the docs site hot-reloads when `npm run dev` is running.

## Folder layout

| Path | Route |
|------|-------|
| `getting-started/overview.md` | `/` |
| `templates.md` | `/templates` page headline/dek and template card copy |
| `AI-DESIGN-GUIDE.md` | Published AI-facing component-choice and foundation guidance |
| `foundations/{token}.md` | `/foundations/{token}` |
| `components/{slug}.md` | `/components/{slug}` (bespoke + hybrid Storybook pages) |
| `_templates/template-gallery-entry.md` | Source scaffold for `/templates` gallery entries |

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

## Adding a template gallery entry

Follow [`TEMPLATE-GALLERY-PATTERN.md`](TEMPLATE-GALLERY-PATTERN.md) before adding or revising an entry in `/templates`.

1. Copy `_templates/template-gallery-entry.md` and complete the source details.
2. Add the card title and description as a `## Title {#id}` section in `templates.md`.
3. Add the approved local preview snapshot at `public/templates/<id>-preview.png`.
4. Register categories, URLs, and preview metadata in `src/data/templates.ts`; standard feature-url entries inherit cards, filtering, modal previews, and Scribe/Figma actions from the shared Templates route.

`templates.md` is the editable source for reader-facing Templates copy. Its normal Markdown sections are intentionally used instead of a frontmatter array so the card text is easy to edit in Obsidian. `src/data/templates.ts` deliberately excludes titles and descriptions, and the build fails if section IDs do not match exactly.

## Resource card copy

Overview and Logo resource-card titles and descriptions are also vault-owned. Edit their readable `## Title {#id}` Markdown sections in `getting-started/overview.md` and `foundations/logo.md`; TypeScript retains the destinations, icons, images, and download behavior. Their section IDs must match the corresponding code-owned card definitions exactly.

## What stays in code

- Storybook iframe previews (hybrid variation sections)
- Token swatches, spacing bars, elevation visuals
- Live Scribe component ports (bespoke demos in `src/components/docs/demos/`)
- Data tables driven by `src/data/`

## AI design guidance

[`AI-DESIGN-GUIDE.md`](AI-DESIGN-GUIDE.md) is the readable, published decision guide consumed by the installable `scribe-design-guidance` skill. The skill is intended to activate for normal Scribe UI creation, modification, review, and design-decision prompts. Update the guide when a component comparison, typography, semantic-color, spacing, or accessibility rule needs to guide AI-assisted Scribe design work.

Keep it design-focused: component purpose, decision criteria, and foundation usage belong there. Imports, implementation details, source paths, docs-only ports, and `## Code` content must stay out of the guide.

The skill is installed per designer in `~/.codex/skills`, never in `Media-Platforms/scribe`. Implicit activation is best-effort; `$scribe-design-guidance` remains the deterministic fallback for vague prompts.
