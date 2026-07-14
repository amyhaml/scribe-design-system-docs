import { format } from "date-fns";
import { Calendar } from "react-feather";

import { ScribeChipPort, type ScribeChipPortData } from "./ScribeChipPort";
import { ScribeToolkitValidationErrorMessage } from "./ScribeToolkitValidationErrorMessage";

export type ScribeDatePickerPortValue = string | number | Date;

export interface ScribeDatePickerPortProps {
  calendarInputProps?: {
    format?: string;
    label?: string;
    placeholder?: string;
  };
  className?: string;
  date?: ScribeDatePickerPortValue | null;
  errorMessage?: string;
  formattedDate?: string | null;
  hasTimeSelector?: boolean;
  isDisabled?: boolean;
  label: string;
  maxDate?: ScribeDatePickerPortValue | null;
  minDate?: ScribeDatePickerPortValue | null;
  name?: string | null;
  onChange?: (date: Date | null) => void;
  onPopoverOpen?: () => void;
  showRemoveButton?: boolean;
  timeInterval?: number;
}

export const SCRIBE_DATE_PICKER_US_DATE_FORMAT = "MM/dd/yyyy";

function parseDate(date: ScribeDatePickerPortValue | null | undefined) {
  return date ? new Date(date) : null;
}

function getValidFormattedDate(
  formattedDate: string | null | undefined,
  date: ScribeDatePickerPortValue | null | undefined,
) {
  if (formattedDate) return formattedDate;

  const parsedDate = parseDate(date);
  if (parsedDate) return format(parsedDate, SCRIBE_DATE_PICKER_US_DATE_FORMAT);

  return "";
}

function ScribeDatePickerIconButtonPort({
  disabled,
  label,
  onClick,
}: {
  disabled?: boolean;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="scribe-date-picker-port-icon-button"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Calendar size={16} />
    </button>
  );
}

/**
 * Closed-state port of `Scribe/packages/toolkit/src/components/DatePicker/DatePicker.tsx`.
 * CalendarPopover is intentionally not mounted here because its MUI/Emotion dependency chain is
 * not part of this docs pass.
 */
export function ScribeDatePickerPort({
  className = "",
  date,
  errorMessage = "",
  formattedDate = "",
  isDisabled = false,
  label,
  name = null,
  onChange = () => {},
  onPopoverOpen,
  showRemoveButton = true,
}: ScribeDatePickerPortProps) {
  const validFormattedDate = getValidFormattedDate(formattedDate, date);
  const chipData: ScribeChipPortData = {
    isDisabled,
    label: validFormattedDate,
    showRemoveButton,
    value: validFormattedDate,
  };

  return (
    <div
      className={["scribe-date-picker-port-wrapper", className].filter(Boolean).join(" ")}
      data-testid={name ?? undefined}
    >
      <fieldset>
        <legend className="scribe-date-picker-port-legend">
          {label}
          <ScribeDatePickerIconButtonPort
            label={`Open calendar for ${label}`}
            disabled={isDisabled}
            onClick={onPopoverOpen}
          />
        </legend>
      </fieldset>
      {validFormattedDate ? (
        <ScribeChipPort
          {...chipData}
          onChipRemoved={() => onChange(null)}
        />
      ) : null}
      {errorMessage ? <ScribeToolkitValidationErrorMessage id={name} error={errorMessage} /> : null}
    </div>
  );
}
