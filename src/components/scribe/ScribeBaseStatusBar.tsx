import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ScribeBaseStatusBarProps {
  className?: string;
  statusText: string;
  bannerText?: string;
  children?: ReactNode;
}

/**
 * Port of `Scribe/src/components/shared/StatusBar/BaseStatusBar.tsx`.
 */
export function ScribeBaseStatusBar({
  className,
  statusText,
  bannerText,
  children,
}: ScribeBaseStatusBarProps) {
  return (
    <div className={cn("scribe-status-bar", className)}>
      <div className="scribe-status-bar__header">
        <div className="scribe-status-bar__indicator" />
        <div className="scribe-status-bar__label">{statusText}</div>
      </div>
      {bannerText ? <div className="scribe-status-bar__banner-text">{bannerText}</div> : null}
      {children}
    </div>
  );
}
