---
title: Filter
description: Filters let users narrow Scribe lists by status, date, organization, contributors, source, and other metadata. Filter sets group those controls in list sidebars for content, image, and video workflows.
route: /components/filter
category: components
breadcrumbs:
  - label: Components
  - label: Filter
toc:
  - id: overview
    label: Overview
  - id: filters
    label: Filters
  - id: filter-sets
    label: Filter sets
  - id: code
    label: Code
---

## Overview

Filters narrow long Scribe lists so users can find records by state, date, organization, contributor, source, or media attributes.

This page covers individual filter rows and grouped filter sets used in content, image, and video listing sidebars.

## Filters

Scribe chip-list filters show a row title with an add action, then any selected values beneath the row. The docs demo shows the visible states used by filter rows.

- **Empty filter** — shows the filter title and add icon before a value is selected.
- **Full-width chip** — shows a selected value spanning the filter row width.
- **Condensed chip** — shows a selected value sized to its label and remove action.

<!-- demo -->

## Filter sets {#filter-sets}

Filter sets mirror the grouped sidebars used by Scribe creation lists.

- **Content** — follows the Content list sidebar from creator toggles through organization and contributor filters.
- **Image** — follows the Images list sidebar with updated date and contributor filters.
- **Video** — follows the Videos list sidebar through status, tags, upload date, media attributes, and uploaded-by filters.

<!-- demo -->


## Code

<!-- demo -->

```tsx
import {
  ScribeFilterPanelPort,
  ScribeFilterSetPort,
  ScribeFilterToggleRowPort,
} from "@/components/scribe";

// Source: Scribe/src/components/shared/FilterPanel.tsx
// Source: Scribe/src/components/Filters/FilterHeading.tsx
// Source: Scribe/src/components/ListFilters/ListFilters.tsx
// Source: Scribe/src/components/shared/FilterSidebar/index.tsx
// Source: Scribe/src/data/filters/content.ts
// Source: Scribe/src/data/filters/images.ts
// Source: Scribe/src/data/filters/videos.ts

<ScribeFilterPanelPort title="Status">
  <ScribeFilterToggleRowPort name="include-lift-content" label="Include LIFT Content" isChecked />
</ScribeFilterPanelPort>

<ScribeFilterSetPort clearAllDisabled={false}>
  {/* List filter rows render here from fixture data. */}
</ScribeFilterSetPort>
```
