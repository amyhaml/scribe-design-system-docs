import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

import { toolbarBorderFromProps, toolbarDisabledBorder } from "./toolkitButtonBorder";

/** Same union as `ButtonProps['variant']` in `@scribe/toolkit/components/Button/Button.tsx`. */
export type ToolkitButtonVariant =
  | "primary"
  | "tertiaryOutline"
  | "secondaryOutline"
  | "secondaryText"
  | "outlined"
  | "contained"
  | "info"
  | "error"
  | "warning"
  | "success";

/** Same as toolkit `Sizes`. */
export type ToolkitButtonSize = "small" | "medium" | "large";

export interface ToolkitButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color" | "border"
> {
  /** Passed through to DOM when not `asChild`. */
  asChild?: boolean;
  background?: string;
  border?: boolean | string;
  borderColor?: string;
  color?: string;
  cursor?: React.CSSProperties["cursor"];
  flexButton?: boolean;
  /** Preview + share split control: left segment (`start`) / chevron (`end`) per `ToolbarButton` + `ShareLinkButton`. */
  splitSegment?: "start" | "end";
  variant?: ToolkitButtonVariant;
  size?: ToolkitButtonSize;
}

const V_SET = new Set<string>([
  "primary",
  "tertiaryOutline",
  "secondaryOutline",
  "secondaryText",
  "outlined",
  "contained",
  "info",
  "error",
  "warning",
  "success",
]);

function toolkitStyleVars(
  props: Pick<ToolkitButtonProps, "background" | "color" | "border" | "borderColor" | "cursor"> & {
    disabled?: boolean;
  },
): React.CSSProperties {
  const { background, color, border, borderColor, cursor, disabled } = props;

  const resolvedColor = color ?? "var(--primary-contrast-text)";
  const resolvedSvgColor = color ?? "var(--text)";

  const borderCss = toolbarBorderFromProps(border, borderColor, resolvedColor);
  const disabledBorder = disabled ? toolbarDisabledBorder(border) : undefined;

  const style: React.CSSProperties & Record<string, string | undefined> = {
    ["--scribe-toolkit-bg"]: background,
    ["--scribe-toolkit-color"]: resolvedColor,
    ["--scribe-toolkit-svg-color"]: resolvedSvgColor,
    ["--scribe-toolkit-border"]: borderCss,
    ["--scribe-toolkit-cursor"]: cursor,
    ["--scribe-toolkit-disabled-border"]: disabledBorder,
  };

  return style;
}

const ToolkitButton = React.forwardRef<HTMLButtonElement, ToolkitButtonProps>(
  (
    {
      className,
      asChild = false,
      type = "button",
      background,
      border,
      borderColor,
      color,
      cursor,
      flexButton,
      splitSegment,
      variant,
      size,
      disabled,
      style,
      ...rest
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const transparentBg = background === "transparent";

    const vars = toolkitStyleVars({
      background,
      color,
      border,
      borderColor,
      cursor,
      disabled: Boolean(disabled),
    });

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        disabled={disabled}
        data-bg-transparent={transparentBg ? "true" : undefined}
        data-variant={variant && V_SET.has(variant) ? variant : undefined}
        data-size={size}
        data-flex-button={flexButton ? "true" : undefined}
        data-split={splitSegment}
        className={cn("scribe-toolkit-button", className)}
        style={{ ...vars, ...style }}
        {...rest}
      />
    );
  },
);
ToolkitButton.displayName = "ToolkitButton";

/** @deprecated Use `ToolkitButton`; kept for short-term import stability. */
const ScribeButton = ToolkitButton;

export const TOOLKIT_BUTTON_VARIANTS = [
  "primary",
  "tertiaryOutline",
  "secondaryOutline",
  "secondaryText",
  "outlined",
  "contained",
  "info",
  "error",
  "warning",
  "success",
] as const satisfies readonly ToolkitButtonVariant[];

export const TOOLKIT_BUTTON_SIZES = [
  "small",
  "medium",
  "large",
] as const satisfies readonly ToolkitButtonSize[];

export { ToolkitButton, ScribeButton };
