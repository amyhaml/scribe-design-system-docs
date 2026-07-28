---
title: AI Design Guide
description: Decision rules for using Scribe components and foundations in product design work.
category: guidance
---

# AI Design Guide

Use this guide when an agent needs to make a Scribe design decision. It is deliberately design-focused: it covers component choice, visual foundations, interaction, and accessibility. It does not define implementation imports, documentation demos, or local documentation ports.

## Decision hierarchy

1. Apply an explicit comparison in this guide when one exists.
2. Apply the relevant foundation guidance for typography, color, spacing, radius, and elevation.
3. Apply the relevant component page for purpose, states, and usage.
4. Escalate when the intended behavior is not covered. Do not invent a new component or state from visual similarity alone.

## Component selection

### Switch or checkbox {#switch-checkbox}

Use a **Switch** for one independent setting that turns on or off and takes effect immediately, such as a setting, filter, or drawer option.

Use a **Checkbox** when the user is selecting one or more items from a set. Use an indeterminate checkbox only for a parent or bulk-selection control representing mixed child selection.

Do not substitute a checkbox for a binary setting merely because both controls have an on/off state, and do not substitute a switch for multi-select choices.

### Snackbar or alert and banner {#snackbar-alert}

Use a **Snackbar** for brief, temporary feedback after an action starts or finishes. It should confirm success or communicate an error without interrupting the active workflow.

Use an **inline Alert** for validation or contextual guidance that must remain next to the affected drawer, composer, or field. Use a **Banner** for page-level, editor-status, or listing-state information that should remain visible in the layout.

Do not use a temporary snackbar for an error that requires a field correction or for a status users need to reference while they continue work.

### Tooltip or inline help {#tooltip-inline-help}

Use a **Tooltip** for concise supporting text about a compact control, icon, or label. It is supplementary: users can reveal it on hover, focus, or tap.

Use **inline help** when guidance is necessary to complete the task, needs to remain visible while users act, contains more than brief supporting text, or explains a validation requirement.

Do not hide required instructions or error recovery steps in a tooltip.

### Tabs or navigation {#tabs-navigation}

Use **Tabs** to switch among peer panels inside the same page, drawer, toolbar, or working surface while preserving the surrounding context. Use validation badges when users need to know that a panel contains missing fields before opening it.

Use **navigation** when the destination changes the user’s place in the product, information architecture, or primary workflow rather than simply swapping peer content in the current surface.

Do not use tabs as a replacement for a deep route hierarchy or for unrelated destinations.

### Menus and dropdowns {#menus-dropdowns}

Use a **Block menu** to add an embed block from a searchable composer list. Use a **Popover menu** for temporary actions or destinations from app chrome or an icon button. Use a **Dropdown menu** for choosing from text options, with search for longer lists.

Keep menu choices temporary and anchored to the initiating control. Do not use a menu when the choice needs persistent comparison or more explanatory content.

## Typography and layout foundations

Use the typography foundation to establish a clear role hierarchy: page titles introduce a page, section headings group related content, labels identify controls, and body text explains or supports a task. Preserve the type family, size, weight, and line-height assigned to the existing Scribe role rather than adjusting text by eye.

Use the spacing scale to separate unrelated groups, group related controls, and align repeated rows. Keep dense product workflows compact but legible; do not introduce one-off spacing values to solve a local alignment issue.

Use the radius and elevation foundations consistently. Radius distinguishes control and surface types; elevation communicates a temporary or layered surface such as a menu, popover, dialog, or tooltip. Do not add elevation to a surface solely for decoration.

## Semantic color and status

Use semantic color roles, not raw palette values, for product UI. Apply foreground roles to text and icons, surface roles to page and component backgrounds, divider roles to boundaries, and focus roles to keyboard-visible focus treatment.

Use status color together with clear text and an appropriate icon or state. Error communicates a blocking issue that needs attention, warning communicates a non-blocking risk or optimization hint, success confirms a completed action, and info provides contextual guidance. Never rely on color alone to communicate status.

Keep disabled controls visible but unavailable only when users need to understand the option exists. Preserve readable disabled labels and explain the unavailable condition when the reason is not obvious.

## Accessibility and interaction

- Make all interactive controls keyboard reachable with a visible focus state.
- Provide labels for icon-only controls; a tooltip is supplemental and does not replace an accessible name.
- Keep validation messages direct, field-specific, and adjacent to the relevant control when possible.
- Preserve selected, disabled, error, and focus states rather than encoding state only through color.
- Use persistent inline or banner guidance when users need it while completing work; transient feedback is only for information that does not need to remain available.

## Topic index

| Topic | Use for | Sources |
| --- | --- | --- |
| `component-choice` | component, choose, selection, control, setting, editor, form, validation, publish, publishing, content workflow, feedback | `components/switch.md`, `components/checkbox.md`, `components/snackbar.md`, `components/alert-bar.md`, `components/tooltip.md`, `components/tabbed-layout.md`, `components/menu.md` |
| `switch-checkbox` | switch, checkbox, binary, setting, preference, multi-select, selection | `components/switch.md`, `components/checkbox.md` |
| `snackbar-alert` | snackbar, toast, alert, banner, validation, status, feedback, publish, publishing | `components/snackbar.md`, `components/alert-bar.md` |
| `tooltip-inline-help` | tooltip, help, guidance, icon, instruction | `components/tooltip.md`, `components/alert-bar.md` |
| `tabs-navigation` | tabs, navigation, panel, drawer, workflow, badge | `components/tabbed-layout.md` |
| `menus-dropdowns` | menu, dropdown, popover, embed, action | `components/menu.md` |
| `typography-layout` | typography, type, heading, label, body, spacing, radius, elevation, layout, editor, form, setting, content workflow | `foundations/typography.md`, `foundations/spacing.md`, `foundations/radius.md`, `foundations/elevation.md` |
| `semantic-color` | color, semantic, status, surface, error, warning, success, focus, disabled, validation, publish, publishing, feedback | `foundations/color.md`, `components/alert-bar.md`, `components/snackbar.md` |
| `accessibility` | accessibility, keyboard, focus, label, disabled, validation, screen reader | `components/checkbox.md`, `components/switch.md`, `components/tooltip.md`, `components/alert-bar.md` |
