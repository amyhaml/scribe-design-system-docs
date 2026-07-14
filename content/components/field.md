---
title: Field
description: Fields let users enter, select, search, and validate information in Scribe forms. They appear in drawers, settings, filters, and content editing workflows.
route: /components/field
category: components
breadcrumbs:
  - label: Components
  - label: Field
toc:
  - id: overview
    label: Overview
  - id: text-fields
    label: Text fields
  - id: fields-with-counter
    label: Fields with counter
  - id: dropdown-fields
    label: Dropdown fields
  - id: search-fields
    label: Search fields
  - id: code
    label: Code
---

## Overview

Fields let users enter, select, search, and validate information in Scribe forms. They are used throughout drawers, settings, filters, and content editing workflows.

This page covers text fields, character counters, dropdown fields, and search fields.

## Text fields {#text-fields}

Text fields collect short text values and communicate focus, disabled, read-only, required, and error states.

- **Default** — accepts text input and uses an underline as the field boundary.
- **Focus** — changes the underline and label color while the user is editing.
- **Disabled and read-only** — prevent editing; read-only fields can show the lock affordance.
- **Error** — uses the error underline, label color, and validation message.

<!-- demo -->

## Fields with counter {#fields-with-counter}

Counters show how much text has been entered against a configured field limit.

- **Counter** — displays the current character count beside the field.
- **Limit** — displays the current count against the configured limit.
- **Error** — keeps the counter aligned with the error state when validation fails.
- **Read-only** — keeps the lock affordance aligned with the counter.

<!-- demo -->

## Dropdown fields {#dropdown-fields}

Dropdown fields let users choose from a constrained set of values.

- **Default** — shows the label in the field until a value is selected.
- **Selected** — moves the label above the selected value.
- **Focus** — uses the focused underline while the menu is open.
- **Error** — applies the required/error treatment and validation message.
- **Disabled** — prevents selection changes.

<!-- demo -->

## Search fields {#search-fields}

Search fields help users find records in listing workflows.

- **Default** — shows the search icon and record-type label.
- **Focus** — uses the focused outline while the user is searching.

<!-- demo -->

## Code

<!-- demo -->

```tsx
import {
  ScribeFieldPort,
  ScribeSearchFieldPort,
  ScribeSelectFieldPort,
} from "@/components/scribe";

// Source: Scribe/packages/toolkit/src/components/FormInput/FormInput.tsx
// Source: Scribe/packages/toolkit/src/components/FormInput/FormInput.styles.ts
// Source: Scribe/packages/toolkit/src/components/Select/index.tsx
// Source: Scribe/packages/toolkit/src/components/Select/ReactSelectProps.ts
// Source: Scribe/src/components/shared/SearchBar.tsx

<ScribeFieldPort name="title" label="Title" value="Article title" hardLimit={100} />

<ScribeSelectFieldPort
  name="section"
  label="Section"
  selectedOption={{ label: "Culture", value: "culture" }}
  options={[{ label: "Culture", value: "culture" }]}
/>

<ScribeSearchFieldPort label="Search Content" />
```
