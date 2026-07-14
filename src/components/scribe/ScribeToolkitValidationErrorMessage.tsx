import { AlertCircle } from "react-feather";

import { cn } from "@/lib/utils";

export interface ScribeToolkitValidationErrorMessageProps {
  error: string;
  id: string | null;
  className?: string;
}

/**
 * Port of `Scribe/packages/toolkit/src/components/ValidationErrorMessage/ValidationErrorMessage.tsx`
 * (static; omits `showFor` timer). Used under drawer form fields via `FormInput`.
 */
export function ScribeToolkitValidationErrorMessage({
  error,
  id = null,
  className,
}: ScribeToolkitValidationErrorMessageProps) {
  return (
    <small
      className={cn("scribe-toolkit-validation-error", className)}
      data-testid={`${id}-validation-error`}
      role="alert"
    >
      <div className="scribe-toolkit-validation-error__icon">
        <AlertCircle size={14} />
      </div>
      {error}
    </small>
  );
}
