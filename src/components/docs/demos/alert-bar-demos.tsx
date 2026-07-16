import { AlertTriangle, Lock } from "react-feather";

import {
  ScribeDraftStatusBar,
  ScribeNotificationBar,
  ScribePublishedStatusBar,
  ScribeScheduledStatusBar,
  ScribeSettingsDisclaimer,
  SCRIBE_SNACKBAR_STATUS,
  ScribeSnackbarPort,
  ScribeToolkitValidationErrorMessage,
  ScribeUseTargetDateChipApplied,
  ScribeValidationErrorMessage,
  ScribeValidationWarningMessage,
} from "@/components/scribe";
import {
  SCRIBE_TOOLBAR_STATUS,
  SCRIBE_VIDEO_TRANSCODING_FAILURE_NOTIFICATION,
} from "@/data/scribe-toolbar-status";

const SLUG_REQUIRED_ERROR = "Enter a short descriptive URL to improve SEO.";
const SLUG_OPTIMIZATION_WARNING =
  "The Slug field for this content has not been optimized";
const SETTINGS_APPLY_TO_EMBEDS =
  "These settings apply to all product embeds and slides.";
const LOCKED_MESSAGE = "This content is locked by Jane Smith";
const TRANSCODING_ERROR_MESSAGE =
  "This video failed to transcode. Please try uploading again or contact support.";
const LIST_INFO_MESSAGE = "Showing published content only";
const SCHEDULED_BANNER_TEXT = "This content will be published on Mar 24, 2026 at 9:00 AM";
const PUBLISHED_BANNER_TEXT = "Last published on Mar 20, 2026 at 2:30 PM";

export const alertBarDemos = {
  "inline-alerts": (
    <div className="scribe-app-css-vars space-y-4 rounded-xl border bg-card p-4">
      <div className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-start">
        <span className="pt-0.5 text-xs font-medium text-muted-foreground">Error</span>
        <ScribeToolkitValidationErrorMessage id="slug" error={SLUG_REQUIRED_ERROR} />
      </div>
      <div className="grid gap-2 border-t pt-4 sm:grid-cols-[8rem_1fr] sm:items-start">
        <span className="pt-0.5 text-xs font-medium text-muted-foreground">Warning</span>
        <ScribeValidationWarningMessage errorMessage={SLUG_OPTIMIZATION_WARNING} />
      </div>
      <div className="grid gap-2 border-t pt-4 sm:grid-cols-[8rem_1fr] sm:items-start">
        <span className="pt-0.5 text-xs font-medium text-muted-foreground">Info</span>
        <ScribeSettingsDisclaimer>{SETTINGS_APPLY_TO_EMBEDS}</ScribeSettingsDisclaimer>
      </div>
      <div className="grid gap-2 border-t pt-4 sm:grid-cols-[8rem_1fr] sm:items-start">
        <span className="pt-0.5 text-xs font-medium text-muted-foreground">Success</span>
        <ScribeUseTargetDateChipApplied />
      </div>
    </div>
  ),
  alignment: (
    <div className="scribe-app-css-vars space-y-4 rounded-xl border bg-card p-4">
      <div className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-start">
        <span className="pt-0.5 text-xs font-medium text-muted-foreground">Left</span>
        <ScribeToolkitValidationErrorMessage id="slug" error={SLUG_REQUIRED_ERROR} />
      </div>
      <div className="grid gap-2 border-t pt-4 sm:grid-cols-[8rem_1fr] sm:items-start">
        <span className="pt-0.5 text-xs font-medium text-muted-foreground">Center</span>
        <ScribeValidationErrorMessage
          align="center"
          background="var(--background-error)"
          className="scribe-validation-error--gallery"
          color="var(--text-dark)"
          error="Add a caption."
          icon={<AlertTriangle size={20} color="var(--error)" />}
          id="gallery-alignment"
        />
      </div>
    </div>
  ),
  banner: [
    <div key="banner-status" className="scribe-app-css-vars overflow-hidden rounded-xl border">
      <div className="grid gap-2 border-b bg-card p-3 sm:grid-cols-[6rem_1fr] sm:items-center">
        <span className="text-xs font-medium text-muted-foreground">Draft</span>
        <ScribeDraftStatusBar statusText="DRAFT" />
      </div>
      <div className="grid gap-2 border-b bg-card p-3 sm:grid-cols-[6rem_1fr] sm:items-center">
        <span className="text-xs font-medium text-muted-foreground">Scheduled</span>
        <ScribeScheduledStatusBar
          statusText="SCHEDULED"
          bannerText={SCHEDULED_BANNER_TEXT}
          onReschedule={() => undefined}
        />
      </div>
      <div className="grid gap-2 bg-card p-3 sm:grid-cols-[6rem_1fr] sm:items-center">
        <span className="text-xs font-medium text-muted-foreground">Live</span>
        <ScribePublishedStatusBar statusText="LIVE" bannerText={PUBLISHED_BANNER_TEXT} />
      </div>
    </div>,
    <div key="banner-notification" className="scribe-app-css-vars overflow-hidden rounded-xl border">
      <div className="grid gap-2 border-b bg-card p-3 sm:grid-cols-[6rem_1fr] sm:items-center">
        <span className="text-xs font-medium text-muted-foreground">Locked</span>
        <ScribeNotificationBar
          styled
          message={LOCKED_MESSAGE}
          status={SCRIBE_TOOLBAR_STATUS.locked}
          Icon={Lock}
        />
      </div>
      <div className="grid gap-2 border-b bg-card p-3 sm:grid-cols-[6rem_1fr] sm:items-center">
        <span className="text-xs font-medium text-muted-foreground">Error</span>
        <ScribeNotificationBar
          styled
          message={TRANSCODING_ERROR_MESSAGE}
          status={SCRIBE_VIDEO_TRANSCODING_FAILURE_NOTIFICATION}
        />
      </div>
      <div className="grid gap-2 bg-card p-3 sm:grid-cols-[6rem_1fr] sm:items-center">
        <span className="text-xs font-medium text-muted-foreground">List info</span>
        <ScribeNotificationBar
          styled
          message={LIST_INFO_MESSAGE}
          status={SCRIBE_TOOLBAR_STATUS.scheduled}
        />
      </div>
    </div>,
  ],
  related: (
    <div className="scribe-app-css-vars flex justify-center rounded-xl border bg-card p-6">
      <ScribeSnackbarPort message="Content page saved" status={SCRIBE_SNACKBAR_STATUS.success} />
    </div>
  ),
};
