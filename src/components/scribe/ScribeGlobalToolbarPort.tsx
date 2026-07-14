import type { ReactNode } from "react";
import { ChevronDown, ExternalLink, MoreVertical } from "react-feather";

import { ToolkitButton } from "./ToolkitButton";

export type ScribeToolbarButtonPort = {
  id: string;
  label: string;
  background?: string;
  border?: string;
  color?: string;
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  shareLink?: boolean;
  splitSegment?: "start" | "end";
  type?: "button" | "submit" | "reset";
};

export type ScribeGlobalToolbarPortProps = {
  children?: ReactNode;
  className?: string;
  dateComponent?: ReactNode;
  displayedMetadata?: ReactNode[];
  externalLink?: string;
  menuButtons?: ScribeToolbarButtonPort[];
  moreOptionsButtons?: ScribeToolbarButtonPort[];
  previewUrl?: string;
  title?: string;
  titlePrefix?: ReactNode;
};

function ScribeGlobalToolbarTitlePort({
  dateComponent,
  displayedMetadata,
  externalLink,
  title = "",
  titlePrefix,
}: Pick<
  ScribeGlobalToolbarPortProps,
  "dateComponent" | "displayedMetadata" | "externalLink" | "title" | "titlePrefix"
>) {
  const displayTitle = title || "Untitled";
  const filteredMetadata = displayedMetadata?.filter(Boolean);

  return (
    <div className="scribe-global-toolbar-port-title-content">
      {displayTitle.length > 0 ? (
        <div className="scribe-global-toolbar-port-title-wrapper">
          {titlePrefix ? (
            <span className="scribe-global-toolbar-port-title-prefix">{titlePrefix}</span>
          ) : null}
          {externalLink ? (
            <a
              className="scribe-global-toolbar-port-title-link"
              data-testid="external-title-link"
              href={externalLink}
              rel="noreferrer"
              target="_blank"
            >
              <h1 className="scribe-global-toolbar-port-title-heading">{displayTitle}</h1>
            </a>
          ) : (
            <h1 className="scribe-global-toolbar-port-title-heading">{displayTitle}</h1>
          )}
          {externalLink ? (
            <a
              className="scribe-global-toolbar-port-title-button"
              data-testid="external-button"
              href={externalLink}
              target="_blank"
              rel="noreferrer"
              aria-label="External link"
            >
              <ExternalLink size="1rem" strokeWidth="1" aria-hidden />
            </a>
          ) : null}
        </div>
      ) : null}
      {dateComponent ? (
        <p className="scribe-global-toolbar-port-date" data-testid="notification" id="published-date">
          {dateComponent}
        </p>
      ) : null}
      {filteredMetadata?.length
        ? filteredMetadata.map((data, i) => (
            <span className="scribe-global-toolbar-port-meta" key={typeof data === "string" ? data : i}>
              {data}
            </span>
          ))
        : null}
    </div>
  );
}

function ScribeToolbarButtonPortComponent({
  button,
  buttonLength,
  previewUrl,
}: {
  button: ScribeToolbarButtonPort;
  buttonLength: number;
  previewUrl?: string;
}) {
  const splitButton = Boolean(button.shareLink && previewUrl);

  return (
    <>
      <ToolkitButton
        className="scribe-global-toolbar-port-button"
        type={button.type ?? "button"}
        background={button.background || "transparent"}
        border={button.border}
        color={button.color || "var(--primary-contrast-text)"}
        cursor={button.onClick ? undefined : "default"}
        disabled={button.disabled}
        onClick={button.onClick}
        splitSegment={splitButton ? "start" : button.splitSegment}
        style={{ marginRight: buttonLength > 1 && !splitButton && !button.splitSegment ? "var(--spacing-m)" : "0" }}
      >
        {button.icon}
        <span>{button.label}</span>
      </ToolkitButton>
      {splitButton ? <ScribeShareLinkButtonPort backgroundColor={button.background || "transparent"} /> : null}
    </>
  );
}

function ScribeShareLinkButtonPort({ backgroundColor }: { backgroundColor?: string }) {
  return (
    <ToolkitButton
      className="scribe-global-toolbar-port-share-link-button"
      type="button"
      aria-label="Preview options"
      data-testid="preview-options"
      background={backgroundColor || "var(--info)"}
      splitSegment="end"
    >
      <ChevronDown strokeWidth="3" aria-hidden />
    </ToolkitButton>
  );
}

/**
 * Source-truth port of:
 * - Scribe/apps/scribe/src/components/GlobalToolbar/index.tsx
 * - Scribe/apps/scribe/src/components/GlobalToolbar/index.styles.ts
 * - Scribe/apps/scribe/src/components/GlobalToolbar/Title/index.tsx
 * - Scribe/apps/scribe/src/components/GlobalToolbar/MenuButtons/index.tsx
 * - Scribe/apps/scribe/src/components/GlobalToolbar/ToolbarButton.tsx
 * - Scribe/src/components/shared/ShareLinkButton.tsx
 *
 * Docs-only differences: permission wrappers, popovers, tooltip runtime, and router/store data
 * are omitted; button configs are passed as fixtures. ShareLinkButton popover behavior is
 * intentionally omitted here, but its closed-state chevron button source styling is ported.
 */
export function ScribeGlobalToolbarPort({
  children,
  className = "",
  dateComponent,
  displayedMetadata,
  externalLink = "",
  menuButtons = [],
  moreOptionsButtons = [],
  previewUrl = "",
  title,
  titlePrefix,
}: ScribeGlobalToolbarPortProps) {
  return (
    <>
      <div className={`scribe-global-toolbar-port ${className}`} data-testid="toolbar">
        <div className="scribe-global-toolbar-port-title-container">
          <ScribeGlobalToolbarTitlePort
            dateComponent={dateComponent}
            displayedMetadata={displayedMetadata}
            externalLink={externalLink}
            title={title}
            titlePrefix={titlePrefix}
          />
          <div className="scribe-global-toolbar-port-button-wrapper">
            {menuButtons.map((button) => (
              <ScribeToolbarButtonPortComponent
                button={button}
                buttonLength={menuButtons.length}
                previewUrl={previewUrl}
                key={button.id}
              />
            ))}
            {moreOptionsButtons.length > 0 ? (
              <button
                className="scribe-global-toolbar-port-more-options"
                type="button"
                aria-label="More options"
              >
                <MoreVertical size={22} aria-hidden />
              </button>
            ) : null}
            {children}
          </div>
        </div>
      </div>
      <div id="content-start" />
    </>
  );
}
