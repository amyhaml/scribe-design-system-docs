import type { ComponentType, CSSProperties } from "react";

import type { NotificationBarStatus } from "@/data/scribe-toolbar-status";
import { cn } from "@/lib/utils";

export interface ScribeNotificationBarProps {
  className?: string;
  message: string;
  status: NotificationBarStatus;
  Icon?: ComponentType;
  /** Matches `StyledNotificationBar` in `Scribe/src/components/Content/styled/index.ts`. */
  styled?: boolean;
}

/**
 * Port of `Scribe/src/components/shared/NotificationBar.tsx`.
 * Docs use `position: static` via CSS class instead of source `position: absolute`.
 */
export function ScribeNotificationBar({
  className,
  message,
  status,
  Icon,
  styled = false,
}: ScribeNotificationBarProps) {
  const style = {
    "--scribe-notification-bar-bg": status.alertBarColor,
    "--scribe-notification-bar-color": status.textColor ?? "var(--primary-contrast-text)",
  } as CSSProperties;

  return (
    <div
      className={cn("scribe-notification-bar", styled && "scribe-notification-bar--styled", className)}
      style={style}
      role="alert"
    >
      {Icon ? <Icon /> : null}
      <div className="scribe-notification-bar__message" dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
}
