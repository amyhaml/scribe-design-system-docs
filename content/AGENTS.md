# Agent Instructions

This directory is the Obsidian-compatible content vault for the Scribe Design System docs site. Documentation prose lives here; treat this folder as the source of truth for docs copy.

## Before Creating Or Editing Content

Before creating a new documentation page, component page, or substantial content update, read these files in full:

- `README.md`
- `COMPONENT-PAGE-PATTERN.md`
- The relevant template in `_templates/`

Use `_templates/component-page.md` for bespoke component pages with ported React demos. Use `_templates/component-page-storybook.md` for hybrid Storybook-backed component pages.

## Component Page Rules

- Follow the section order and archetypes in `COMPONENT-PAGE-PATTERN.md`.
- Keep `description` to 1-2 reader-facing sentences about what the component is and where it appears in Scribe. Do not put implementation caveats in frontmatter or reader-facing sections.
- Keep `toc` entries in the same order as the page's `##` headings.
- Include `overview` and `code` in every component page TOC.
- Use product-language section labels, not generic labels such as `Variants`.
- Keep `## Code` last.
- Add `{#id}` to headings when the generated slug would not match a demo registry key or TOC id.

## Bespoke Component Pages

For bespoke pages:

- Copy from `_templates/component-page.md`.
- Inspect the production Scribe source first and port the requested component 1:1 into docs demos.
- Do not invent, recreate, restyle, simplify, or change the component's markup, props, behavior, or styling unless the user explicitly asks for a docs-only adaptation.
- Keep docs-only wrappers, demo layout, and CSS scoping separate from the ported component source.
- Include at least one variation section for visual components.
- Use `<!-- demo -->` only where a matching demo is registered in the route's demos map.
- If a section has multiple demo markers, register the demos as an array in the same order.
- Add or update the dedicated route, demo file, Figma link wiring, and sidebar entry only when the page requires them.

### Merging Existing Storybook Pages

When creating a bespoke source-truth page for a component that already has a Storybook-derived page:

- Upgrade the existing component slug/page in place instead of creating a duplicate route.
- Move or pin the component under the curated `Components` sidebar group, and keep the same slug out of `Storybook Components`.
- Preserve the Storybook iframe as a reference preview under `## Overview` by adding a single `<!-- demo -->` marker after the reader-facing Overview prose and registering it as `demos.overview`.
- Treat the Storybook preview as reference only. The source-truth demos, implementation, behavior, and styling must still come from production Scribe source.
- Keep Overview prose focused on component purpose, usage, and major variants. Do not add Storybook migration notes, source paths, fixture notes, or implementation details there.

### Source-Truth Component Porting Checklist

Before coding a bespoke source-truth component page:

- Identify the real production Scribe source files first, including composed child components, style files, shared dependencies, assets, font files, design tokens, CSS variables, and global CSS assumptions.
- For complex components, do not port only the outer wrapper. Identify and port the visible composed children that define the surface, such as tabs, field rows, counters, badges, action buttons, scroll containers, sticky wrappers, and feature-flagged tabs.
- When a design shows a companion surface such as a collapsed rail, sidebar nav, trigger, popover, drawer handle, adjacent toolbar, or closed/open counterpart, identify and port that companion production source too. Do not infer companion states from the expanded component or from the Figma screenshot.
- For portalized or open temporary surfaces such as menus, popovers, select listboxes, command palettes, and autocomplete panels, port the actual open surface chain. Include the anchor/popover wrapper, library component, focused row, scroll container, portal/runtime context, and fixture data order from production source or live Scribe evidence.
- Preserve the production component's intrinsic width and elevation for floating surfaces such as menus, popovers, dropdowns, and command palettes. Docs wrappers may contain overflow for narrow screens, but they must not stretch source-backed surfaces to the full docs content width or clip production shadows with non-source `overflow` rules.
- When a docs port names a production chain such as `SlashCommandMenu -> PopoverSelect -> Select`, port that composed chain's visible DOM, style objects, and runtime assumptions. Do not create a parallel hand-authored component that merely copies the labels, icons, or approximate layout.
- Port source-shaped components under `src/components/scribe` without inventing markup, renaming behavior, restyling, simplifying structure, or replacing production behavior with an approximation.
- Keep docs-only fixture props, providers, demo frames, and CSS scopes separate from the ported component. Label those differences in code comments or docs when they are necessary.
- Before adding docs-only colors, hover states, active states, card treatments, preview canvases, or demo wrappers, scan for and reuse existing project patterns, tokens, and utility classes where possible. Prefer established treatments such as sidebar hover/active states, Overview preview canvases, and top nav/action interactions over one-off visual variants.
- Mirror the required Scribe runtime context instead of patching visuals by eye. This can include CSS variable aliases, spacing aliases, local font files, production `@font-face` family names, global line-height, heading resets, button resets, font smoothing, logos/assets, and Material or production class assumptions.
- When porting components that wrap third-party UI libraries such as MUI or React Select, treat Scribe's styled wrapper as the source of truth over the library default. Do not carry forward default library states such as disabled opacity, focus rings, track opacity, menu shadows, or input spacing unless the Scribe source keeps them.
- For disabled, focused, selected, active, error, and read-only states, verify every nested selector and override from the production styled component. Pay special attention to compounded opacity and state selectors such as `.Mui-disabled + .MuiSwitch-track`; if production overrides a library default, the docs port must preserve that override.
- Avoid visual CSS fixes unless the rule maps directly to Scribe source or Scribe global runtime styles.
- Record source paths in port comments, fenced `## Code` comments, or code demo badges when they help trace the docs page back to production.
- If a design or Figma reference includes a state, variant, or interaction that does not exist in production Scribe source, omit that item from the reader-facing docs instead of adding explanatory caveats such as "not in source" or "docs do not add one." If the mismatch matters for future work, leave it in implementation notes, task comments, or ask the user; do not make it part of the component documentation.

Before considering the port done:

- Compare the rendered docs demo against live Scribe or source screenshots.
- When the user provides live Scribe evidence, compare that evidence against the production DOM/source before accepting a Figma-based variant, fixture order, icon set, or menu state.
- Check each visible variant against the exact production component chain, including item count, icons, labels, badges, field row structure, counters, control affordances, feature-flagged omissions, source constants, wrapper dimensions, sticky behavior, scrollbars, child alignment, font family, font weight, line-height, font smoothing, colors, spacing variables, asset sizing, and overflow.
- For stateful controls, inspect computed styles for both the component root and stateful children before calling the port source-faithful. Confirm disabled opacity, checked/unchecked colors, thumb/track opacity, focus-visible treatment, selected row backgrounds, and error/read-only affordances match the production source rather than framework defaults.
- If a variant is removed from reader-facing docs, remove its demo registry entry, exports, CSS, source-path badges, Code examples, and TOC references in the same change.
- Verify child alignment with computed styles when production depends on global runtime defaults, button resets, icon wrappers, SVG display behavior, or Emotion-generated nested selectors.
- Treat any visual drift as a missing source dependency, missing runtime context, or fixture mismatch to diagnose. Do not compensate with approximated styling.

## Hybrid Storybook Component Pages

For hybrid pages:

- Prefer `npm run scaffold:components` for missing pages, or copy `_templates/component-page-storybook.md`.
- Do not add `<!-- demo -->` markers for Storybook story variations; the shared route injects those iframe previews.
- Refine `description` and `## Overview` after scaffolding or after running `npm run refresh:component-content`.
- Ensure the TOC includes `overview`, each Storybook story id, and `code`.
- Add optional vault sections such as Guidelines or Related components before Code only when they help readers.

## What Belongs Where

Markdown owns component purpose, usage guidance, variant meaning, accessibility/copy rules, and representative code snippets. Route and demo code own live demos, Storybook iframes, token visuals, code badges, Figma deep links, and generated data tables.
