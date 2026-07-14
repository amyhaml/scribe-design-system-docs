---
title: Checkbox
description: Checkboxes allow users to select one or more items from a set.
route: /components/checkbox
category: components
breadcrumbs:
  - label: Components
  - label: Checkbox
toc:
  - id: overview
    label: Overview
  - id: states
    label: States
  - id: related
    label: Related components
  - id: code
    label: Code
---

## Overview

**Checkbox** allows users to select one or more items from a set.

Checkboxes can be empty, filled, or indeterminate. Each state can also be disabled when the option is visible but unavailable.

<!-- demo -->

## States {#states}

- **Empty** — the item is available but not selected.
- **Filled** — the item is selected.
- **Indeterminate** — a parent or bulk-selection control represents a mixed selection.
- **Disabled** — the item cannot be changed in the current context.

<!-- demo -->

## Related components {#related}

[Switches](/components/toggle) toggle the state of a single setting on or off.

<!-- demo -->

**Checkbox or Switch?**

- Checkbox is used when the purpose is to select from multiple items in a set.
- Switch is used when the purpose is to toggle the state of a single setting.

## Code

<!-- demo -->

```tsx
import { ScribeCheckboxPort, ScribePathDashPort } from "@/components/scribe";

// Source: Scribe/src/components/shared/Checkbox.tsx
// Source: Scribe/src/components/shared/Label.tsx
// Source: Scribe/src/pages/Feeds/SearchContentModal/SelectedItemsToolbar.tsx
// Source: Scribe/src/components/LandingPages/Collections/SelectedItemsToolbar/SelectionControls.tsx
// Source: Scribe/packages/toolkit/src/components/Toggle/Toggle.tsx
// Docs-only fixture props provide static visual states.

<div className="scribe-app-css-vars">
  <ScribeCheckboxPort
    id="example-checkbox"
    isChecked
    label="Label"
    name="example-checkbox"
    onChange={(id) => console.log(id)}
  />

  <ScribeCheckboxPort
    id="example-indeterminate-checkbox"
    isChecked
    label="Label"
    mark="dash"
    name="example-indeterminate-checkbox"
  />
</div>;
```
