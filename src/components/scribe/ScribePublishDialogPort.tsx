import { ExternalLink, X } from "react-feather";

import { ScribeScheduleDateTimeFieldPort } from "./ScribeDateTimeCalendarPort";
import { ScribeTabbedLayoutPort, type ScribeTabItemPort } from "./ScribeTabbedLayoutPort";
import { ScribeTogglePort } from "./ScribeTogglePort";
import { ToolkitButton } from "./ToolkitButton";

export type ScribePublishingDialogVariant =
  | "publish-now"
  | "schedule-empty"
  | "schedule-filled"
  | "unpublish"
  | "archive"
  | "delete";

export interface ScribePublishDialogPortProps {
  variant: ScribePublishingDialogVariant;
}

const ACTION_BACKGROUND = {
  archive: "var(--primary)",
  delete: "var(--delete)",
  publish: "var(--publish)",
  schedule: "var(--schedule)",
  unpublish: "var(--primary)",
} as const;

function ScribePublishButtons({
  disabled = false,
  label,
}: {
  disabled?: boolean;
  label: string;
}) {
  const actionKey = label.toLowerCase() as keyof typeof ACTION_BACKGROUND;
  return (
    <div className="scribe-publish-dialog-port-buttons">
      <ToolkitButton background="transparent" border type="button">
        Cancel
      </ToolkitButton>
      <ToolkitButton background={ACTION_BACKGROUND[actionKey] ?? "var(--primary)"} disabled={disabled} type="button">
        {label}
      </ToolkitButton>
    </div>
  );
}

function ScribeFormInputPort({
  href,
  icon,
  label,
  value,
}: {
  href?: string;
  icon?: "external" | "clear";
  label: string;
  value?: string;
}) {
  return (
    <div className="scribe-publish-dialog-port-input-wrapper">
      <label className="scribe-publish-dialog-port-label">{label}</label>
      <div className="scribe-publish-dialog-port-input-row">
        <input
          className="scribe-publish-dialog-port-input"
          readOnly
          tabIndex={-1}
          value={value ?? ""}
          aria-label={label}
        />
        {icon === "external" ? (
          <a
            aria-label="Open current URL"
            className="scribe-publish-dialog-port-input-icon"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={16} />
          </a>
        ) : null}
        {icon === "clear" ? (
          <button aria-label={`Clear ${label}`} className="scribe-publish-dialog-port-input-icon" type="button">
            <X size={16} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function PublishNowPanel() {
  return (
    <div className="scribe-publish-dialog-port-tab-content">
      <p>This content will be saved and published immediately.</p>
      <ScribePublishButtons label="Publish" />
    </div>
  );
}

function SchedulePanel({ filled = false }: { filled?: boolean }) {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div className="scribe-publish-dialog-port-tab-content">
        <p>This content will be saved and published on the selected date.</p>
        <p>If setting an end date, include an optional redirect link to similar content to avoid 404 errors.</p>
        <div className="scribe-publish-dialog-port-pickers-wrapper">
          <ScribeScheduleDateTimeFieldPort
            label="Publish date"
            value={filled ? new Date("2024-08-29T13:00:00") : null}
          />
          <div className="scribe-publish-dialog-port-toggle-row">
            <label htmlFor={`dialog-end-date-${filled ? "filled" : "empty"}`}>Set an end date</label>
            <ScribeTogglePort
              id={`dialog-end-date-${filled ? "filled" : "empty"}`}
              isChecked={filled}
              name={`dialog-end-date-${filled ? "filled" : "empty"}`}
            />
          </div>
          {filled ? (
            <>
              <ScribeScheduleDateTimeFieldPort
                label="End date"
                value={new Date("2024-09-29T13:00:00")}
              />
            </>
          ) : null}
        </div>
        {filled ? <ScribeFormInputPort label="Redirect URL" /> : null}
        <ScribePublishButtons label="Schedule" disabled={!filled} />
      </div>
    </form>
  );
}

function RedirectPanel({ action }: { action: "archive" | "delete" | "unpublish" }) {
  const leadingMessage =
    action === "delete"
      ? "Deleting is permanent and will remove this content from your site."
      : action === "archive"
        ? "Archiving will remove this content from your site."
        : "Unpublishing will remove this content from your site.";

  return (
    <form className="scribe-publish-dialog-port-redirect-form">
      <div>
        <p>{leadingMessage}</p>
        {action !== "delete" ? (
          <p>Include an optional redirect link to similar content to avoid 404 errors.</p>
        ) : null}
      </div>
      {action !== "delete" ? (
        <fieldset className="scribe-publish-dialog-port-fieldset">
          <ScribeFormInputPort
            href="https://www.resin.com/my-article"
            icon="external"
            label="Current URL"
            value="www.resin.com/my-article"
          />
          <ScribeFormInputPort label="Redirect URL" />
        </fieldset>
      ) : (
        <fieldset className="scribe-publish-dialog-port-fieldset">
          <ScribeFormInputPort label="Redirect URL" />
        </fieldset>
      )}
      <ScribePublishButtons label={action === "unpublish" ? "Unpublish" : action === "archive" ? "Archive" : "Delete"} />
    </form>
  );
}

function PublishTabsPanel({ activeTab = 0, filled = false }: { activeTab?: number; filled?: boolean }) {
  const tabs: ScribeTabItemPort[] = [
    {
      content: <PublishNowPanel />,
      label: "Publish now",
      name: "publish-now",
    },
    {
      content: <SchedulePanel filled={filled} />,
      label: "Schedule",
      name: "schedule",
    },
  ];

  return (
    <ScribeTabbedLayoutPort
      activeTab={activeTab}
      isActiveTabEnabled
      tabs={tabs}
      uniqueId={`dialog-publish-tabs-${activeTab}-${filled ? "filled" : "empty"}`}
    />
  );
}

function ScheduleTabsPanel({ filled = false }: { filled?: boolean }) {
  const tabs: ScribeTabItemPort[] = [
    {
      content: <SchedulePanel filled={filled} />,
      label: "Schedule",
      name: "schedule",
    },
  ];

  return (
    <ScribeTabbedLayoutPort
      tabs={tabs}
      uniqueId={`dialog-schedule-tabs-${filled ? "filled" : "empty"}`}
    />
  );
}

/**
 * Source-truth visual port of the current publishing panel paths:
 * PublishPanel → PublishTabs / ScheduleTab / RedirectPanel.
 *
 * Docs-only difference: fixture data replaces auth, tenant, GraphQL, i18n and form providers.
 */
export function ScribePublishDialogPort({ variant }: ScribePublishDialogPortProps) {
  const content = (() => {
    switch (variant) {
      case "publish-now":
        return <PublishTabsPanel />;
      case "schedule-empty":
        return <ScheduleTabsPanel />;
      case "schedule-filled":
        return <ScheduleTabsPanel filled />;
      case "archive":
        return <RedirectPanel action="archive" />;
      case "delete":
        return <RedirectPanel action="delete" />;
      case "unpublish":
        return <RedirectPanel action="unpublish" />;
      default:
        return null;
    }
  })();

  return <div className="scribe-publish-dialog-port-wrapper">{content}</div>;
}
