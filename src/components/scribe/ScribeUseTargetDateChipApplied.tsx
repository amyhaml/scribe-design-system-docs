import { CheckCircle } from "react-feather";

/**
 * Static port of the applied state from
 * `Scribe/src/components/Content/Edit/DesignPreview/UseTargetDateChip.tsx` (lines 169–175).
 */
export function ScribeUseTargetDateChipApplied() {
  return (
    <div
      className="scribe-target-date-applied"
      data-testid="use-target-date-chip-applied"
      aria-live="polite"
    >
      <span className="scribe-target-date-applied__icon" aria-hidden>
        <CheckCircle size={14} strokeWidth={2.25} />
      </span>
      <span className="scribe-target-date-applied__text">Applied</span>
    </div>
  );
}
