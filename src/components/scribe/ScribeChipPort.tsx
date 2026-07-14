import type { ReactNode } from "react";
import { Award, PlusSquare, X } from "react-feather";

export type ScribeChipPortValue = string | boolean;

export type ScribeChipPortData = {
  className?: string;
  isDisabled?: boolean;
  isPrimary?: boolean;
  label: string;
  showRemoveButton?: boolean;
  value?: ScribeChipPortValue;
};

export type ScribeChipPortProps = ScribeChipPortData & {
  onChipRemoved?: ((value: ScribeChipPortData) => void) | null;
};

export type ScribeChipListPortProps = {
  addButtonLabel?: string;
  className?: string;
  heading: string;
  onChipRemoved?: (value: ScribeChipPortData) => void;
  onPopoverOpen?: () => void;
  selectedChips?: ScribeChipPortData[];
};

function ScribeSvgButtonPort({
  "aria-label": ariaLabel,
  children,
  disabled = false,
  onClick,
}: {
  "aria-label": string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={ariaLabel}
      className="scribe-chip-port-svg-button"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

/**
 * Source-truth port of `Scribe/src/components/shared/Chip/Chip.tsx`
 * and `Scribe/packages/toolkit/src/components/Chips/Chip.tsx`.
 */
export function ScribeChipPort({
  className = "",
  isDisabled = false,
  isPrimary = false,
  label,
  onChipRemoved = null,
  showRemoveButton = true,
  value = "",
  ...rest
}: ScribeChipPortProps) {
  const handleChipRemoval = () => {
    onChipRemoved?.({ label, value, ...rest });
  };

  return (
    <span
      className={["scribe-chip-port-base", className].filter(Boolean).join(" ")}
      data-testid={`chip-${label}`}
    >
      <span className="scribe-chip-port-label-layout">
        {isPrimary ? <Award data-testid="award-icon" /> : null}
        <label className="scribe-chip-port-label" data-primary={isPrimary ? "true" : undefined}>
          {label}
        </label>
      </span>
      {showRemoveButton && !isDisabled ? (
        <ScribeSvgButtonPort aria-label={`remove ${label}`} onClick={handleChipRemoval}>
          <X size={16} />
        </ScribeSvgButtonPort>
      ) : null}
    </span>
  );
}

/**
 * Source-shaped visible port of `Scribe/src/components/shared/Chip/ChipList.tsx`
 * and `ChipListBase.tsx` for static docs fixtures.
 */
export function ScribeChipListPort({
  addButtonLabel = "",
  className,
  heading,
  onChipRemoved,
  onPopoverOpen,
  selectedChips = [],
}: ScribeChipListPortProps) {
  return (
    <div className={["scribe-chip-list-port-wrapper", className].filter(Boolean).join(" ")}>
      <fieldset>
        <legend className="scribe-chip-list-port-legend">
          {heading}
          <span>
            <ScribeSvgButtonPort aria-label={addButtonLabel} onClick={onPopoverOpen}>
              <PlusSquare size="1.25rem" />
            </ScribeSvgButtonPort>
          </span>
        </legend>
      </fieldset>
      <div>
        {selectedChips.map(({ label, value, ...chip }, index) => (
          <ScribeChipPort
            key={`${String(value)}-${index}`}
            label={label}
            onChipRemoved={onChipRemoved}
            value={value}
            {...chip}
          />
        ))}
      </div>
    </div>
  );
}
