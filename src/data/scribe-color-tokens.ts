/**
 * Color tokens sourced from the Scribe application repo:
 * - Primitives: `packages/styles/src/index.ts` → `colors`
 * - Semantic CSS variables: `packages/styles/src/global.ts` → `:root`
 * - Theme values: `packages/styles/src/index.ts` → `lightTheme`, `statusColors`, `actionColors`
 *
 * When Scribe updates palette or globals, mirror changes here so the docs stay accurate.
 */

export const SCRIBE_COLOR_PRIMITIVES = {
  black: "#000000",
  blue: {
    0: "#EBF1FF",
    5: "#B8C5F4",
    10: "#8A93E8",
    20: "#6764D1",
    30: "#4E49E0",
    40: "#2920DA",
    50: "#0D08A5",
    60: "#3C5587",
    tint: "#918FE5",
  },
  gray: {
    0: "#ECEDEE",
    3: "#f8f6f6",
    5: "#D9DADD",
    10: "#C9C7CC",
    15: "#BDBDBD",
    20: "#B1B1B4",
    30: "#868587",
    40: "#555555",
    45: "#59595A",
    50: "#2D2D2D",
    60: "#252525",
    90: "#E5E5E5",
    100: "#F5F5F5",
    tint: null as null,
  },
  green: {
    0: "#F5FFFB",
    3: "#d7f4e9",
    5: "#B9E1D1",
    10: "#85C3A9",
    20: "#5DA584",
    30: "#37805D",
    40: "#245B46",
    50: "#122F26",
    tint: "#4CA97E",
  },
  neon: {
    0: "#FFF9ED",
    5: "#F7F1A9",
    10: "#DCF069",
    20: "#AEE832",
    30: "#6FC42F",
    40: "#2D8821",
    50: "#164B19",
    tint: null as null,
  },
  pink: {
    0: "#FFF5FD",
    5: "#FAD1F5",
    10: "#F6AFF2",
    20: "#ED93F1",
    30: "#C96DC4",
    40: "#893D7C",
    50: "#481D3D",
    tint: "#ED93F1",
  },
  purple: {
    0: "#EEEBFF",
    5: "#CBBBFC",
    10: "#B28CF9",
    20: "#A665F5",
    30: "#A240F2",
    40: "#551AA5",
    50: "#210A57",
    tint: "#BE7AF5",
  },
  red: {
    0: "#FFEBEB",
    5: "#FBB9B8",
    10: "#F88B87",
    20: "#F2685F",
    30: "#ED4738",
    40: "#E21F14",
    50: "#AA0703",
    60: "#540200",
    tint: "#F06A71",
  },
  white: "#FFFFFF",
  yellow: {
    0: "#FFF7E8",
    5: "#FCE4B7",
    10: "#F9D187",
    20: "#F6C05C",
    30: "#F3B032",
    40: "#A26900",
    45: "#B88119",
    50: "#7D570F",
    60: "#382707",
    tint: null as null,
  },
} as const;

export type ScribeCssColorVarMeta = {
  /** Name as in Scribe `global.ts` (e.g. `primary-text`, `unlockUser`) */
  name: string;
  group: string;
};

/** Maps Scribe `global.ts` names to `--scribe-*` documentation variables on :root. */
export function appVarToDocCssVar(appName: string): string {
  const kebab = appName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  return `scribe-${kebab}`;
}

/** Single-color variables from `packages/styles/src/global.ts` (excludes font sizes & composite borders). */
export const SCRIBE_CSS_COLOR_VARS: ScribeCssColorVarMeta[] = [
  { group: "Brand", name: "primary" },
  { group: "Brand", name: "primary-text" },
  { group: "Brand", name: "primary-dark" },
  { group: "Brand", name: "primary-light" },
  { group: "Brand", name: "primary-hover" },
  { group: "Brand", name: "primary-contrast-text" },

  { group: "Surfaces", name: "background-checked" },
  { group: "Surfaces", name: "background-dashed" },
  { group: "Surfaces", name: "background-main" },
  { group: "Surfaces", name: "background-paper" },
  { group: "Surfaces", name: "background-disabled" },
  { group: "Surfaces", name: "background-error" },
  { group: "Surfaces", name: "background-success" },
  { group: "Surfaces", name: "background-hover-overlay" },
  { group: "Surfaces", name: "background-indicator" },
  { group: "Surfaces", name: "background-modal" },
  { group: "Surfaces", name: "background-nav" },
  { group: "Surfaces", name: "background-nav-feature" },
  { group: "Surfaces", name: "background-nav-stage" },
  { group: "Surfaces", name: "background-invalid" },
  { group: "Surfaces", name: "background-warning-icon" },

  { group: "Structure", name: "divider" },

  { group: "Text", name: "text" },
  { group: "Text", name: "text-light" },
  { group: "Text", name: "text-lighter" },
  { group: "Text", name: "text-disabled" },
  { group: "Text", name: "text-placeholder" },
  { group: "Text", name: "text-placeholderfocus" },

  { group: "Focus", name: "focus-color" },

  { group: "Placeholders", name: "placeholder-image" },

  { group: "Status", name: "active" },
  { group: "Status", name: "error" },
  { group: "Status", name: "error-icon" },
  { group: "Status", name: "error-contrast-text" },
  { group: "Status", name: "deactivated" },
  { group: "Status", name: "info" },
  { group: "Status", name: "locked" },
  { group: "Status", name: "success" },
  { group: "Status", name: "success-contrast-text" },
  { group: "Status", name: "warning" },
  { group: "Status", name: "warning-contrast-text" },
  { group: "Status", name: "warning-icon" },
  { group: "Status", name: "warning-strong" },
  { group: "Status", name: "delete" },

  { group: "Publishing", name: "archived" },
  { group: "Publishing", name: "archived-muted" },
  { group: "Publishing", name: "archived-text" },
  { group: "Publishing", name: "archived-checked" },
  { group: "Publishing", name: "draft" },
  { group: "Publishing", name: "draft-saved" },
  { group: "Publishing", name: "pending" },
  { group: "Publishing", name: "publish" },
  { group: "Publishing", name: "published" },
  { group: "Publishing", name: "published-muted" },
  { group: "Publishing", name: "published-text" },
  { group: "Publishing", name: "schedule" },
  { group: "Publishing", name: "scheduled" },
  { group: "Publishing", name: "scheduled-muted" },
  { group: "Publishing", name: "scheduled-header-text" },
  { group: "Publishing", name: "published-banner" },
  { group: "Publishing", name: "published-banner-text" },
  { group: "Publishing", name: "draft-indicator" },
  { group: "Publishing", name: "unlockUser" },
  { group: "Publishing", name: "locked-user" },

  { group: "Tooltips", name: "balloon-tooltip-background" },
  { group: "Tooltips", name: "balloon-tooltip-text" },
];

/** Composite / sizing tokens from the same `global.ts` block (not swatched as fills). */
export const SCRIBE_NON_COLOR_TOKENS: { name: string; value: string; group: string }[] = [
  { group: "Typography (size)", name: "default-font-size", value: "1rem" },
  { group: "Typography (size)", name: "label-font-size", value: "0.875rem" },
  { group: "Typography (size)", name: "heading-font-size", value: "1.125rem" },
  { group: "Typography (size)", name: "form-heading-font-size", value: "1.25rem" },
  { group: "Typography (size)", name: "heading-medium-font-size", value: "1.75rem" },
  { group: "Typography (size)", name: "small-font-size", value: "0.75rem" },
  { group: "Typography (size)", name: "xsmall-font-size", value: "0.625rem" },
  { group: "Focus", name: "focus-indication-thickness", value: "0.125rem" },
  { group: "Borders", name: "border-width", value: "0.0125rem" },
  { group: "Borders", name: "secondary-border-width", value: "0.0625rem" },
  { group: "Borders", name: "tertiary-border-width", value: "0.125rem" },
  {
    group: "Borders",
    name: "border",
    value: "var(--scribe-border-width) solid var(--scribe-divider)",
  },
  {
    group: "Borders",
    name: "secondary-border",
    value: "var(--scribe-secondary-border-width) solid var(--scribe-background-disabled)",
  },
  {
    group: "Borders",
    name: "border-focus",
    value: "0 0 0 var(--scribe-focus-indication-thickness) var(--scribe-focus-color)",
  },
  {
    group: "Borders",
    name: "border-primary",
    value: "var(--scribe-border-width) solid var(--scribe-primary)",
  },
  {
    group: "Borders",
    name: "border-dashed",
    value: "0.125rem dashed var(--scribe-primary)",
  },
  {
    group: "Borders",
    name: "secondary-border-dashed",
    value: "var(--scribe-secondary-border-width) dashed var(--scribe-background-dashed)",
  },
  { group: "Borders", name: "border-radius", value: "0.3125rem" },
  {
    group: "Borders",
    name: "border-error",
    value: "var(--scribe-secondary-border-width) solid var(--scribe-error)",
  },
  {
    group: "Borders",
    name: "border-warning",
    value: "var(--scribe-secondary-border-width) solid var(--scribe-warning)",
  },
];

/** Every `*-font-size` entry from Scribe `global.ts` mirrored here (7 tokens). */
export const SCRIBE_TYPOGRAPHY_SIZE_TOKENS: { name: string; value: string }[] =
  SCRIBE_NON_COLOR_TOKENS.filter((t) => t.group === "Typography (size)").map(({ name, value }) => ({
    name,
    value,
  }));
