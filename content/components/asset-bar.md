---
title: Asset Bar
description: Asset Bar appears at the top of modal and takeover flows for adding assets or elements. It keeps navigation, the modal title, and primary actions visible while users select content.
route: /components/asset-bar
category: components
breadcrumbs:
  - label: Components
  - label: Asset Bar
toc:
  - id: overview
    label: Overview
  - id: default-actions
    label: Default actions
  - id: selection-actions
    label: Selection actions
  - id: title-only
    label: Title only
  - id: code
    label: Code
---

## Overview

**Asset Bar** appears at the top of modal and takeover flows when users add an asset or element, such as adding images to an article.

It always includes a Back action and a centered title. Depending on the flow, the right side can show save/cancel actions, selection controls with an Add Selected button, or no actions.

## Default actions {#default-actions}

Used when a modal needs explicit confirmation controls after users finish adding or editing an asset.

- **Back** — returns to the previous screen or closes the takeover flow.
- **Cancel** — exits without applying the current changes.
- **Save** — confirms the selected or edited asset.

<!-- demo -->

## Selection actions {#selection-actions}

Used when users can select one or more assets from a list before adding them.

- **Selection toggle** — filters or reveals selected items in the asset flow.
- **Add Selected** — applies the current selection and stays disabled when nothing is selected.

<!-- demo -->

## Title only {#title-only}

Used for simple asset flows that only need navigation and a title.

<!-- demo -->

## Code

<!-- demo -->

```tsx
import {
  ScribeAssetBarPort,
  ScribeAssetBarSelectionActions,
  ToolkitButton,
} from "@/components/scribe";

// Source: Scribe/src/components/shared/FullscreenTakeover.tsx
// Source: Scribe/src/components/Content/BulkAddImageModal.tsx
// Source: Scribe/src/pages/Feeds/SearchContentModal/index.tsx
// Source: Scribe/packages/toolkit/src/components/Button/Button.tsx
// Source: Scribe/packages/toolkit/src/components/Toggle/Toggle.tsx
// Docs-only fixture props provide title, counts, and action button state.

<div className="scribe-app-css-vars">
  <ScribeAssetBarPort
    title="Add Images"
    buttons={
      <>
        <ToolkitButton background="transparent" border color="var(--text)">
          Cancel
        </ToolkitButton>
        <ToolkitButton background="var(--primary)">Save</ToolkitButton>
      </>
    }
  />

  <ScribeAssetBarPort title="Add Images" buttons={<ScribeAssetBarSelectionActions count={0} />} />
</div>;
```
