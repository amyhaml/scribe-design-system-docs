---
title: Switch
description: Switches toggle the state of a single setting on or off. They appear in Scribe filters, drawers, and settings forms for immediate binary settings.
route: /components/switch
category: components
breadcrumbs:
  - label: Components
  - label: Switch
toc:
  - id: overview
    label: Overview
  - id: states
    label: States
  - id: sizes
    label: Sizes
  - id: related-components
    label: Related components
  - id: code
    label: Code
---

## Overview

Switches toggle the state of a single setting on or off. They are used when a setting can take effect immediately, such as enabling a filter, product setting, or drawer option.

This page covers off, on, disabled, medium, and small switch states.

## States

- **Off** — the setting is disabled.
- **On** — the setting is enabled.
- **Disabled** — the switch is visible but cannot be changed in the current context.

<!-- demo -->

## Sizes

- **Medium** — the default switch size for most settings rows.
- **Small** — a compact switch size for dense settings or filter surfaces.

<!-- demo -->

## Related components {#related-components}

[Checkboxes](/components/checkbox) let users select one or more items from a set. Use a switch when the control toggles one setting on or off, and use a checkbox when the user is choosing from a set of options.

<!-- demo -->

## Code

<!-- demo -->

```tsx
import { ScribeTogglePort } from "@/components/scribe";

// Source: Scribe/packages/toolkit/src/components/Toggle/Toggle.tsx
// Source: Scribe/packages/toolkit/src/components/Toggle/Toggle.stories.tsx
// Source: Scribe/src/components/ListFilters/FilterToggle.tsx

<ScribeTogglePort
  id="example-switch"
  isChecked
  name="example-switch"
  onChange={({ isChecked }) => console.log(isChecked)}
/>;
```
