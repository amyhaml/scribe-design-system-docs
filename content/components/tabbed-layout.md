---
title: Tabs
description: Tabs organize related views within the same surface so users can move between sections without leaving their current workflow.
route: /components/tabbed-layout
category: components
breadcrumbs:
  - label: Components
  - label: Tabs
toc:
  - id: overview
    label: Overview
  - id: states
    label: States
  - id: validation-tabs
    label: Validation tabs
  - id: secondary-tabs
    label: Secondary tabs
  - id: tabs-with-actions
    label: Tabs with actions
  - id: code
    label: Code
---

## Overview

Tabs organize related content into separate panels within the same page, drawer, or toolbar. Use them when users need to switch between peer sections while preserving the surrounding context.

This page covers the primary tab layout, validation badges, compact secondary tabs, and tab rows with actions.

<!-- demo -->

## States

Use the primary tab layout for top-level sections in listing bars, content bars, drawers, and panels. The selected tab uses the primary underline, inactive tabs remain available, and disabled tabs stay visible when the destination is not currently available.

<!-- demo -->

## Validation tabs {#validation-tabs}

Validation badges show the number of issues or missing fields associated with a tab. Use badges when users need to understand which section needs attention before opening it.

<!-- demo -->

## Secondary tabs {#secondary-tabs}

Secondary tabs are compact tabs used inside denser editing surfaces. They use the same tab behavior with smaller labels and a filled selected state.

<!-- demo -->

## Tabs with actions {#tabs-with-actions}

Tab rows can include source-backed right-side actions and a collapse affordance when the surrounding surface supports them.

<!-- demo -->

## Code

<!-- demo -->

```tsx
import { ScribeTabbedLayoutPort } from "@/components/scribe";

// Source: Scribe/src/components/shared/TabbedLayout/index.tsx
// Source: Scribe/src/components/shared/TabbedLayout/TabPanel.tsx
// Source: Scribe/src/components/shared/TabbedLayout/SecondaryTabbedStyledLayout

<ScribeTabbedLayoutPort
  tabs={[
    { label: "Headlines", missingFieldsCount: 4, content: <HeadlinesPanel /> },
    { label: "Header", content: <HeaderPanel /> },
    { label: "Settings", content: <SettingsPanel /> },
  ]}
/>;
```
