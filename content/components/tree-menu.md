---
title: Tree
description: "Trees help users navigate and select items from hierarchical lists. They appear in Scribe filters and settings where nested groups can be expanded, collapsed, and searched."
route: /components/tree-menu
category: components
breadcrumbs:
  - label: Components
  - label: Tree
toc:
  - id: overview
    label: Overview
  - id: tree-items
    label: Tree items
  - id: tree
    label: Tree
  - id: related-components
    label: Related components
  - id: code
    label: Code
---

## Overview

Tree views let users navigate hierarchical lists with nested levels that can be expanded and collapsed. In Scribe, tree menus are used for grouped filters, permissions, site selection, and other nested option sets.

This page covers tree item states, searchable tree menus, and multi-select tree menus with checkbox selection.

<!-- demo -->

## Tree items

Tree items show the current level in the hierarchy, whether an item can expand, and whether it is selected or disabled.

<!-- demo -->

## Tree

Tree menus combine search, nested rows, and selection controls inside a temporary popover surface.

<!-- demo -->

## Related components

[Dropdown menus](/components/menu#dropdown-menu) let users choose from a list of text options. Use a tree when those options are hierarchical and users need to expand or collapse nested groups.

<!-- demo -->

## Code

<!-- demo -->

```tsx
import { ScribeTreeMenuPort } from "@/components/scribe";

const treeData = [
  {
    label: "Label",
    value: "label",
    children: [
      { label: "Label", value: "label-child-1" },
      { label: "Label", value: "label-child-2" },
    ],
  },
];

<ScribeTreeMenuPort
  data={treeData}
  expandedValues={["label"]}
  multipleSelections
  searchPlaceholder="Search"
  selectedValues={["label-child-1"]}
/>;
```
