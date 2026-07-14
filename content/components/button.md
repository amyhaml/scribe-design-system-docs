---
title: Button
description: Buttons trigger actions throughout Scribe — save, publish, schedule, and confirm steps in product workflows. The article editor toolbar is the primary surface for labeled, token-filled controls.
route: /components/button
category: components
breadcrumbs:
  - label: Components
  - label: Button
toc:
  - id: overview
    label: Overview
  - id: editor-toolbar
    label: Editor toolbar
  - id: editor-status
    label: Status chips
  - id: split-preview
    label: Split Preview + share
  - id: sizes
    label: Sizes
  - id: flex
    label: Flex button
  - id: typography
    label: Typography
  - id: code
    label: Code
---

## Overview

Buttons trigger actions across Scribe — save and publish in the article editor, open drawers and dialogs, and confirm or cancel destructive steps. The content edit **toolbar** is the main surface: each control maps to a workflow and reads as a compact labeled control in a dense horizontal row.

In production the editor wraps the shared toolkit control as **ToolbarButton** and sets **background** colors from design tokens (`var(--info)`, `var(--draft)`, `var(--publish)`, and status colors) rather than generic style presets. Sections below follow editor and toolbar patterns first, then sizes and edge cases.

## Editor toolbar (draft) {#editor-toolbar}

Primary workflow actions in the article editor toolbar. Controls are spaced evenly in the row; each fill color signals the action type.

- **Preview** — opens the content preview; info-colored fill.
- **Save draft** — persists without publishing; draft-colored fill.
- **Publish** — ships content live; publish-colored fill.
- **Schedule** — sets a future publish date; schedule-colored fill.

<!-- demo -->

## Editor toolbar (status chips) {#editor-status}

Outlined status controls sit alongside primary actions to reflect save and publish state without competing for the same visual weight as workflow buttons.

- **Draft saved** — confirms autosave completed; outlined draft-saved color with check icon.
- **Published** — reflects live content after publish; outlined published color with check icon.
- **Scheduled** — confirms a future publish date is set; outlined scheduled color with calendar icon.

<!-- demo -->

## Split: Preview + share {#split-preview}

In the article editor, **Preview** and its share options read as one split control — the label on the left, a chevron on the right. Use when a primary action has a closely related secondary action without splitting into two separate buttons.

<!-- demo -->

## Sizes

Button height and padding scale across three toolkit sizes. Editor toolbar buttons use the default medium scale; smaller and larger sizes appear in drawers, dialogs, and secondary surfaces.

- **Small** — compact controls in dense UI.
- **Medium** — default toolkit size.
- **Large** — more presence when the control needs emphasis.

<!-- demo -->

## Flex button {#flex}

- **Flex** — tighter inline layout for labels that sit flush with surrounding chrome; not the default filled toolbar pill.

<!-- demo -->

## Transparent + border {#transparent}

- **Cancel** — transparent background with border for secondary actions that dismiss or step back (e.g. cancel in a publish confirmation).

<!-- demo -->

## Typography

Button labels use compact, semibold text tuned for dense toolbars — smaller than body copy and not always mapped to a typography token. The table links each slot to foundation tokens where they apply.

<!-- demo -->

## Code

<!-- demo -->

```tsx
import { ToolkitButton } from "@/components/scribe";

// Toolkit: Scribe/packages/toolkit/src/components/Button/Button.tsx
// Editor toolbar wrapper: Scribe/src/pages/Content/Edit/Toolbar/ToolbarButton.tsx
// CSS vars: Scribe/packages/styles/src/global.ts (docs mirror: scribe-app-css-var-scope.css)
// Wrap in scribe-app-css-vars so token fills resolve in demos and ports.

<div className="scribe-app-css-vars">
  {/* Primary toolbar action */}
  <ToolkitButton type="button" background="var(--info)">
    Preview
  </ToolkitButton>

  {/* Outlined status chip */}
  <ToolkitButton
    type="button"
    background="transparent"
    border="var(--draft-saved)"
    color="var(--draft-saved)"
  >
    Draft saved
  </ToolkitButton>

  {/* Split control — left segment */}
  <ToolkitButton type="button" background="var(--info)" splitSegment="start">
    Preview
  </ToolkitButton>
</div>
```
