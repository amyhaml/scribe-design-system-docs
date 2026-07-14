import type { IconProps } from "react-feather";
import { AlertOctagon, AlertTriangle, CheckCircle, Info } from "react-feather";

import { cn } from "@/lib/utils";

/** Same union as `Severity` in `@scribe/toolkit/components/SeverityIcon/SeverityIcon.tsx`. */
export type ScribeSeverity = "success" | "info" | "warning" | "error";

const ICON_BY_SEVERITY = {
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  error: AlertOctagon,
} as const;

/**
 * Port of `@scribe/toolkit/components/SeverityIcon` — icon + `statusColors2` main color.
 */
export function ScribeSeverityIcon({
  severity,
  className,
  ...props
}: IconProps & { severity: ScribeSeverity }) {
  const Icon = ICON_BY_SEVERITY[severity];
  return (
    <Icon
      height="1em"
      width="1em"
      className={cn("scribe-severity-icon", `scribe-severity-icon--${severity}`, className)}
      {...props}
    />
  );
}
