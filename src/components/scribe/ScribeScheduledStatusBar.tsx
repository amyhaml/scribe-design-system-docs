import type { MouseEvent } from "react";

import { ScribeBaseStatusBar } from "./ScribeBaseStatusBar";

export interface ScribeScheduledStatusBarProps {
  statusText: string;
  bannerText?: string;
  onReschedule?: (event: MouseEvent<HTMLButtonElement>) => void;
  rescheduleText?: string;
  rescheduleDisabled?: boolean;
}

/**
 * Port of `Scribe/src/components/shared/StatusBar/ScheduledStatusBar.tsx`.
 */
export function ScribeScheduledStatusBar({
  statusText,
  bannerText,
  onReschedule,
  rescheduleText = "Reschedule",
  rescheduleDisabled = false,
}: ScribeScheduledStatusBarProps) {
  return (
    <ScribeBaseStatusBar
      className="scribe-status-bar--scheduled"
      statusText={statusText}
      bannerText={bannerText}
    >
      {onReschedule ? (
        <button
          type="button"
          className="scribe-status-bar__reschedule"
          onClick={onReschedule}
          disabled={rescheduleDisabled}
        >
          {rescheduleText}
        </button>
      ) : null}
    </ScribeBaseStatusBar>
  );
}
