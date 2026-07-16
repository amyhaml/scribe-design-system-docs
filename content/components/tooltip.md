---
title: Tooltip
description: Tooltips display informative text when users hover over, focus on, or tap an element.
route: /components/tooltip
category: components
breadcrumbs:
  - label: Components
  - label: Tooltip
toc:
  - id: overview
    label: Overview
  - id: tooltip
    label: Tooltip
  - id: code
    label: Code
---

## Overview

Tooltips provide short, contextual text for an element without adding permanent content to the page. Use them when an icon, control, or compact label benefits from a brief explanation.

This page covers the standard Scribe tooltip surface.

## Tooltip

Tooltips appear on hover, focus, or tap and should contain concise supporting text.

<!-- demo -->

## Code

<!-- demo -->

```tsx
import { ScribeTooltipPort } from "@/components/scribe";

// Source: Scribe/packages/toolkit/src/components/Tooltip/Tooltip.tsx
// Source: Scribe/packages/toolkit/src/components/Tooltip/Tooltip.stories.tsx

<span data-tip="Tooltip text" data-for="example-tooltip" />
<ScribeTooltipPort id="example-tooltip" hideArrow />
```
