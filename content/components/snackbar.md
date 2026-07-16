---
title: Snackbar
description: Snackbars are brief notifications for processes that have been or will be performed.
route: /components/snackbar
category: components
breadcrumbs:
  - label: Components
  - label: Snackbar
toc:
  - id: overview
    label: Overview
  - id: statuses
    label: Statuses
  - id: related-components
    label: Related components
  - id: code
    label: Code
---

## Overview

Snackbars, also known as toasts, provide short status messages after a process starts or completes. Use them for brief post-action feedback that should not interrupt the user's current workflow.

This page covers success and error snackbar statuses.

## Statuses

- **Success** — confirms that a process completed successfully.
- **Error** — communicates that a process failed and needs attention.

<!-- demo -->

## Related components

[Alerts & Banner](/components/alert-bar) display status, validation, and page-level messages that stay in the layout. Use alerts and banners when the message should remain visible in context instead of appearing temporarily after an action.

<!-- demo -->

## Code

<!-- demo -->

```tsx
import { SCRIBE_SNACKBAR_STATUS, ScribeSnackbarPort } from "@/components/scribe";

// Source: Scribe/packages/snackbar/src/components/SnackbarWithProps.tsx
// Source: Scribe/packages/snackbar/src/components/shared.tsx
// Source: Scribe/packages/snackbar/src/stores/snackbarStore.ts

<ScribeSnackbarPort
  message="Snackbar text"
  status={SCRIBE_SNACKBAR_STATUS.success}
  open
/>
```
