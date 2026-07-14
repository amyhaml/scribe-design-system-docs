/**
 * Spacing and elevation tokens mirrored from `Scribe/packages/styles/src/index.ts`
 * (`spacing`, `elevations`). Keep in sync when those exports change.
 *
 * Default UI border radius matches `global.ts` `:root` → `--border-radius` (see `scribe-tokens.css` → `--scribe-border-radius`).
 * Docs chrome radius scale is in `styles.css` (`SCRIBE_DESIGN_RADIUS_TOKENS`).
 * Elevation shadow stacks are documented via `SCRIBE_DESIGN_ELEVATION_TOKENS`.
 */

export const SCRIBE_APP_SPACING_ORDER = [
  "xxxs",
  "xxs",
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "xxxl",
] as const;

export type ScribeAppSpacingKey = (typeof SCRIBE_APP_SPACING_ORDER)[number];

/** Same string values as `export const spacing` in packages/styles `index.ts`. */
export const SCRIBE_APP_SPACING: Record<ScribeAppSpacingKey, string> = {
  xxxs: "0.125rem",
  xxs: "0.25rem",
  xs: "0.5rem",
  s: "0.75rem",
  m: "1rem",
  l: "1.25rem",
  xl: "2rem",
  xxl: "3rem",
  xxxl: "4rem",
};

export const SCRIBE_ELEVATION_ORDER = ["main", "overlay", "reverseOverlay", "top"] as const;

export type ScribeElevationKey = (typeof SCRIBE_ELEVATION_ORDER)[number];

/** Same string values as `export const elevations` in packages/styles `index.ts`. */
export const SCRIBE_APP_ELEVATIONS: Record<ScribeElevationKey, string> = {
  main: "0px 1px 3px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.08), 0px 0px 2px rgba(0, 0, 0, 0.05);",
  overlay:
    "0px 1px 10px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);",
  reverseOverlay:
    "0px -1px 10px rgba(0, 0, 0, 0.2), 0px -4px 5px rgba(0, 0, 0, 0.12), 0px -2px 4px rgba(0, 0, 0, 0.14);",
  top: "0px 1px 10px rgba(0, 0, 0,  0.14), 0px 1px 10px rgba(0, 0, 0,  0.14);",
};

/** Normalize shadow strings from `packages/styles` for `style={{ boxShadow }}` (no trailing `;`). */
function normalizeBoxShadow(value: string): string {
  return value.replace(/;\s*$/, "").trim();
}

const SCRIBE_ELEVATION_DOC_META: Record<
  ScribeElevationKey,
  { scaleDpLabel: string; scaleClassLine: string; tailwind: string; useFor: string }
> = {
  main: {
    scaleDpLabel: "1dp",
    scaleClassLine: "elevations.main",
    tailwind: "—",
    useFor: "Default surfaces — cards, panels, and chrome at rest.",
  },
  overlay: {
    scaleDpLabel: "2dp",
    scaleClassLine: "elevations.overlay",
    tailwind: "—",
    useFor: "Floating layers above the page — menus, popovers, dialogs.",
  },
  reverseOverlay: {
    scaleDpLabel: "2dp",
    scaleClassLine: "elevations.reverseOverlay",
    tailwind: "—",
    useFor: "Upward shadow for elements anchored along the bottom edge.",
  },
  top: {
    scaleDpLabel: "4dp",
    scaleClassLine: "elevations.top",
    tailwind: "—",
    useFor: "Maximum lift — sticky headers, toasts, and top-most overlays.",
  },
};

/** Foundations docs rows: same values as `SCRIBE_APP_ELEVATIONS`, plus labels and usage copy. */
export const SCRIBE_DESIGN_ELEVATION_TOKENS: {
  key: ScribeElevationKey;
  token: string;
  value: string;
  scaleDpLabel: string;
  scaleClassLine: string;
  tailwind: string;
  useFor: string;
}[] = SCRIBE_ELEVATION_ORDER.map((key) => ({
  key,
  token: `elevations.${key}`,
  value: normalizeBoxShadow(SCRIBE_APP_ELEVATIONS[key]),
  ...SCRIBE_ELEVATION_DOC_META[key],
}));

/** `global.ts` → `:root` `--border-radius` (docs mirror: `--scribe-border-radius`). */
export const SCRIBE_DEFAULT_BORDER_RADIUS = "0.3125rem";

/** Scribe product UI radius (single token). App: `--border-radius`; foundations mirror: `--scribe-border-radius`. */
export const SCRIBE_APP_BORDER_RADIUS = {
  appCssVar: "--border-radius",
  docMirrorVar: "--scribe-border-radius",
  value: SCRIBE_DEFAULT_BORDER_RADIUS,
} as const;

/** Core docs / Tailwind `@theme` radii from `styles.css`. */
export const SCRIBE_DESIGN_RADIUS_TOKENS: {
  token: string;
  value: string;
  tailwind: string;
  useFor: string;
  /** Short label for the Scale preview row */
  scaleLabel: string;
}[] = [
  {
    token: "--radius-none",
    value: "0px",
    tailwind: "rounded-none",
    useFor: "Full-bleed surfaces, sharp corners.",
    scaleLabel: "none",
  },
  {
    token: "--radius-sm",
    value: "4px",
    tailwind: "rounded-sm",
    useFor: "Inputs, buttons, chips, toolbar tiles.",
    scaleLabel: "sm",
  },
  {
    token: "--radius-md",
    value: "8px",
    tailwind: "rounded-md",
    useFor: "Cards, popovers, dialogs, menus.",
    scaleLabel: "md",
  },
  {
    token: "--radius-lg",
    value: "12px",
    tailwind: "rounded-lg",
    useFor: "Hero cards, large panels.",
    scaleLabel: "lg",
  },
  {
    token: "--radius-rounded",
    value: "1024px",
    tailwind: "rounded-rounded",
    useFor: "Pills: badges, segmented controls, avatars.",
    scaleLabel: "rounded",
  },
];
