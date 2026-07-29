---
title: Color
description: Color defines the semantic roles used for Scribe surfaces, text, borders, actions, and status states. Use these tokens to apply meaning consistently across product interfaces.
route: /foundations/color
category: foundations
---

<!-- scribe-skill-guidance:start -->

Use semantic color roles for product UI, not raw palette values. Semantic tokens preserve meaning across surfaces, text, actions, status, publishing state, and focus treatment.

## Usage

- Use **text** roles for hierarchy: standard text for primary content, lighter text for supporting content, placeholder text only before entry, and disabled text only for unavailable controls.
- Use **surface** roles for page, paper, disabled, checked, modal, navigation, success, and error backgrounds. Do not substitute an arbitrary primitive color for a semantic surface.
- Use the **divider** role for structural boundaries and the **focus** role for visible keyboard focus.
- Use **brand** roles for primary actions and their contrast text; reserve hover and dark variants for their defined interaction states.
- Use **status** roles with clear text and an appropriate icon or state: error for blocking issues, warning for non-blocking risk, success for completed actions, and info for contextual guidance.
- Use **publishing** roles only to communicate editorial state such as draft, pending, scheduled, published, archived, or locked.

Never communicate a state through color alone. Keep selected, disabled, invalid, error, and focus states explicit and understandable for keyboard and assistive-technology users.

<!-- scribe-skill-guidance:end -->
