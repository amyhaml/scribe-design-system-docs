import type { ChangeEvent, InputHTMLAttributes } from "react";

export type ScribeTogglePortProps = {
  className?: string;
  disabled?: boolean;
  id: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  isChecked?: boolean;
  labelOff?: string;
  labelOn?: string;
  name: string;
  onChange?: (toggle: { id: string; isChecked: boolean }) => void;
  size?: "medium" | "small";
};

/**
 * Source-truth visual port of `Scribe/packages/toolkit/src/components/Toggle/Toggle.tsx`.
 *
 * Docs-only difference: this mirrors the styled MUI Switch DOM instead of
 * importing Material UI. The interaction contract matches production Toggle.
 */
export function ScribeTogglePort({
  className = "scribe-toggle-port",
  disabled = false,
  id,
  inputProps,
  isChecked = false,
  labelOff = "OFF",
  labelOn = "ON",
  name,
  onChange,
  size = "medium",
}: ScribeTogglePortProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.({ id, isChecked: event.target.checked });
  };

  return (
    <span
      className={`${className} MuiSwitch-root${size === "small" ? " MuiSwitch-sizeSmall" : ""}`}
      data-checked={isChecked ? "true" : "false"}
      data-disabled={disabled ? "true" : undefined}
      data-size={size}
    >
      <span
        className={`MuiSwitch-switchBase${isChecked ? " Mui-checked" : ""}${
          disabled ? " Mui-disabled" : ""
        }`}
      >
        <input
          aria-label={inputProps?.["aria-label"] ?? id}
          checked={isChecked}
          className="MuiSwitch-input"
          disabled={disabled}
          id={id}
          name={name}
          onChange={handleChange}
          readOnly={!onChange}
          type="checkbox"
          {...inputProps}
        />
        <span className="MuiSwitch-thumb" />
      </span>
      <span className="MuiSwitch-track" data-label-off={labelOff} data-label-on={labelOn} />
    </span>
  );
}
