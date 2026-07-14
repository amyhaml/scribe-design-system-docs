# Component page content pattern

Canonical structure for bespoke component pages in `content/components/`. Reference implementation: [`components/alert-bar.md`](components/alert-bar.md). Secondary example: [`components/button.md`](components/button.md).

Copy the annotated scaffold from [`_templates/component-page.md`](_templates/component-page.md) when starting a new page.

## Page anatomy

Sections appear in this order when present. Skip optional blocks; never reorder required blocks.

| Order | Block                   | Required                                 | Demo        |
| ----- | ----------------------- | ---------------------------------------- | ----------- |
| 1     | Overview                | Yes                                      | No          |
| 2     | Variation sections (1+) | Yes (at least one for visual components) | Usually yes |
| 3     | Guidelines              | No                                       | No          |
| 4     | Dimensions              | No                                       | Usually yes |
| 5     | Typography              | No                                       | Usually yes |
| 6     | Props                   | No                                       | Optional    |
| 7     | Related components      | No                                       | Yes         |
| 8     | Code                    | Yes                                      | Optional    |

Within variation sections, order from **most common / primary use case** → edge cases → toolkit-only or legacy patterns.

```
Overview
  → Variations (Variant catalog, Context/placement, Subgrouped variants)
  → Guidelines (optional)
  → Dimensions (optional)
  → Typography (optional)
  → Props (optional)
  → Related components (optional)
  → Code
```

## Section archetypes

### 1. Overview (required)

**Purpose:** Reader-facing summary and scope. Answers what this family does, where it appears in Scribe, how people use it, and which major variants appear on the page.

**Skeleton:**

```markdown
## Overview

{What it does and where it is used.}

{Brief mention of the major variants or contexts covered on this page.}
```

- No `<!-- demo -->`.
- Exception: if a bespoke source-truth page is replacing an existing Storybook-derived page, add one `<!-- demo -->` after the Overview prose for the Storybook reference iframe and register it as `demos.overview`.
- Keep Overview focused on component purpose, usage, and variants. Do not include source paths, CSS scope notes, fixture details, implementation caveats, or overly technical descriptions.
- If a design reference includes a state or variant that is not present in production source, do not mention that absence in Overview or other reader-facing prose. Omit it from the docs unless the user asks to track the design/source mismatch separately.
- Source paths and porting details belong in `## Code` comments, route/demo code comments, or code demo badges.

### Page description (frontmatter)

The `description` field renders under the page **h1** in the docs header. Write **1–2 sentences** that describe what the component is and where it is used — the same voice as the first lines of Overview, but tighter.

```yaml
description: Alerts and banners surface brief status and validation messages without interrupting workflow. Inline alerts appear in drawers and the composer; page-level banners communicate editor and listing state.
```

- Describe the **component for readers** (designers and engineers), not implementation (ports, Storybook, shadcn, file paths).
- Do not use the description for technical caveats; put source paths and porting notes in **Code** comments or code demo badges.

### 2. Variant catalog (most common variation section)

**Purpose:** Catalog variants with when/where each applies, then show a live demo.

**Skeleton:**

```markdown
## {Human-readable family name} {#optional-explicit-id}

Optional one-sentence intro.

- **{Variant}** — {when/where/behavior in production}.
- **{Variant}** — …

<!-- demo -->
```

- Bullet format: **bold label** + em dash + concise usage.
- Demo registry key = section `id`. Use `{#id}` on the heading when the auto-slug would not match the key in `src/components/docs/demos/`.

### 3. Subgrouped variants (one TOC entry, multiple demos)

**Purpose:** Related sub-families under one parent concept, each with its own demo.

**Skeleton:**

```markdown
## {Parent concept} {#parent-id}

**{Subgroup A}**

- **{Variant}** — …

<!-- demo -->

**{Subgroup B}**

- **{Variant}** — …

<!-- demo -->
```

- Register `demos["parent-id"]` as an **array** of React nodes in the same order as `<!-- demo -->` markers.

### 4. Guidelines (optional)

**Purpose:** UX copy, accessibility, tone, do/don't. Prose and/or bullets only — usually no demo.

**Skeleton:**

```markdown
## {Guideline topic}

{Rule or principle.}

- {Concrete pattern with examples in italics.}
```

Reference: **Language** on alert-bar.

### 5. Dimensions (optional)

**Purpose:** A single design axis — alignment, size, density, placement.

**Skeleton:**

```markdown
## {Axis name}

- **{Value}** — {where it applies}.
- **{Value}** — …

<!-- demo -->
```

Reference: **Alignment** on alert-bar. A minimal form (short intro + demo only, no bullets) is acceptable when the axis is self-explanatory — see **Sizes** on button.

### 6. Context / placement (optional variation flavor)

**Purpose:** Where in the product UI the pattern appears. Same skeleton as variant catalog; name the section after the **surface** (Editor toolbar, Drawer fields), not a CSS prop or API name.

Reference: **Editor toolbar** sections on button.

### 7. Typography (optional)

**Purpose:** Which text styles apply to this component — size, weight, and links to foundation tokens. Use when typography is non-obvious or differs from body defaults.

**Skeleton:**

```markdown
## Typography

{Short note on label/body styles and any token caveats.}

<!-- demo -->
```

- Demo is usually a **slot table** (element → token → size) wired via `src/data/component-typography-slots.ts` when a spec exists for the slug.
- Link token names to `/foundations/typography#…` anchors in the demo table.

Reference: **Typography** on button.

### 8. Props (optional)

**Purpose:** API surface that designers or engineers need to know but that is not a visual variant section — e.g. a toolkit prop rarely used in Scribe production. **Omit the section** when props are standard or unused in the product (do not document toolkit-only APIs for their own sake).

**Skeleton:**

```markdown
## Props {#props}

{When this prop matters and where it appears in Scribe — or omit the whole section if unused.}

- **{propName}** — {values and typical call sites}.

<!-- demo -->   ← optional table or interactive example
```

- Place **after Typography** and **before Related components / Code** when present.
- Prefer variation sections for product-facing visual patterns; reserve Props for edge-case API documentation.

### 9. Related components (optional)

**Purpose:** Point readers to a sibling component that solves a different job. Prose links to that component's docs page; a live demo previews what it looks like on this page. **Always last** among optional sections — immediately before Code.

**Skeleton:**

```markdown
## Related components {#related}

[{Component name}](/components/{slug}) — {brief description and when to use it instead}.

<!-- demo -->
```

- Link the component name to its docs route (e.g. `/components/snackbar`). If that page is not built yet, keep the link — it will work when the page ships.
- Register `demos["related"]` (or match the section `{#id}`) with a preview of the related component, not a duplicate of content already on this page.

### 10. Code (required, always last)

**Purpose:** Representative usage snippets for engineers. No introductory prose about import paths — use the optional demo and inline code comments instead.

**Skeleton:**

```markdown
## Code

<!-- demo -->

\`\`\`tsx
// Monorepo paths and port notes as comments when helpful
import { Example } from "components/path/Example";

<Example />
\`\`\`
```

**Code demo** (`demos["code"]`) — optional badges above the fenced block:

- **Port path** — e.g. `@/components/scribe → ToolkitButton` (outline badge)
- **Summary** — e.g. `10 variants · 3 sizes` when useful (secondary badge)

Wire badges in `src/components/docs/demos/{slug}-demos.tsx`. Reference: button `code` demo.

- Do not add a `Sources:` line or a paragraph like “Import paths from the Scribe monorepo…”.
- File paths belong in code comments inside the fenced block when they aid discovery.

## Demo + prose rules

Block spacing is automatic via [`DocSectionStack`](../src/components/docs/DocSectionStack.tsx) — do not add blank lines in markdown for vertical rhythm. See [Block spacing](README.md#block-spacing) in the vault README.

| Pattern | When |
|---------|------|
| **Bullets then demo** | Default — demo at section end after variant bullets |
| **Subgrouped variants** | Demo immediately after each bullet group |
| **Code + demo** | Badges (`port → Component`, optional counts) then fenced snippet — no import-path prose |

## Source-of-truth porting for bespoke pages

When a bespoke page brings in a component from Scribe, inspect the production Scribe source first and port that component into the docs demo 1:1. Do **not** invent, recreate, restyle, simplify, rename props, alter markup, or change behavior unless the user explicitly asks for a deliberate docs-only adaptation.

- The component implementation, props, behavior, visual structure, and styling must come directly from the existing Scribe source.
- Docs-only wrappers are allowed only for mounting, demo framing, layout, or CSS-variable scoping. Keep those wrappers clearly separate from the ported component.
- Record source paths in fenced `## Code` comments, route/demo code comments, or code demo badges when they help readers trace the docs page back to production.
- If a 1:1 port is blocked by missing dependencies or product context, document the blocker and ask before substituting an approximation.
- If a Figma/design-only state, variant, or interaction does not exist in production source, do not add reader-facing text explaining the gap. Treat it as source/design drift for internal follow-up, not component guidance.

## Frontmatter + TOC

```yaml
---
title: Component name
description: One or two sentences — what it is and where it appears in Scribe. Shown under the h1.
route: /components/your-slug
category: components
breadcrumbs:
  - label: Components
  - label: Component name
toc:
  - id: overview
    label: Overview
  # … variation / guideline / dimension / typography / props / related sections …
  - id: code
    label: Code
---
```

- `description` — 1–2 sentences describing the component; not implementation notes (see **Page description** under Overview).
- `toc` order must match `##` heading order on the page.
- Required entries: `overview`, `code`.
- Use product-language labels (`Inline alerts`, `Banner`, `Editor toolbar`) — not generic names like `Variants`.
- When a heading uses `{#custom-id}`, set `toc.id` to that same id.

## What stays in code (not markdown)

| Markdown owns | Demo file owns |
|---------------|----------------|
| What each variant is | Layout, grid, demo chrome |
| When/where it is used | Production copy constants |
| Guidelines and copy rules | Labels inside demo UI |
| Typography slot mapping | Typography table demo + `component-typography-slots.ts` |
| Props documentation (when used) | Props table or interactive demo |
| Import paths and snippets | Code demo badges + comments inside fenced block |
| — | Figma deep link in `component-figma-links.ts` + route `headerExtra` |

**Bespoke** pages (Button, Alert & Banner): live demos in `src/components/docs/demos/{slug}-demos.tsx`, wired via `DocPageSections`.

For bespoke pages, the demo file must port the production Scribe component 1:1. Demo chrome can frame or mount the component, but it must not replace the source component with an invented approximation.

**Hybrid** pages (all other Storybook components): variation demos are Storybook iframes injected by [`components.$slug.tsx`](../src/routes/components.$slug.tsx) — one section per story. See **Storybook components (hybrid)** below.

## Open in Figma (when the library has a page)

Component pages should show an **Open in Figma** button beside the page title when the component has a frame in the [Scribe Component Library](https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library). This is **not** markdown — register the slug in [`component-figma-links.ts`](../src/data/component-figma-links.ts). Bespoke routes pass `headerExtra` manually; the hybrid route reads the registry automatically.

---

## Alert-bar walkthrough

Maps every `##` on [`components/alert-bar.md`](components/alert-bar.md) to an archetype:

| Section | Archetype | Demo |
|---------|-----------|------|
| Overview | Overview | — |
| Inline alerts | Variant catalog | `demos["inline-alerts"]` |
| Language | Guidelines | — |
| Alignment | Dimensions | `demos["alignment"]` |
| Banner | Subgrouped variants | `demos["banner"]` = `[statusDemo, notificationDemo]` |
| Related components | Related components | `demos["related"]` |
| Code | Code | — |

## Button reference

[`components/button.md`](components/button.md) uses the same anatomy:

| Section | Archetype | Demo |
|---------|-----------|------|
| Overview | Overview | — |
| Editor toolbar, status, split, sizes, flex, transparent | Context / placement, Dimensions, Variant catalog | per section `id` |
| Typography | Typography | `demos["typography"]` — slot table |
| Code | Code | `demos["code"]` (optional badge demo) |

- **Code** opens with `<!-- demo -->` for port/summary badges, then the fenced block — no import-path paragraph.
- **Props** omitted — toolkit `variant` is not a Scribe product pattern; no Props section needed.

## Storybook components (hybrid)

Most components use the **hybrid** track: markdown vault prose + Storybook iframe demos on the shared [`components.$slug`](../src/routes/components.$slug.tsx) route.

| Track | Examples | Route | Variation demos | Markdown |
|-------|----------|-------|-----------------|----------|
| **Bespoke** | Button, Alert & Banner | Dedicated `components.{slug}.tsx` | Ported React (`demos/{slug}-demos.tsx`) | Full pattern sections |
| **Hybrid** | Avatar, Drawer, Card, … | `components.$slug.tsx` | One `DocsSection` per Storybook story | `description` + `## Overview` + optional extra sections |

### What lives where (hybrid)

| In `content/components/{slug}.md` | In route code |
|-----------------------------------|---------------|
| `description` (1–2 sentences under h1) | Storybook story → variation `DocsSection` + iframe |
| `## Overview` | Typography table when `component-typography-slots.ts` has a spec |
| Optional: Guidelines, Related, etc. | Code badges + import snippet |
| `toc` with story ids for “On this page” | Open in Figma when `component-figma-links.ts` has the slug |

Do **not** add `<!-- demo -->` markers for Storybook stories in hybrid markdown — the route injects previews from `index.json`.

When a Storybook story title is the same as the generated section title, show only the higher-level `DocsSection` heading. Do not repeat the same title inside the story preview card.

### Scaffold and refresh

```bash
npm run scaffold:components          # create missing hybrid vault files from Storybook
npm run scaffold:components -- --force  # regenerate hybrid vault files
npm run refresh:component-content    # update description + Overview from Storybook metadata
```

Template: [`_templates/component-page-storybook.md`](_templates/component-page-storybook.md). Helpers: [`src/lib/docs/storybook-component-page.tsx`](../src/lib/docs/storybook-component-page.tsx).

---

## New page checklist

### Bespoke (ported demos)

- [ ] Copy [`_templates/component-page.md`](_templates/component-page.md) → `components/{slug}.md`
- [ ] Inspect production Scribe source and port the requested component 1:1 before writing demos
- [ ] Frontmatter: `title`, `description` (1–2 sentences under h1), `route`, `breadcrumbs`, full `toc`
- [ ] `## Overview` — summary + production caveat
- [ ] At least one variation section with `<!-- demo -->` and matching demo registry key
- [ ] Add `{#id}` on headings when auto-slug ≠ demo key
- [ ] Optional sections only when applicable (guidelines, dimensions, typography, props, related)
- [ ] `## Code` last — fenced snippet; optional `demos["code"]` badges
- [ ] Create `src/components/docs/demos/{slug}-demos.tsx` and dedicated route
- [ ] Figma: `component-figma-links.ts` + route `headerExtra`
- [ ] Pin in `AppSidebar.tsx` if needed

### Hybrid (Storybook)

- [ ] Run `npm run scaffold:components` or copy [`_templates/component-page-storybook.md`](_templates/component-page-storybook.md)
- [ ] Refine `description` and `## Overview` (run `npm run refresh:component-content` for a baseline)
- [ ] Ensure `toc` lists `overview`, each story id, `code`
- [ ] Add optional vault sections (Related, Guidelines, …) before Code when needed
- [ ] Figma: add `node-id` to `component-figma-links.ts` (header button is automatic on hybrid route)
