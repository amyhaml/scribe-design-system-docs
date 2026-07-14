---
title: Chip
description: Chips are compact elements that represent an input, attribute, or action.
route: /components/chip
category: components
breadcrumbs:
  - label: Components
  - label: Chip
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

Chips are compact elements that represent an input, attribute, or action in Scribe. They are commonly used to show selected filter values and other removable selections in dense workflows.

This page covers the production removable chip and its relationship to filter controls.

<!-- demo -->

## States

Scribe chips render as compact, removable values. The remove action calls the chip removal callback with the chip label, value, and remaining chip data.

<!-- demo -->

## Related components {#related}

[Filters](/components/filter-panel) let users select from a menu to filter from a subset of options. The selected filter is represented as a chip.

<!-- demo -->

## Code

<!-- demo -->

```tsx
import { ScribeChipPort, ScribeChipListPort } from "@/components/scribe";

// Source: Scribe/src/components/shared/Chip/Chip.tsx
// Source: Scribe/src/components/shared/Chip/ChipBase.tsx
// Source: Scribe/src/components/shared/Chip/ChipList.tsx
// Source: Scribe/src/components/shared/Chip/ChipListBase.tsx
// Source: Scribe/packages/toolkit/src/components/Chips/*
// Source: Scribe/packages/toolkit/src/components/SvgButton/index.tsx

<ScribeChipPort
  label="Chip text"
  value="chip-text"
  onChipRemoved={(chip) => console.log(chip)}
/>

<ScribeChipListPort
  addButtonLabel="Add filter"
  heading="Filter title"
  selectedChips={[{ label: "Chip text", value: "chip-text" }]}
/>
```
