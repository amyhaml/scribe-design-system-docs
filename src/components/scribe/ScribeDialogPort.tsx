import type { ReactNode } from "react";

import { ToolkitButton } from "./ToolkitButton";

export type ScribeDialogButtonPort = {
  background?: string;
  disabled?: boolean;
  label: string;
  onClick?: () => void;
};

export interface ScribeDialogPortProps {
  buttons: ScribeDialogButtonPort[];
  children?: ReactNode;
  compactMode?: boolean;
  reduceTitleAndTextIndents?: boolean;
  title?: ReactNode;
  titleAlignCenter?: boolean;
  width?: string;
}

/**
 * Source-truth visual port of:
 * - Scribe/packages/toolkit/src/components/Dialog/Dialog.tsx
 * - Scribe/apps/scribe/src/modals/LegacyModal.tsx
 *
 * Docs-only difference: this renders inline instead of using ReactDOM.createPortal
 * so examples can sit inside the documentation page without covering the app.
 */
export function ScribeDialogPort({
  buttons,
  children,
  compactMode = false,
  reduceTitleAndTextIndents = false,
  title = "",
  titleAlignCenter = true,
  width,
}: ScribeDialogPortProps) {
  return (
    <div
      className="scribe-dialog-port-modal-wrapper"
      data-compact={compactMode ? "true" : "false"}
      style={{ width: compactMode ? undefined : width }}
    >
      <div className="scribe-dialog-port-modal-content">
        {title ? (
          <div
            className="scribe-dialog-port-modal-header"
            data-reduced={reduceTitleAndTextIndents ? "true" : "false"}
          >
            <h2
              className="scribe-dialog-port-modal-title"
              data-align-center={titleAlignCenter ? "true" : "false"}
            >
              {title}
            </h2>
          </div>
        ) : null}
        <div
          className="scribe-dialog-port-modal-body"
          data-compact={compactMode ? "true" : "false"}
          data-reduced={reduceTitleAndTextIndents ? "true" : "false"}
        >
          {children ? (
            <div className="scribe-dialog-port-content" data-compact={compactMode ? "true" : "false"}>
              {children}
            </div>
          ) : null}
          <div className="scribe-dialog-port-buttons" data-compact={compactMode ? "true" : "false"}>
            {buttons.map((button, index) => (
              <ToolkitButton
                key={`${button.label}-${index}`}
                autoFocus={index === 0}
                background={button.background}
                border={button.background === "transparent"}
                disabled={button.disabled}
                onClick={button.onClick}
                type="button"
              >
                {button.label}
              </ToolkitButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
