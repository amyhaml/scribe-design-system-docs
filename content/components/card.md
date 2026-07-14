---
title: Card
description: Cards group content and actions about a single subject in Scribe listing and selection workflows.
route: /components/card
category: components
breadcrumbs:
  - label: Components
  - label: Card
toc:
  - id: overview
    label: Overview
  - id: list-card
    label: List card
  - id: grid-card
    label: Grid card
  - id: code
    label: Code
---

## Overview

**Card** is used in listing pages and selection flows to summarize a single content item, asset, or related record.

Cards can appear as horizontal list cards for dense browsing or as grid cards when image preview and scanability are more important. Both layouts support a selected state.

## List card {#list-card}

Used in dense listings where users need to compare many items quickly while preserving thumbnail, metadata, title, author, date, status, and actions.

**Default**

<!-- demo -->

**Selected**

<!-- demo -->

## Grid card {#grid-card}

Used when the image is the primary scanning cue or when cards appear in a gallery-style layout.

**Default**

<!-- demo -->

**Selected**

<!-- demo -->

## Code

<!-- demo -->

```tsx
import {
  ScribeCardPort,
  ScribeStatusIndicatorPort,
} from "@/components/scribe";

// Source: Scribe/src/components/shared/Card/index.tsx
// Source: Scribe/src/components/shared/Card/card.ts
// Source: Scribe/src/components/shared/Card/shared/CardImage.tsx
// Source: Scribe/src/components/shared/StatusIndicator.tsx
// Source: Scribe/src/components/shared/Meta.tsx
// Source: Scribe/src/components/shared/Separator.tsx
// Source: Scribe/src/components/shared/MoreOptionsMenu.tsx
// Source: Scribe/packages/toolkit/src/components/SvgButton/index.tsx
// Docs-only fixture props provide static item data and closed-state menu items.

<div className="scribe-app-css-vars">
  <ScribeCardPort
    isListView
    item={{
      id: "content-card",
      image: "/path/to/thumbnail.jpg",
      title: "Title text",
      metadata: [
        "US",
        "Metadata",
        <ScribeStatusIndicatorPort backgroundColor="var(--publish)">
          Published
        </ScribeStatusIndicatorPort>,
      ],
      author: "Author Name",
      date: "Oct 10, 2024 @ 01:07 PM",
      secondaryMetadata: ["Metadata", "Metadata"],
    }}
    getMenuItems={() => [{ id: "edit", label: "Edit" }]}
  />
</div>
```
