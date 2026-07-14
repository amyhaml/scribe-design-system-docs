---
title: Menu
description: Menus display a list of choices on temporary surfaces. They appear in composer actions, popovers, and searchable dropdown flows.
route: /components/menu
category: components
breadcrumbs:
  - label: Components
  - label: Menu
toc:
  - id: overview
    label: Overview
  - id: block-menu
    label: Block menu
  - id: popover-menu
    label: Popover menu
  - id: dropdown-menu
    label: Dropdown menu
  - id: guidelines
    label: Guidelines
  - id: code
    label: Code
---

## Overview

Menus display a list of choices on temporary surfaces. They help users add content, choose actions, and select options without leaving the current workflow.

This page covers block, popover, and dropdown menu patterns used across Scribe.

## Block menu

Block menus let users add embed blocks from a searchable list of options.

- **Search embeds** — filters available embed commands in the composer.
- **Grouped commands** — organize embed types such as single embeds, galleries, and table of contents items.

<!-- demo -->

## Popover menu

Popover menus show compact lists of actions or destinations.

- **Icon rows** — pair each label with a visual icon when the option benefits from quick scanning.
- **Temporary surface** — opens from an action such as the more options button or avatar menu.

<!-- demo -->

## Dropdown menu

Dropdown menus let users choose from a list of text options.

- **Search** — helps filter longer option lists.

<!-- demo -->

## Guidelines

- Use menus for short-lived choice surfaces that are anchored to a control or app chrome.
- Use block menus when the user is adding an embed block from the composer.
- Use popover menus for actions under icon buttons or avatar controls.
- Use dropdown menus with dropdown fields and filter sets when users need to choose from option lists.

## Code

<!-- demo -->

```tsx
import {
  ScribeBlockMenuPort,
  ScribeDropdownMenuPort,
  ScribePopoverMenuPort,
} from "@/components/scribe";

// Source: Scribe/packages/toolkit/src/components/SlashCommandMenu/*
// Source: Scribe/packages/toolkit/src/components/ActionMenu/index.tsx
// Source: Scribe/src/components/shared/MoreOptionsMenu.tsx
// Source: Scribe/packages/toolkit/src/components/PopoverSelect/PopoverSelect.tsx

<ScribeBlockMenuPort commands={commands} />
<ScribePopoverMenuPort items={items} />
<ScribeDropdownMenuPort options={options} />
```
