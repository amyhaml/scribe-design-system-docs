import type { ElementType, InputHTMLAttributes, ReactNode, SVGAttributes } from "react";

export type ScribeCheckboxMark = "checked" | "dash";

export type ScribeCheckboxPortProps = {
  Checkmark?: ElementType;
  className?: string;
  id: string;
  isChecked: boolean;
  isDisabled?: boolean;
  label: string;
  mark?: ScribeCheckboxMark;
  name: string;
  onChange?: (id: string) => void;
  onLabelClick?: (id: string) => void;
};

function HiddenInputElement(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="scribe-checkbox-port-hidden-input" type="checkbox" {...props} />;
}

export function ScribeCheckmarkSvgPort({
  fill = "none",
  height = "8",
  viewBox = "0 0 10 8",
  width = "10",
  ...restProps
}: SVGAttributes<SVGElement>) {
  return (
    <svg
      className="scribe-checkbox-port-checkmark-svg"
      fill={fill}
      height={height}
      viewBox={viewBox}
      width={width}
      {...restProps}
    />
  );
}

export function ScribePathCheckedPort() {
  return <path d="M1.25 4.24994L2.5 5.5L3.75 6.75006L8.5 1" />;
}

export function ScribePathDashPort() {
  return <path d="M1.25 4.25L8.5 4.25" />;
}

export function ScribeStyledCheckboxPort({
  children,
  isChecked,
}: {
  children: ReactNode;
  isChecked: boolean;
}) {
  return (
    <div className="scribe-checkbox-port-box" data-checked={isChecked ? "true" : undefined}>
      {children}
    </div>
  );
}

/**
 * Source-truth port of `Scribe/src/components/shared/Checkbox.tsx`.
 *
 * Docs-only difference: callbacks are optional so static docs states can render
 * without form state management.
 */
export function ScribeCheckboxPort({
  Checkmark,
  className,
  id,
  isChecked,
  isDisabled,
  label,
  mark = "checked",
  name,
  onChange,
  onLabelClick,
}: ScribeCheckboxPortProps) {
  const MarkComponent = Checkmark ?? (mark === "dash" ? ScribePathDashPort : ScribePathCheckedPort);
  const handleChange = () => onChange?.(id);

  return (
    <label
      className={["scribe-checkbox-port-container", className].filter(Boolean).join(" ")}
      data-disabled={isDisabled ? "true" : undefined}
      htmlFor={id}
    >
      <HiddenInputElement
        checked={isChecked}
        data-testid={`input-checkbox-${id}`}
        disabled={isDisabled}
        id={id}
        name={name}
        onChange={handleChange}
        readOnly={!onChange}
      />
      <ScribeStyledCheckboxPort isChecked={isChecked}>
        <ScribeCheckmarkSvgPort>
          <MarkComponent />
        </ScribeCheckmarkSvgPort>
      </ScribeStyledCheckboxPort>
      <label
        className="scribe-checkbox-port-label"
        data-testid="input-label"
        onClick={() => !isDisabled && (onLabelClick || onChange)?.(id)}
      >
        {label}
      </label>
    </label>
  );
}
