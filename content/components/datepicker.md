---
title: Datepicker
description: Datepickers let users choose or clear dates in Scribe forms, filters, and metadata workflows.
route: /components/datepicker
category: components
breadcrumbs:
  - label: Components
  - label: Datepicker
toc:
  - id: overview
    label: Overview
  - id: calendar
    label: Calendar
  - id: states
    label: States
  - id: code
    label: Code
---

## Overview

Datepickers let users choose dates for form fields, filters, scheduling controls, and metadata settings in Scribe.

This page covers the closed field states used before the calendar opens, including empty, selected, and error.

## Calendar

The calendar opens from date fields that need an exact date and time, such as publish scheduling.

<!-- demo -->

## States

- **Empty** — shows the field label and calendar action.
- **Selected** — shows the selected date as a removable chip.
- **Error** — shows validation messaging below the field.

<!-- demo -->

## Code

<!-- demo -->

```tsx
import { ScribeDatePickerPort, ScribeDateTimeCalendarPort } from "@/components/scribe";

// Source: Scribe/packages/toolkit/src/components/DatePicker/DatePicker.tsx
// Source: Scribe/packages/toolkit/src/components/DatePicker/DatePicker.types.ts
// Source: Scribe/packages/toolkit/src/components/FieldsetHeading/FieldsetHeading.tsx
// Source: Scribe/packages/toolkit/src/components/IconButton/IconButton.tsx
// Source: Scribe/src/components/shared/PublishPanel/PublishScheduleForm.tsx

<ScribeDatePickerPort
  label="Date"
  date={new Date("2026-06-26T12:00:00")}
  formattedDate="06/26/2026"
  name="publish-date"
  onChange={(date) => console.log(date)}
/>

<ScribeDateTimeCalendarPort
  label="Publish Date"
  value={new Date("2026-06-27T00:00:00")}
  onChange={(date) => console.log(date)}
/>
```
