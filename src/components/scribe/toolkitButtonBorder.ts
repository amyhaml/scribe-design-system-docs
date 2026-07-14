/**
 * Matches `ToolbarButton`’s styled `border` expression
 * (`Scribe/src/pages/Content/Edit/Toolbar/ToolbarButton.tsx`).
 */
export function toolbarBorderFromProps(
  border: boolean | string | undefined,
  borderColor: string | undefined,
  color: string | undefined,
): string | undefined {
  if (!border) return undefined;
  const solidColor = typeof border === "string" ? border : (borderColor ?? color ?? "var(--text)");
  return `var(--border-width) solid ${solidColor}`;
}

export function toolbarDisabledBorder(border: boolean | string | undefined): string | undefined {
  if (!border) return undefined;
  return "var(--border)";
}
