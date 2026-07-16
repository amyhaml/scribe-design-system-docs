import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  SCRIBE_SNACKBAR_STATUS,
  ScribeDraftStatusBar,
  ScribePublishedStatusBar,
  ScribeSnackbarPort,
  ScribeToolkitValidationErrorMessage,
  ScribeUseTargetDateChipApplied,
  ScribeValidationWarningMessage,
} from "@/components/scribe";

function SnackbarDemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="scribe-app-css-vars">
      <div className="scribe-snackbar-demo-frame">{children}</div>
    </div>
  );
}

export const snackbarDemos = {
  statuses: (
    <SnackbarDemoFrame>
      <div className="scribe-snackbar-status-matrix" aria-label="Snackbar statuses">
        <span className="scribe-snackbar-status-label">Success</span>
        <ScribeSnackbarPort message="Snackbar text" status={SCRIBE_SNACKBAR_STATUS.success} />

        <span className="scribe-snackbar-status-label">Error</span>
        <ScribeSnackbarPort message="Snackbar text" status={SCRIBE_SNACKBAR_STATUS.error} />
      </div>
    </SnackbarDemoFrame>
  ),
  "related-components": (
    <div className="scribe-app-css-vars scribe-snackbar-related-frame">
      <div className="scribe-snackbar-related-alerts" aria-label="Alert examples">
        <ScribeToolkitValidationErrorMessage id="snackbar-related-error" error="Alert text" />
        <ScribeUseTargetDateChipApplied />
        <ScribeValidationWarningMessage errorMessage="Alert text" />
      </div>
      <div className="scribe-snackbar-related-banners" aria-label="Banner examples">
        <ScribeDraftStatusBar statusText="Banner text" />
        <ScribePublishedStatusBar statusText="Banner text" />
      </div>
    </div>
  ),
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/snackbar/src/components/SnackbarWithProps.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/snackbar/src/components/shared.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/snackbar/src/stores/snackbarStore.ts
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Production snackbar port with static fixture states
      </Badge>
    </div>
  ),
};
