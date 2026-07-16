import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { ScribeCheckboxPort, ScribeTogglePort } from "@/components/scribe";

function SwitchDemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="scribe-app-css-vars">
      <div className="scribe-switch-demo-frame">{children}</div>
    </div>
  );
}

function StaticSwitch({
  disabled = false,
  id,
  isChecked = false,
  size = "medium",
}: {
  disabled?: boolean;
  id: string;
  isChecked?: boolean;
  size?: "medium" | "small";
}) {
  return (
    <ScribeTogglePort
      disabled={disabled}
      id={id}
      inputProps={{ "aria-label": id }}
      isChecked={isChecked}
      name={id}
      size={size}
    />
  );
}

export const switchDemos = {
  states: (
    <SwitchDemoFrame>
      <div className="scribe-switch-state-matrix" aria-label="Switch states">
        <span aria-hidden />
        <span className="scribe-switch-matrix-heading">Off</span>
        <span className="scribe-switch-matrix-heading">On</span>

        <span className="scribe-switch-row-label">Default</span>
        <StaticSwitch id="switch-default-off" />
        <StaticSwitch id="switch-default-on" isChecked />

        <span className="scribe-switch-row-label">Disabled</span>
        <StaticSwitch id="switch-disabled-off" disabled />
        <StaticSwitch id="switch-disabled-on" disabled isChecked />
      </div>
    </SwitchDemoFrame>
  ),
  sizes: (
    <SwitchDemoFrame>
      <div className="scribe-switch-size-list" aria-label="Switch sizes">
        <div className="scribe-switch-size-row">
          <span className="scribe-switch-row-label">Medium</span>
          <StaticSwitch id="switch-size-medium" isChecked />
        </div>
        <div className="scribe-switch-size-row">
          <span className="scribe-switch-row-label">Small</span>
          <StaticSwitch id="switch-size-small" isChecked size="small" />
        </div>
      </div>
    </SwitchDemoFrame>
  ),
  "related-components": (
    <SwitchDemoFrame>
      <div className="scribe-switch-related-preview" aria-label="Checkbox examples">
        <ScribeCheckboxPort id="switch-related-empty-checkbox" label="Label" name="switch-related-empty-checkbox" />
        <ScribeCheckboxPort
          id="switch-related-filled-checkbox"
          isChecked
          label="Label"
          name="switch-related-filled-checkbox"
        />
      </div>
    </SwitchDemoFrame>
  ),
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/Toggle/Toggle.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/Toggle/Toggle.stories.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/ListFilters/FilterToggle.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/Syndication/helpers.tsx
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Production Toggle port with switch docs states
      </Badge>
    </div>
  ),
};
