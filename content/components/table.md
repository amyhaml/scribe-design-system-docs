---
title: Table
description: "Tables display sets of data in rows and columns. They can include headers, row-only layouts, and actions."
route: /components/table
category: components
breadcrumbs:
  - label: Components
  - label: Table
toc:
  - id: overview
    label: Overview
  - id: row
    label: Row
  - id: table
    label: Table
  - id: code
    label: Code
---

## Overview

Tables display sets of related data in rows and columns. In Scribe, they are used when users need to scan structured information and act on individual rows.

This page covers a single-row table presentation and a headered table with row actions.

<!-- demo -->

## Row

Rows can be shown without visible column headers when the surrounding context already explains the data.

<!-- demo -->

## Table

Tables with headers make the relationship between each row value explicit and can include action cells for row-level commands.

<!-- demo -->

## Code

<!-- demo -->

```tsx
import { ScribeTableActionPort, ScribeTablePort } from "@/components/scribe";

const columns = [
  { label: "QUALITY", name: "quality" },
  { label: "SIZE", name: "size" },
  { label: "ACTIONS", name: "action" },
];

const rows = [
  {
    id: "original",
    content: {
      quality: "Original",
      size: "400 mb | 1920 x 1080",
      action: <ScribeTableActionPort>DOWNLOAD</ScribeTableActionPort>,
    },
  },
];

<ScribeTablePort columns={columns} data={rows} />;
```
