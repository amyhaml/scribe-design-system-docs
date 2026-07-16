import type { ChangeEventHandler, ReactNode } from "react";

export type ScribeRadioDirection = "top" | "bottom" | "left" | "right";

export type ScribeRadioInputPortProps = {
  checked?: boolean;
  children?: ReactNode;
  className?: string;
  defaultValue: string;
  direction?: ScribeRadioDirection;
  id: string;
  isDisabled?: boolean;
  label: string;
  name: string;
  onClick?: () => void;
};

export type ScribeControlledRadioInputPortProps = {
  checked?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  id: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: string;
};

export function ScribeControlledRadioInputPort({
  checked,
  disabled,
  hidden = false,
  id,
  name,
  onChange,
  value,
}: ScribeControlledRadioInputPortProps) {
  return (
    <input
      checked={checked}
      disabled={disabled}
      hidden={hidden}
      id={id}
      name={name}
      onChange={onChange}
      type="radio"
      value={value}
    />
  );
}

/**
 * Source-truth port of `Scribe/src/components/shared/RadioInput/RadioInput.tsx`.
 *
 * Docs-only difference: the demo uses the controlled input path so static
 * checked/empty states can be rendered without form registration.
 */
export function ScribeRadioInputPort({
  checked,
  children = null,
  className,
  defaultValue,
  direction = "left",
  id,
  isDisabled = false,
  label,
  name,
  onClick,
}: ScribeRadioInputPortProps) {
  const handleChange = () => {
    if (!isDisabled) onClick?.();
  };

  return (
    <div
      className={["scribe-radio-input-port-wrapper", className].filter(Boolean).join(" ")}
      data-direction={direction}
      data-disabled={isDisabled ? "true" : undefined}
    >
      <label
        className="scribe-radio-input-port-label"
        data-direction={direction}
        htmlFor={id}
      >
        {label}
        {children}
        <ScribeControlledRadioInputPort
          checked={checked}
          disabled={isDisabled}
          id={id}
          name={name}
          onChange={handleChange}
          value={defaultValue}
        />
      </label>
    </div>
  );
}
