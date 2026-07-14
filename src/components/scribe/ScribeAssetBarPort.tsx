import type { ReactNode } from "react";
import { ArrowLeft } from "react-feather";

import { ScribeTogglePort } from "./ScribeTogglePort";
import { ToolkitButton } from "./ToolkitButton";

export type ScribeAssetBarPortProps = {
  backButton?: ReactNode;
  backLabel?: string;
  buttons?: ReactNode;
  onBackClick?: () => void;
  title?: ReactNode;
};

export type ScribeAssetBarTogglePortProps = {
  disabled?: boolean;
  id: string;
  isChecked?: boolean;
  labelOff?: string;
  labelOn?: string;
  name: string;
  size?: "medium" | "small";
};

export function ScribeAssetBarTogglePort({
  disabled = false,
  id,
  isChecked = false,
  labelOff = "OFF",
  labelOn = "ON",
  name,
  size = "medium",
}: ScribeAssetBarTogglePortProps) {
  return (
    <ScribeTogglePort
      className="scribe-asset-bar-port-toggle"
      disabled={disabled}
      id={id}
      isChecked={isChecked}
      labelOff={labelOff}
      labelOn={labelOn}
      name={name}
      size={size}
    />
  );
}

export function ScribeAssetBarSelectionActions({
  addDisabled = true,
  addLabel = "Add selected",
  count = 0,
  isChecked = false,
  selectionLabel = "Selection",
}: {
  addDisabled?: boolean;
  addLabel?: string;
  count?: number;
  isChecked?: boolean;
  selectionLabel?: string;
}) {
  return (
    <div className="scribe-asset-bar-port-buttons-wrapper">
      <div className="scribe-asset-bar-port-toggle-wrapper">
        <label className="scribe-asset-bar-port-toggle-label" htmlFor="asset-bar-selection">
          {selectionLabel} ({count})
        </label>
        <ScribeAssetBarTogglePort id="asset-bar-selection" isChecked={isChecked} name="asset-bar-selection" />
      </div>
      <ToolkitButton type="button" disabled={addDisabled} background="var(--primary)">
        {addLabel}
      </ToolkitButton>
    </div>
  );
}

/**
 * Source-truth port of `Scribe/src/components/shared/FullscreenTakeover.tsx`.
 *
 * Docs-only difference: this renders the toolbar bar only, not the fixed fullscreen
 * wrapper/body. Button-slot fixture content is passed from demos.
 */
export function ScribeAssetBarPort({
  backButton,
  backLabel = "Back",
  buttons,
  onBackClick,
  title = "",
}: ScribeAssetBarPortProps) {
  const defaultBackButton = (
    <>
      <ArrowLeft aria-hidden />
      {backLabel}
    </>
  );

  return (
    <div className="scribe-asset-bar-port-wrapper" data-testid="asset-bar">
      <div className="scribe-asset-bar-port-toolbar-wrapper">
        <div className="scribe-asset-bar-port-toolbar">
          <div>
            <ToolkitButton
              className="scribe-asset-bar-port-back-button"
              type="button"
              background="transparent"
              border
              color="var(--text)"
              onClick={onBackClick}
            >
              {backButton || defaultBackButton}
            </ToolkitButton>
          </div>
          {title ? <h2 className="takeover-title">{title}</h2> : null}
          {buttons ? <div>{buttons}</div> : null}
        </div>
      </div>
    </div>
  );
}
