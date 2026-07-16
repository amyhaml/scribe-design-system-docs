import type { ReactElement, ReactNode } from "react";
import { SnackbarContent } from "@mui/material";
import { AlertTriangle, Check } from "react-feather";

export const SCRIBE_SNACKBAR_STATUS = {
  default: "default",
  error: "error",
  loading: "loading",
  success: "success",
  warning: "warning",
} as const;

export type ScribeSnackbarStatus =
  (typeof SCRIBE_SNACKBAR_STATUS)[keyof typeof SCRIBE_SNACKBAR_STATUS];

export interface ScribeSnackbarPortProps {
  icon?: ReactElement;
  message: ReactNode;
  open?: boolean;
  status?: ScribeSnackbarStatus;
}

function getSnackbarIcon(status: ScribeSnackbarStatus): ReactElement | null {
  switch (status) {
    case SCRIBE_SNACKBAR_STATUS.error:
      return <AlertTriangle size={22} strokeWidth={1.5} />;
    case SCRIBE_SNACKBAR_STATUS.success:
      return <Check size={22} strokeWidth={1.5} />;
    case SCRIBE_SNACKBAR_STATUS.default:
    case SCRIBE_SNACKBAR_STATUS.loading:
    case SCRIBE_SNACKBAR_STATUS.warning:
    default:
      return null;
  }
}

/**
 * Source-truth visual port of `@media-platforms/snackbar` `SnackbarWithProps`.
 * Docs-only difference: the fixed MUI Snackbar viewport wrapper is omitted so examples can be
 * placed statically in documentation sections.
 */
export function ScribeSnackbarPort({
  icon,
  message,
  open = true,
  status = SCRIBE_SNACKBAR_STATUS.default,
}: ScribeSnackbarPortProps) {
  if (!open) return null;

  const statusIcon = icon ?? getSnackbarIcon(status);

  return (
    <SnackbarContent
      className="scribe-snackbar-port"
      data-status={status}
      data-testid={status}
      role="alert"
      message={
        <div className="scribe-snackbar-port-message-container">
          {statusIcon ? (
            <div className="scribe-snackbar-port-icon-wrapper" data-status={status}>
              {statusIcon}
            </div>
          ) : null}
          <span>{message}</span>
        </div>
      }
    />
  );
}
