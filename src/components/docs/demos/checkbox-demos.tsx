import { useState, type ReactNode } from "react";

import { StoryFrame } from "@/components/docs/StoryFrame";
import { Badge } from "@/components/ui/badge";
import { ScribeCheckboxPort, ScribeTogglePort } from "@/components/scribe";
import { getFigmaUrlForDocSlug } from "@/data/component-figma-links";

function CheckboxDemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="scribe-app-css-vars">
      <div className="scribe-checkbox-demo-frame">{children}</div>
    </div>
  );
}

function MatrixCheckbox({
  disabled = false,
  id,
  mark = "checked",
  checked = false,
}: {
  checked?: boolean;
  disabled?: boolean;
  id: string;
  mark?: "checked" | "dash";
}) {
  return (
    <ScribeCheckboxPort
      id={id}
      isChecked={checked}
      isDisabled={disabled}
      label="Label"
      mark={mark}
      name={id}
    />
  );
}

function RelatedSwitchPreview() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="scribe-checkbox-switch-preview">
      <span className="scribe-checkbox-switch-preview-label">Switch text</span>
      <ScribeTogglePort
        id="checkbox-related-switch"
        inputProps={{ "aria-label": "Switch text" }}
        isChecked={isChecked}
        name="checkbox-related-switch"
        onChange={({ isChecked: nextIsChecked }) => setIsChecked(nextIsChecked)}
      />
    </div>
  );
}

export const checkboxDemos = {
  overview: (
    <StoryFrame
      storyId="checkbox--checkbox"
      height={220}
      figmaUrl={getFigmaUrlForDocSlug("checkbox")}
    />
  ),
  states: (
    <CheckboxDemoFrame>
      <div className="scribe-checkbox-matrix" aria-label="Checkbox states">
        <span aria-hidden />
        <span className="scribe-checkbox-matrix-heading">Empty</span>
        <span className="scribe-checkbox-matrix-heading">Filled</span>
        <span className="scribe-checkbox-matrix-heading">Indeterminate</span>

        <span className="scribe-checkbox-matrix-row-label">Default</span>
        <MatrixCheckbox id="checkbox-default-empty" />
        <MatrixCheckbox id="checkbox-default-filled" checked />
        <MatrixCheckbox id="checkbox-default-indeterminate" checked mark="dash" />

        <span className="scribe-checkbox-matrix-row-label">Disabled</span>
        <MatrixCheckbox id="checkbox-disabled-empty" disabled />
        <MatrixCheckbox id="checkbox-disabled-filled" checked disabled />
        <MatrixCheckbox id="checkbox-disabled-indeterminate" checked mark="dash" disabled />
      </div>
    </CheckboxDemoFrame>
  ),
  related: (
    <CheckboxDemoFrame>
      <div className="scribe-checkbox-demo-related">
        <RelatedSwitchPreview />
      </div>
    </CheckboxDemoFrame>
  ),
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/Checkbox.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/Label.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/Toggle/Toggle.tsx
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Production checkbox and toggle ports with fixture states
      </Badge>
    </div>
  ),
};
