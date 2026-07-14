---
title: Component name
description: One or two sentences — what the component is and where it appears in Scribe (shown under the h1).
route: /components/your-slug
category: components
breadcrumbs:
  - label: Components
  - label: Component name
toc:
  - id: overview
    label: Overview
  - id: primary-variations
    label: Primary variations
  # - id: guideline-topic
  #   label: Guideline topic
  # - id: axis-name
  #   label: Axis name
  # - id: related
  #   label: Related components
  # - id: typography
  #   label: Typography
  # - id: props
  #   label: Props
  - id: code
    label: Code
---

Structure reference: [COMPONENT-PAGE-PATTERN.md](../COMPONENT-PAGE-PATTERN.md)

## Overview

REQUIRED — no demo. Reader-facing summary of component purpose, usage, and major variants.

{What this component family does and where it appears in Scribe.}

{Brief mention of the major variants or contexts covered on this page.}

Do not include source paths, CSS scope notes, fixture details, implementation caveats, design/source mismatch notes, or overly technical descriptions here. Put source paths and useful porting notes in `## Code` comments or code demo badges.

If a design reference includes a state or variant that is not present in production source, omit it from reader-facing docs unless the user asks to track that mismatch separately.

If this page replaces an existing Storybook-derived page, add one Storybook reference demo here and register it as `demos.overview`. Otherwise, do not add a demo in Overview.

## Primary variations {#primary-variations}

REQUIRED (at least one variation section) — variant catalog archetype.

Optional one-sentence intro.

- **{Variant A}** — {when/where/behavior in production}.
- **{Variant B}** — …

<!-- demo -->

## Code

REQUIRED — always last. Optional `<!-- demo -->` for port-path badges (see button), then fenced snippet only — no import-path prose.

```tsx
import { Example } from "components/path/Example";

<Example />
```

---

Optional sections (copy from [COMPONENT-PAGE-PATTERN.md](../COMPONENT-PAGE-PATTERN.md) when applicable; insert between Primary variations and Code):

- **Open in Figma** — register `node-id` in `src/data/component-figma-links.ts` + route `headerExtra` when the component has a library page

- **Context / placement** — `## Editor toolbar {#editor-toolbar}` + prose + demo
- **Subgrouped variants** — one `##` with bold subgroups, multiple demo markers; `demos["id"]` as array
- **Guidelines** — UX copy rules, no demo (see alert-bar Language)
- **Dimensions** — axis bullets + demo (see alert-bar Alignment)
- **Typography** — text styles + token table demo (see button Typography); register in `component-typography-slots.ts` when needed
- **Props** — optional API docs with demo when relevant; omit if unused in Scribe (button omits toolkit-only props)
- **Related components** — last optional section before Code; link to `/components/{slug}` + demo preview (see alert-bar Snackbars)
