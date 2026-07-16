import type { ReactNode } from "react";

import { StoryFrame } from "@/components/docs/StoryFrame";
import { Badge } from "@/components/ui/badge";
import { ScribeRadioInputPort } from "@/components/scribe";
import { getFigmaUrlForDocSlug } from "@/data/component-figma-links";

function RadioInputDemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="scribe-app-css-vars">
      <div className="scribe-radio-input-demo-frame">{children}</div>
    </div>
  );
}

function MatrixRadio({
  checked = false,
  disabled = false,
  id,
}: {
  checked?: boolean;
  disabled?: boolean;
  id: string;
}) {
  return (
    <ScribeRadioInputPort
      checked={checked}
      defaultValue={id}
      direction="left"
      id={id}
      isDisabled={disabled}
      label="Label"
      name={id}
    />
  );
}

export const radioInputDemos = {
  overview: (
    <StoryFrame
      storyId="radio-input--basic"
      height={260}
      figmaUrl={getFigmaUrlForDocSlug("radio-input")}
    />
  ),
  states: (
    <RadioInputDemoFrame>
      <div className="scribe-radio-input-matrix" aria-label="Radio button states">
        <span aria-hidden />
        <span className="scribe-radio-input-matrix-heading">Empty</span>
        <span className="scribe-radio-input-matrix-heading">Filled</span>

        <span className="scribe-radio-input-matrix-row-label">Default</span>
        <MatrixRadio id="radio-button-default-empty" />
        <MatrixRadio id="radio-button-default-filled" checked />

        <span className="scribe-radio-input-matrix-row-label">Disabled</span>
        <MatrixRadio id="radio-button-disabled-empty" disabled />
        <MatrixRadio id="radio-button-disabled-filled" checked disabled />
      </div>
    </RadioInputDemoFrame>
  ),
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/RadioInput/RadioInput.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/RadioInput/RadioInputButton.tsx
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Production radio input port with fixture states
      </Badge>
    </div>
  ),
};
