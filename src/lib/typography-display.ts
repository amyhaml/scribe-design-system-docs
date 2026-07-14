/** Assumes browser default `1rem` = 16px for px ↔ rem labels in typography docs. */
export const ROOT_FONT_PX = 16;

export function formatFontSizeWithCrossUnit(value: string): string {
  const v = value.trim();
  if (!v || v === "—") return v;

  const remMatch = v.match(/^([\d.]+)\s*rem$/i);
  if (remMatch) {
    const rem = parseFloat(remMatch[1]);
    const px = Math.round(rem * ROOT_FONT_PX);
    return `${v} (${px}px)`;
  }

  const pxMatch = v.match(/^([\d.]+)\s*px$/i);
  if (pxMatch) {
    const px = parseFloat(pxMatch[1]);
    const rem = px / ROOT_FONT_PX;
    const remLabel = `${parseFloat(rem.toFixed(4))}`.replace(/\.?0+$/, "");
    return `${v} (${remLabel}rem)`;
  }

  return v;
}
