import * as React from "react";
import ReactSelect, { components as reactSelectComponents } from "react-select";
import type { GroupBase, StylesConfig } from "react-select";
import { AlertCircle, ChevronDown, Lock, Search } from "react-feather";

/*
 * Source-truth visual ports for Field docs.
 * Source files:
 * - Scribe/packages/toolkit/src/components/FormInput/FormInput.tsx
 * - Scribe/packages/toolkit/src/components/FormInput/FormInput.styles.ts
 * - Scribe/packages/toolkit/src/components/FormInput/FormInputLimit.tsx
 * - Scribe/packages/toolkit/src/components/ValidationErrorMessage/ValidationErrorMessage.tsx
 * - Scribe/packages/toolkit/src/components/Select/index.tsx
 * - Scribe/packages/toolkit/src/components/Select/ReactSelectWrapper.tsx
 * - Scribe/packages/toolkit/src/components/Select/ReactSelectProps.ts
 * - Scribe/packages/toolkit/src/components/Select/DropdownIndicator.tsx
 * - Scribe/src/components/shared/SearchBar.tsx
 */

export interface ScribeFieldPortProps {
  disabled?: boolean;
  errorMessage?: string;
  hardLimit?: number;
  id?: string;
  isFocused?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  label: string;
  limitCount?: number;
  name: string;
  placeholder?: string;
  showCounter?: boolean;
  softLimit?: number;
  value?: string;
}

export interface ScribeSelectFieldOption {
  label: string;
  value: string;
}

export interface ScribeSelectFieldPortProps {
  disabled?: boolean;
  errorMessage?: string;
  id?: string;
  isFocused?: boolean;
  isMenuOpen?: boolean;
  isRequired?: boolean;
  label: string;
  name: string;
  options?: ScribeSelectFieldOption[];
  placeholder?: string;
  selectedOption?: ScribeSelectFieldOption | null;
}

export interface ScribeSearchFieldPortProps {
  id?: string;
  isFocused?: boolean;
  label?: string;
  search?: string;
}

function getInputId(id: string | undefined, name: string) {
  return id || `${name}-input`;
}

function getCurrentCount(value: string, limitCount?: number) {
  return typeof limitCount === "number" ? limitCount : value.length;
}

function ScribeFieldValidationMessage({ error, id }: { error: string; id: string }) {
  return (
    <small className="scribe-field-port-validation-error" data-testid={`${id}-validation-error`} role="alert">
      <span className="scribe-field-port-validation-icon">
        <AlertCircle size={14} />
      </span>
      {error}
    </small>
  );
}

function ScribeFieldCounter({
  error,
  limit,
  name,
  value,
}: {
  error?: boolean;
  limit?: number;
  name: string;
  value: string;
}) {
  if (limit) {
    const currentCount = getCurrentCount(value);
    return (
      <small
        className="scribe-field-port-limit"
        data-error={error || currentCount > limit ? "true" : undefined}
        data-testid={`${name}-limit`}
      >
        {currentCount} / {limit}
      </small>
    );
  }

  return (
    <small className="scribe-field-port-character-count" data-testid={`${name}-counter`}>
      {getCurrentCount(value)}
    </small>
  );
}

export function ScribeFieldPort({
  disabled = false,
  errorMessage,
  hardLimit,
  id,
  isFocused = false,
  isReadOnly = false,
  isRequired = false,
  label,
  limitCount,
  name,
  placeholder,
  showCounter = false,
  softLimit,
  value = "",
}: ScribeFieldPortProps) {
  const inputId = getInputId(id, name);
  const limit = softLimit || hardLimit;
  const hasValue = value.trim().length > 0;
  const isLabelVisible = Boolean(label && (hasValue || isFocused));
  const shouldShowCounter = (limit || showCounter) && !isReadOnly;

  return (
    <div className="scribe-field-port-field">
      <div
        className="scribe-field-port-input-wrapper"
        data-error={errorMessage ? "true" : undefined}
        data-focused={isFocused ? "true" : undefined}
        data-has-control-icon={isReadOnly ? "true" : undefined}
      >
        <label
          className={`scribe-field-port-label${!isLabelVisible ? " empty" : ""}`}
          data-error={errorMessage ? "true" : undefined}
          htmlFor={inputId}
          id={`${inputId}-label`}
        >
          {label}
          {isRequired ? " *" : ""}
        </label>
        <input
          aria-label={label}
          className="scribe-field-port-input"
          data-error={errorMessage ? "true" : undefined}
          data-focused={isFocused ? "true" : undefined}
          disabled={disabled}
          id={inputId}
          maxLength={hardLimit}
          name={name}
          placeholder={placeholder ?? label}
          readOnly={isReadOnly}
          tabIndex={isReadOnly ? -1 : 0}
          value={value}
          onChange={() => {}}
        />
        {shouldShowCounter ? (
          <div className="scribe-field-port-adornments">
            <ScribeFieldCounter error={!!errorMessage} limit={limit} name={name} value={value} />
          </div>
        ) : null}
        {isReadOnly ? (
          <div className="scribe-field-port-adornments">
            {shouldShowCounter ? (
              <ScribeFieldCounter error={!!errorMessage} limit={limit} name={name} value={value} />
            ) : null}
            <span className="scribe-field-port-icon-wrapper" aria-hidden>
              <Lock size={16} />
            </span>
          </div>
        ) : null}
      </div>
      {errorMessage ? <ScribeFieldValidationMessage id={inputId} error={errorMessage} /> : null}
    </div>
  );
}

const selectStyles: StylesConfig<ScribeSelectFieldOption, false, GroupBase<ScribeSelectFieldOption>> = {
  container: (provided) => ({
    ...provided,
    position: "relative",
    width: "100%",
  }),
  control: (provided, state) => ({
    ...provided,
    background: state.isDisabled ? "var(--background-disabled)" : "transparent",
    border: "none",
    borderBottom: `var(--border-width) solid ${
      state.selectProps.hasError ? "var(--error)" : state.isFocused ? "var(--primary)" : "var(--divider)"
    }`,
    borderRadius: 0,
    boxShadow: "none",
    color: state.selectProps.hasError
      ? "var(--error)"
      : state.isDisabled
        ? "var(--text-disabled)"
        : "var(--text)",
    cursor: state.isDisabled ? "not-allowed" : "default",
    fontSize: "var(--default-font-size)",
    minHeight: "auto",
    outline: "none",
    padding: "var(--spacing-xl) 0 var(--spacing-s) 0",
    transition: "background 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out 0s",
    width: "100%",
  }),
  dropdownIndicator: () => ({
    height: "1em",
    padding: 0,
    width: "1em",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    bottom: "25%",
    position: "absolute",
    right: 0,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  input: (provided, { selectProps }) => ({
    ...provided,
    border: 0,
    borderRadius: 0,
    boxShadow: "none",
    color: selectProps.hasError ? "var(--error)" : selectProps.isDisabled ? "var(--text-disabled)" : "inherit",
    margin: 0,
    padding: 0,
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--background-paper)",
    borderRadius: "var(--border-radius)",
    color: "var(--text-light)",
    margin: 0,
    zIndex: 1300,
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? "var(--background-main)" : "var(--background-paper)",
    color: state.isFocused ? "var(--text)" : "inherit",
    cursor: "pointer",
  }),
  singleValue: (provided, { selectProps }) => ({
    ...provided,
    color: selectProps.hasError ? "var(--error)" : selectProps.isDisabled ? "var(--text-disabled)" : "var(--text)",
    margin: 0,
    top: selectProps.hasLabel ? "50%" : "23%",
  }),
  valueContainer: (provided) => ({
    ...provided,
    lineHeight: "normal",
    padding: 0,
  }),
};

function ScribeDropdownIndicator(props: any) {
  return (
    <reactSelectComponents.DropdownIndicator {...props}>
      <ChevronDown data-testid="chevron-down" size={16} />
    </reactSelectComponents.DropdownIndicator>
  );
}

function getSelectId(name: string): string {
  return `select-${name}`;
}

export function ScribeSelectFieldPort({
  disabled = false,
  errorMessage = "",
  id,
  isFocused = false,
  isMenuOpen = null,
  isRequired = false,
  label,
  name,
  options = [],
  placeholder = "",
  selectedOption = null,
}: ScribeSelectFieldPortProps) {
  const inputId = getSelectId(name);
  const hasInputValue = false;
  const isEmpty = !selectedOption;
  const isLabelInField = isEmpty && !isFocused && !hasInputValue;

  return (
    <div className="scribe-field-port-field">
      <div
        className="scribe-field-port-select-wrapper"
        data-error={errorMessage ? "true" : undefined}
        data-focused={isFocused ? "true" : undefined}
        id={id}
      >
        <label
          className="scribe-field-port-label"
          data-error={errorMessage ? "true" : undefined}
          data-in-field={isLabelInField ? "true" : undefined}
          htmlFor={inputId}
        >
          {label}
          {isRequired ? " *" : ""}
        </label>
        <ReactSelect<ScribeSelectFieldOption, false>
          aria-label={label}
          backspaceRemovesValue={false}
          cacheOptions
          components={{
            DropdownIndicator: ScribeDropdownIndicator,
            IndicatorSeparator: null,
            LoadingIndicator: null,
            MultiValue: null,
          }}
          hasError={!!errorMessage}
          hasLabel={!!label}
          inputId={inputId}
          isClearable={false}
          isDisabled={disabled}
          isMulti={false}
          menuIsOpen={isMenuOpen ?? undefined}
          name={name}
          options={options}
          placeholder={placeholder}
          styles={selectStyles}
          value={selectedOption}
          onChange={() => {}}
        />
      </div>
      {errorMessage ? <ScribeFieldValidationMessage id={inputId} error={errorMessage} /> : null}
    </div>
  );
}

export function ScribeSearchFieldPort({
  id = "search",
  isFocused = false,
  label = "Search Content",
  search = "",
}: ScribeSearchFieldPortProps) {
  return (
    <div className="scribe-field-port-searchbar">
      <form className="scribe-field-port-searchbar-form" data-testid="search-form" onSubmit={(event) => event.preventDefault()}>
        <fieldset className="scribe-field-port-searchbar-fieldset">
          <div className="scribe-field-port-searchbar-wrapper">
            <button
              aria-label="Search"
              className="scribe-field-port-searchbar-button"
              data-testid="search-button"
              type="button"
            >
              <Search aria-hidden="true" className="scribe-field-port-searchbar-icon" data-testid="search-icon" />
            </button>
            <input
              aria-label={label}
              className="scribe-field-port-searchbar-input"
              data-focused={isFocused ? "true" : undefined}
              id={id}
              name="search"
              placeholder={label}
              value={search}
              onChange={() => {}}
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
