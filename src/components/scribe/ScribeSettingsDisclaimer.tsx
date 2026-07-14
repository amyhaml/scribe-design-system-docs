import type { ReactNode } from "react";
import { Info } from "react-feather";

export interface ScribeSettingsDisclaimerProps {
  children: ReactNode;
}

/**
 * Port of `SettingsDisclaimer` from
 * `Scribe/src/pages/Content/Edit/headers/Settings/ProductSettings.tsx`.
 */
export function ScribeSettingsDisclaimer({ children }: ScribeSettingsDisclaimerProps) {
  return (
    <div className="scribe-settings-disclaimer">
      <Info aria-hidden />
      <span>{children}</span>
    </div>
  );
}
