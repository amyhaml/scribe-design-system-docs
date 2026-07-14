import type { ReactNode } from "react";

import { ScribeSeverityIcon, type ScribeSeverity } from "@/components/scribe/ScribeSeverityIcon";
import { cn } from "@/lib/utils";

export type ScribeToolkitAlertProps = {
  children: ReactNode;
  severity: ScribeSeverity;
  icon?: ReactNode | "none";
  className?: string;
};

function ScribeToolkitAlertBase({ children, severity, icon, className }: ScribeToolkitAlertProps) {
  const shouldHideIcon = icon === "none";
  const prefixIcon = !shouldHideIcon && (icon || <ScribeSeverityIcon severity={severity} />);

  return (
    <div
      role="alert"
      className={cn("scribe-toolkit-alert", `scribe-toolkit-alert--${severity}`, className)}
    >
      <div className="scribe-toolkit-alert__row">
        {prefixIcon}
        <div className="scribe-toolkit-alert__content">{children}</div>
      </div>
    </div>
  );
}

function omitSeverity<T extends { severity?: unknown }>(props: T) {
  const { severity: _s, ...rest } = props;
  return rest;
}

/**
 * Static port of `@scribe/toolkit/components/Alert` (`Alert.Info`, `.Success`, etc.)
 * for documentation previews — no Collapse / dismiss / i18n from source.
 */
export const ScribeToolkitAlert = Object.assign(ScribeToolkitAlertBase, {
  Error: (props: Omit<ScribeToolkitAlertProps, "severity">) => (
    <ScribeToolkitAlertBase severity="error" {...omitSeverity(props)} />
  ),
  Info: (props: Omit<ScribeToolkitAlertProps, "severity">) => (
    <ScribeToolkitAlertBase severity="info" {...omitSeverity(props)} />
  ),
  Success: (props: Omit<ScribeToolkitAlertProps, "severity">) => (
    <ScribeToolkitAlertBase severity="success" {...omitSeverity(props)} />
  ),
  Warning: (props: Omit<ScribeToolkitAlertProps, "severity">) => (
    <ScribeToolkitAlertBase severity="warning" {...omitSeverity(props)} />
  ),
});
