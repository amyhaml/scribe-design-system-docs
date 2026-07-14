---
title: Alert & Banner
description: Alerts and banners surface brief status and validation messages without interrupting workflow. Inline alerts appear in drawers and the composer; page-level banners communicate editor and listing state.
route: /components/alert-bar
category: components
breadcrumbs:
  - label: Components
  - label: Alert & Banner
toc:
  - id: overview
    label: Overview
  - id: inline-alerts
    label: Inline alerts
  - id: language
    label: Language
  - id: alignment
    label: Alignment
  - id: banner
    label: Banner
  - id: related
    label: Related components
  - id: code
    label: Code
---

## Overview

Alerts display brief messages for the user without interrupting their use of the app. Typically used for elements in the drawer or composer, depending on the alignment. Scribe does not use one polymorphic alert component — Error, Warning, Info, and Success each map to a different pattern in production.

## Inline alerts

- **Error** — blocks save; shown under drawer inputs when validation fails.
- **Warning** — optimization hints; does not block progress.
- **Info** — contextual guidance in drawer settings (light text + Info icon).
- **Success** — confirms an action completed (e.g. target publish date applied).

<!-- demo -->

## Language

Error messaging should be direct and field-specific:

- Text field: *Enter a ___.*
- Dropdown field: *Select ___.*
- Drawer placeholder (image/video dropzone): *Add an ___.*

## Alignment

- **Left** — drawer field messages under inputs.
- **Center** — composer validation banners above blocks.

<!-- demo -->

## Banner {#banner}

**Editor status bars**

- **Draft** — diagonal stripe bar with indicator dot and **DRAFT** label.
- **Scheduled** — muted scheduled background, publish date copy, and Reschedule link.
- **Live** — published banner with last-published date.

<!-- demo -->

**Notification bars**

- **Locked** — lock icon + owner message (`LockManager`).
- **Transcoding error** — red error bar (`videoTranscodingFailureNotification` in `Scribe/src/data/videos.ts`).
- **List info** — muted info bar on listing pages (e.g. published-content-only filter).

<!-- demo -->

## Related components {#related}

[Snackbars](/components/snackbar) — brief notifications after a user action (e.g. saving a content page). Use for post-action feedback; inline alerts and banners stay in the layout without dismissing.

<!-- demo -->

## Code

```tsx
import ValidationErrorMessage from 'components/shared/ValidationErrorMessage';
import ValidationWarningMessage from 'components/shared/ValidationWarningMessage';
import UseTargetDateChip from 'components/Content/Edit/DesignPreview/UseTargetDateChip';
import NotificationBar from 'components/shared/NotificationBar';
import DraftStatusBar from 'components/shared/StatusBar/DraftStatusBar';
import ScheduledStatusBar from 'components/shared/StatusBar/ScheduledStatusBar';
import PublishedStatusBar from 'components/shared/StatusBar/PublishedStatusBar';
import { TOOLBAR_STATUS } from 'data/toolbar';
import { Lock, Info } from 'react-feather';
// SettingsDisclaimer is styled in ProductSettings.tsx

// Error — drawer field (FormInput → toolkit ValidationErrorMessage)
<ValidationErrorMessage
  id="slug"
  error="Enter a short descriptive URL to improve SEO."
/>

// Warning — drawer field (Headlines slug optimization)
<ValidationWarningMessage errorMessage="The Slug field for this content has not been optimized" />

// Info — drawer settings disclaimer (ProductSettings)
<SettingsDisclaimer>
  <Info />
  <span>These settings apply to all product embeds and slides.</span>
</SettingsDisclaimer>

// Success — publish / embargo drawer (UseTargetDateChip applied state)
// Rendered when target publish date matches the picker value

// Composer gallery error (styled ValidationErrorMessage)
<ValidationErrorMessage
  align="center"
  background="var(--background-error)"
  color="var(--text-dark)"
  error="Add a caption."
  icon={<AlertTriangle size={20} color="var(--error)" />}
  id="gallery"
/>

// Editor status bar (content edit toolbar)
<DraftStatusBar statusText="DRAFT" />
<ScheduledStatusBar
  statusText="SCHEDULED"
  bannerText="This content will be published on Mar 24, 2026 at 9:00 AM"
  onReschedule={handleReschedule}
/>
<PublishedStatusBar statusText="LIVE" bannerText="Last published on Mar 20, 2026 at 2:30 PM" />

// Notification bar (locks, list info, transcoding errors)
<NotificationBar
  message="This content is locked by Jane Smith"
  status={TOOLBAR_STATUS.locked}
  Icon={Lock}
/>
<NotificationBar message="Showing published content only" status={TOOLBAR_STATUS.scheduled} />
```
