---
title: Dialog
description: Dialogs interrupt the current task to inform users, ask for confirmation, or collect decisions. They appear after user actions and keep attention on the required next step.
route: /components/dialog
category: components
breadcrumbs:
  - label: Components
  - label: Dialog
toc:
  - id: overview
    label: Overview
  - id: confirmation-dialogs
    label: Confirmation dialogs
  - id: publishing-dialogs
    label: Publishing dialogs
  - id: guidelines
    label: Guidelines
  - id: code
    label: Code
---

## Overview

Dialogs inform users about a task and can contain critical information, require a decision, or involve multiple related actions.

This page covers compact confirmation dialogs and publishing dialogs used in Scribe workflows.

## Confirmation dialogs

Confirmation dialogs ask users to choose before Scribe continues with a workflow.

- **Unsaved changes** — asks whether to save before leaving a task.
- **Destructive confirmation** — asks users to confirm a destructive or irreversible action.

<!-- demo -->

## Publishing dialogs

Publishing dialogs collect decisions around publish, schedule, unpublish, archive, and delete actions.

- **Publish now** — publishes immediately after confirmation.
- **Schedule** — collects a publish date and optional end-date redirect.
- **Redirect actions** — collect optional redirects when content is unpublished, archived, or deleted.

<!-- demo -->

## Guidelines

Dialogs are often triggered after a user takes an action, such as pressing a button.

- Use dialogs when the next step requires focused attention before the user can continue.
- Darken the view behind the dialog with the modal overlay.
- Keep the action pair clear: cancel or decline first, primary or destructive action second.

## Code

<!-- demo -->

```tsx
import { ScribeDialogPort, ScribePublishDialogPort } from "@/components/scribe";

// Source: Scribe/packages/toolkit/src/components/Dialog/Dialog.tsx
// Source: Scribe/apps/scribe/src/modals/LegacyModal.tsx
// Source: Scribe/src/components/shared/PublishPanel/PublishPanel.tsx
// Source: Scribe/src/components/shared/PublishPanel/PublishTabs.tsx
// Source: Scribe/src/components/shared/PublishPanel/ScheduleTab.tsx
// Source: Scribe/src/components/shared/PublishPanel/PublishScheduleForm.tsx
// Source: Scribe/src/components/shared/PublishPanel/RedirectPanel.tsx

<ScribeDialogPort
  compactMode
  buttons={[
    { label: "NO", background: "transparent", onClick: onCancel },
    { label: "YES", onClick: onConfirm },
  ]}
>
  You have unsaved changes, would you like to save before leaving?
</ScribeDialogPort>

<ScribePublishDialogPort variant="schedule-filled" />
```
