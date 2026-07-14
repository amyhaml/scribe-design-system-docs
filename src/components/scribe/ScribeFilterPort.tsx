import type { ReactNode } from "react";
import { ChevronDown, ChevronUp, X } from "react-feather";

import { ScribeChipListPort, ScribeChipPort, type ScribeChipPortData } from "./ScribeChipPort";
import { ScribeDatePickerPort } from "./ScribeDatePickerPort";
import { ScribeSearchFieldPort, ScribeSelectFieldPort, type ScribeSelectFieldOption } from "./ScribeFieldPort";
import { ScribeTogglePort } from "./ScribeTogglePort";
import { ToolkitButton } from "./ToolkitButton";

/**
 * Source-truth ports for Scribe list filters.
 * Source files:
 * - Scribe/src/components/shared/FilterPanel.tsx
 * - Scribe/src/components/Filters/FilterHeading.tsx
 * - Scribe/src/components/ListFilters/ListFilters.tsx
 * - Scribe/src/components/shared/FilterSidebar/index.tsx
 * - Scribe/src/components/ListFilters/FilterToggle.tsx
 * - Scribe/src/components/ListFilters/FilterSelect.tsx
 * - Scribe/src/components/ListFilters/FilterCheckboxes.tsx
 * - Scribe/src/components/shared/Chip/ChipCheckbox.tsx
 */

export type ScribeFilterPanelPortProps = {
  children?: ReactNode;
  collapsed?: boolean;
  hideTitle?: boolean;
  isCollapsible?: boolean;
  title: string;
};

export type ScribeFilterChipCheckboxPortProps = {
  isChecked?: boolean;
  label: string;
  showRemoveButton?: boolean;
};

export type ScribeFilterToggleRowPortProps = {
  disabled?: boolean;
  isChecked?: boolean;
  label: ReactNode;
  name: string;
};

export type ScribeFilterSetPortProps = {
  children: ReactNode;
  clearAllDisabled?: boolean;
  className?: string;
  isScrollable?: boolean;
  showShareFilters?: boolean;
  title?: string;
};

export type ScribeFilterSelectRowPortProps = {
  label: string;
  name: string;
  options: ScribeSelectFieldOption[];
  selectedOption?: ScribeSelectFieldOption | null;
};

export type ScribeFilterChipListRowPortProps = {
  chipLayout?: "full" | "condensed";
  heading: string;
  selectedChips?: ScribeChipPortData[];
};

export function ScribeFilterPanelPort({
  children,
  collapsed = false,
  hideTitle = false,
  isCollapsible = false,
  title,
}: ScribeFilterPanelPortProps) {
  const isSectionCollapsed = isCollapsible ? collapsed : false;

  return (
    <>
      {!hideTitle ? (
        <fieldset className="scribe-filter-port-heading-fieldset">
          <legend className="scribe-filter-port-legend">
            {title}
            {isCollapsible ? (
              <button
                aria-label="Collapse"
                className="scribe-filter-port-collapse-button"
                type="button"
              >
                {isSectionCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </button>
            ) : null}
          </legend>
        </fieldset>
      ) : null}
      <div
        className="scribe-filter-port-collapsible-form"
        data-collapsed={isSectionCollapsed ? "true" : undefined}
        data-flush-top={hideTitle ? "true" : undefined}
        data-testid="listing-filters"
      >
        {children}
      </div>
    </>
  );
}

export function ScribeFilterChipCheckboxPort({
  isChecked = false,
  label,
  showRemoveButton = true,
}: ScribeFilterChipCheckboxPortProps) {
  return (
    <span
      aria-checked={isChecked}
      className="scribe-filter-chip-checkbox-port"
      data-show-remove-button={showRemoveButton ? "true" : undefined}
      role="checkbox"
      tabIndex={0}
    >
      {label}
      {showRemoveButton ? <X className="close" data-testid="close" size={16} /> : null}
    </span>
  );
}

export function ScribeFilterToggleRowPort({
  disabled = false,
  isChecked = false,
  label,
  name,
}: ScribeFilterToggleRowPortProps) {
  return (
    <div className="scribe-filter-toggle-row-port">
      <label className="scribe-filter-toggle-row-port-label" htmlFor={name}>
        {label}
      </label>
      <ScribeTogglePort
        disabled={disabled}
        id={name}
        inputProps={{ "aria-label": typeof label === "string" ? label : name, role: "checkbox" }}
        isChecked={isChecked}
        name={name}
      />
    </div>
  );
}

export function ScribeFilterSelectRowPort({
  label,
  name,
  options,
  selectedOption = null,
}: ScribeFilterSelectRowPortProps) {
  return (
    <div className="scribe-filter-select-row-port">
      <ScribeSelectFieldPort
        label={label}
        name={name}
        options={options}
        selectedOption={selectedOption}
      />
    </div>
  );
}

export function ScribeFilterChipListRowPort({
  chipLayout = "full",
  heading,
  selectedChips = [],
}: ScribeFilterChipListRowPortProps) {
  return (
    <div className="scribe-filter-chip-list-row-port" data-chip-layout={chipLayout}>
      <ScribeChipListPort addButtonLabel={heading} heading={heading} selectedChips={selectedChips} />
    </div>
  );
}

export function ScribeFilterGroupLabelPort({ label }: { label: string }) {
  return (
    <div className="scribe-filter-group-label-port" role="heading" aria-level={3}>
      {label}
    </div>
  );
}

export function ScribeFilterDateRowPort({
  label,
  selectedOptionLabel = "Any time",
}: {
  label: string;
  selectedOptionLabel?: string;
}) {
  return (
    <div className="scribe-filter-date-row-port">
      <span className="scribe-filter-date-row-port-sub-label">Timeframe</span>
      <ScribeFilterSelectRowPort
        label={label}
        name={`${label.toLowerCase().replace(/\s+/g, "-")}-timeframe`}
        options={[{ label: selectedOptionLabel, value: selectedOptionLabel.toLowerCase().replace(/\s+/g, "-") }]}
        selectedOption={{ label: selectedOptionLabel, value: selectedOptionLabel.toLowerCase().replace(/\s+/g, "-") }}
      />
    </div>
  );
}

export function ScribeFilterSelectedDateRangePort() {
  return (
    <div className="scribe-filter-selected-date-range-port">
      <ScribeDatePickerPort label="Start date" name="start-date" date="2026-07-01" />
      <ScribeDatePickerPort label="End date" name="end-date" date="2026-07-13" />
    </div>
  );
}

export function ScribeFilterSetPort({
  children,
  clearAllDisabled = false,
  className = "",
  isScrollable = true,
  showShareFilters = true,
  title,
}: ScribeFilterSetPortProps) {
  return (
    <aside className={["scribe-filter-set-port", className].filter(Boolean).join(" ")}>
      {title ? <h3 className="scribe-filter-set-port-title">{title}</h3> : null}
      <div className="scribe-filter-set-port-scrollable" data-scrollable={isScrollable ? "true" : undefined}>
        {children}
      </div>
      <div className="scribe-filter-set-port-apply-bar">
        <ToolkitButton
          className="filter-sidebar-clear-all"
          disabled={clearAllDisabled}
          variant="secondaryOutline"
        >
          CLEAR ALL
        </ToolkitButton>
        {showShareFilters ? (
          <ToolkitButton disabled={clearAllDisabled}>SHARE FILTERS</ToolkitButton>
        ) : null}
      </div>
    </aside>
  );
}

export function ScribeFilterRelatedPreviewPort() {
  return (
    <div className="scribe-filter-related-preview-port">
      <ScribeSearchFieldPort id="filter-related-search" label="Search Content" />
      <ScribeChipPort label="Published" showRemoveButton={false} />
      <ScribeSelectFieldPort
        label="Section"
        name="related-section"
        options={[{ label: "All sections", value: "all" }]}
        selectedOption={{ label: "All sections", value: "all" }}
      />
    </div>
  );
}
