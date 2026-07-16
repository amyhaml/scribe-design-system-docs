---
title: Radio Button
description: Radio buttons let users choose one option from a set. They appear in forms and editor settings where a single selection is required.
route: /components/radio-input
category: components
breadcrumbs:
  - label: Components
  - label: Radio Button
toc:
  - id: overview
    label: Overview
  - id: states
    label: States
  - id: code
    label: Code
---

## Overview

Radio buttons let users choose one option from a set. Use them when the available choices are visible and only one option can be selected.

This page covers empty, filled, and disabled radio button states.

<!-- demo -->

## States

- **Empty** — shows an available option that has not been selected.
- **Filled** — shows the selected option in the group.
- **Disabled** — shows an unavailable option that cannot be changed.

<!-- demo -->

## Code

<!-- demo -->

```tsx
import { ScribeRadioInputPort } from "@/components/scribe";

// Source: Scribe/src/components/shared/RadioInput/RadioInput.tsx
// Source: Scribe/src/components/shared/RadioInput/RadioInputButton.tsx

<ScribeRadioInputPort
  checked
  defaultValue="selected"
  direction="left"
  id="radio-selected"
  label="Label"
  name="radio-example"
  onClick={() => console.log("selected")}
/>
```
