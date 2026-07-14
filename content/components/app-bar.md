---
title: App Bar
description: The App bar is a nav bar and header at the top of most pages. It displays information and actions relating to the current screen.
route: /components/app-bar
category: components
breadcrumbs:
  - label: Components
  - label: App Bar
toc:
  - id: overview
    label: Overview
  - id: nav-bar
    label: Nav Bar
  - id: listing-bar
    label: Listing Bar
  - id: content-bar
    label: Content Bar
  - id: code
    label: Code
---

## Overview

**App bar** is a nav bar and header at the top of most pages. It displays information and actions relating to the current screen.

It appears as a simple Nav Bar for top-level workspace and brand navigation, a Listing Bar when pages need same-category tabs, and a Content Bar when a page needs a headline, metadata, actions, and optional tabs.

## Nav Bar

The main navigation located at the top of all pages in Scribe.

- Users can navigate to different sections by pressing on the workspace name, such as **Feeds**, which brings up the Workspace Menu. This navigation menu contains items and sub-items.
- Users can navigate to different brands by pressing the brand name on the top right. This brings up a Dropdown Menu populated with brand names.

<!-- demo -->

## Listing Bar

Used in listing pages to navigate between other listing pages under the same category. This is achieved by pressing on the tabs. Includes an optional Button, and Icon Button to access additional options through a Popover Menu.

<!-- demo -->

## Content Bar

Used in most content pages and granular pages that benefit from having a unique headline, metadata, and an individual or set of action buttons. Also includes an optional set of tabs.

<!-- demo -->

## Code

<!-- demo -->

```tsx
import {
  ScribeNavPort,
  ScribeTabbedLayoutPort,
  ScribeGlobalToolbarPort,
} from "@/components/scribe";

// Source: Scribe/src/components/Nav/index.tsx
// Source: Scribe/src/components/Nav/NavHeader.tsx
// Source: Scribe/src/components/Nav/NavActions.tsx
// Source: Scribe/src/components/Nav/TenantSelectorComponent.tsx
// Source: Scribe/src/components/Nav/styles.ts
// Source: Scribe/src/components/shared/TabbedLayout/index.tsx
// Source: Scribe/src/components/shared/TabbedLayout/TabPanel.tsx
// Source: Scribe/apps/scribe/src/components/GlobalToolbar/*
// Docs-only fixture props replace app auth/navigation stores.
// Keep wrappers and CSS scope outside the ported components.

<div className="scribe-app-css-vars">
  <ScribeNavPort />
  <ScribeTabbedLayoutPort tabs={tabs} />
  <ScribeGlobalToolbarPort title="Untitled content" menuButtons={buttons} />
</div>;
```
