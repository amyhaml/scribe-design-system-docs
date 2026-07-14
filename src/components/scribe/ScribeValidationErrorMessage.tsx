import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { AlertOctagon } from "react-feather";

import { cn } from "@/lib/utils";

export interface ScribeValidationErrorMessageProps {
  align?: string;
  background?: string;
  className?: string;
  color?: string;
  error?: string;
  icon?: ReactElement | string;
  id?: string;
  showFor?: number;
  warning?: string;
}

/**
 * Port of `Scribe/src/components/shared/ValidationErrorMessage.tsx`.
 */
export function ScribeValidationErrorMessage({
  align = "left",
  background,
  className = "",
  color = "var(--text)",
  error,
  icon = <AlertOctagon size={18} />,
  id = "",
  showFor = 0,
  warning = "",
}: ScribeValidationErrorMessageProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (showFor) {
      setTimeout(() => {
        setShow(false);
      }, showFor);
    }
  });

  if (!show) return null;

  const message = error || warning;
  if (!message) return null;

  return (
    <small
      className={cn("scribe-validation-error", className)}
      style={{ background, color: warning ? "var(--text-light)" : color }}
      data-align={align}
      data-testid={`${id}-validation-error`}
      id={`${id}-validation-error`}
      role="alert"
    >
      <div
        className="scribe-validation-error__icon"
        data-testid="error-icon"
        data-warning={warning || undefined}
      >
        {icon}
      </div>
      {message}
    </small>
  );
}
