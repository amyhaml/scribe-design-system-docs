/**
 * Maps Storybook component `slug` (see `slugify(title)` in `src/lib/storybook.ts`) to
 * typography slots documented for the Scribe product. Keys must match the live index.
 *
 * Multiple keys may point at the same spec when Storybook titles differ (e.g. group prefix).
 */
export type ComponentTypographySlot = {
  id: string;
  /** Human-readable slot name (e.g. "Section label"). */
  label: string;
  /** Optional HTML element convention (e.g. `legend`). */
  element?: string;
  /** Scribe `global.ts` name without `--` (e.g. `label-font-size`). */
  tokenName: string;
  notes?: string;
};

export type ComponentTypographySpec = {
  slots: ComponentTypographySlot[];
};

const DRAWER_TYPOGRAPHY: ComponentTypographySpec = {
  slots: [
    {
      id: "drawer-legend",
      label: "Section label",
      element: "legend",
      tokenName: "label-font-size",
      notes:
        "Scribe drawers use <legend> for grouped field labels; keep this token for consistency.",
    },
    {
      id: "drawer-title",
      label: "Title",
      tokenName: "heading-font-size",
      notes: "Primary drawer or sheet title.",
    },
    {
      id: "drawer-body",
      label: "Body",
      tokenName: "default-font-size",
      notes: "Supporting description and main drawer content.",
    },
  ],
};

const BUTTON_TYPOGRAPHY: ComponentTypographySpec = {
  slots: [
    {
      id: "btn-label",
      label: "Button label",
      element: "button",
      tokenName: "label-font-size",
      notes:
        "Toolkit `Button` sets `font-size: 0.75rem` in code (`Button.tsx`); `label-font-size` is listed for foundations cross-link only.",
    },
  ],
};

export const COMPONENT_TYPOGRAPHY_SLOTS: Record<string, ComponentTypographySpec> = {
  button: BUTTON_TYPOGRAPHY,
  "components-button": BUTTON_TYPOGRAPHY,
  "components-drawer": DRAWER_TYPOGRAPHY,
  "shared-drawer": DRAWER_TYPOGRAPHY,
  drawer: DRAWER_TYPOGRAPHY,
};

export function typographyTokenAnchorId(tokenName: string): string {
  return `typography-token-${tokenName}`;
}

export function getTypographySlotsForSlug(slug: string): ComponentTypographySpec | undefined {
  return COMPONENT_TYPOGRAPHY_SLOTS[slug];
}
