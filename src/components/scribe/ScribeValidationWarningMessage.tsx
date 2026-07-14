import { AlertTriangle } from "react-feather";

import { ScribeValidationErrorMessage } from "./ScribeValidationErrorMessage";

export interface ScribeValidationWarningMessageProps {
  errorMessage?: string;
}

/**
 * Port of `Scribe/src/components/shared/ValidationWarningMessage.tsx`.
 */
export function ScribeValidationWarningMessage({
  errorMessage,
}: ScribeValidationWarningMessageProps) {
  return (
    <ScribeValidationErrorMessage
      background="var(--background-warning-icon)"
      className="warning"
      color="var(--text)"
      id="slug"
      error={errorMessage}
      icon={<AlertTriangle size={18} color="var(--warning-icon)" />}
    />
  );
}
