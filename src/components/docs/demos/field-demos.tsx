import { Badge } from "@/components/ui/badge";
import { ScribeFieldPort, ScribeSearchFieldPort, ScribeSelectFieldPort } from "@/components/scribe";

function FieldDemoFrame({ children }: { children: React.ReactNode }) {
  return <div className="scribe-app-css-vars">{children}</div>;
}

function DemoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="scribe-field-demo-row">
      <p className="scribe-field-demo-state">{label}</p>
      {children}
    </div>
  );
}

const selectOptions = [
  { label: "Label", value: "label" },
  { label: "Option", value: "option" },
  { label: "Example", value: "example" },
];

export const fieldDemos = {
  "text-fields": (
    <FieldDemoFrame>
      <div className="scribe-field-demo-grid">
        <div className="scribe-field-demo-column">
          <DemoRow label="Default">
            <ScribeFieldPort name="default-field" label="Label" value="Label" />
          </DemoRow>
          <DemoRow label="Focus">
            <ScribeFieldPort name="focused-field" label="Label" value="Label" isFocused />
          </DemoRow>
          <DemoRow label="Disabled">
            <ScribeFieldPort name="disabled-field" label="Label" value="Label" disabled />
          </DemoRow>
          <DemoRow label="Error">
            <ScribeFieldPort
              name="error-field"
              label="Required field"
              value="Required field"
              isRequired
              errorMessage="Alert text"
            />
          </DemoRow>
          <DemoRow label="Read only">
            <ScribeFieldPort name="readonly-field" label="Label" value="Label" isReadOnly />
          </DemoRow>
        </div>
      </div>
    </FieldDemoFrame>
  ),
  "fields-with-counter": (
    <FieldDemoFrame>
      <div className="scribe-field-demo-grid">
        <div className="scribe-field-demo-column">
          <DemoRow label="Default">
            <ScribeFieldPort name="counter-default" label="Label" value="Label" hardLimit={100} />
          </DemoRow>
          <DemoRow label="Focus">
            <ScribeFieldPort name="counter-focus" label="Label" value="Label" hardLimit={100} isFocused />
          </DemoRow>
          <DemoRow label="Error">
            <ScribeFieldPort
              name="counter-error"
              label="Required field"
              value="Required field"
              hardLimit={100}
              isRequired
              errorMessage="Alert text"
            />
          </DemoRow>
          <DemoRow label="Read only">
            <ScribeFieldPort name="counter-readonly" label="Label" value="Label" hardLimit={100} isReadOnly />
          </DemoRow>
        </div>
      </div>
    </FieldDemoFrame>
  ),
  "dropdown-fields": (
    <FieldDemoFrame>
      <div className="scribe-field-demo-grid">
        <div className="scribe-field-demo-column">
          <DemoRow label="Default">
            <ScribeSelectFieldPort
              name="dropdown-default"
              label="Input text"
              options={selectOptions}
              placeholder=""
            />
          </DemoRow>
          <DemoRow label="Selected">
            <ScribeSelectFieldPort
              name="dropdown-selected"
              label="Label"
              options={selectOptions}
              selectedOption={selectOptions[0]}
            />
          </DemoRow>
          <DemoRow label="Focus">
            <ScribeSelectFieldPort
              name="dropdown-focus"
              label="Label"
              options={selectOptions}
              isFocused
              isMenuOpen
            />
          </DemoRow>
          <DemoRow label="Error">
            <ScribeSelectFieldPort
              name="dropdown-error"
              label="Required field"
              options={selectOptions}
              isRequired
              errorMessage="Alert text"
            />
          </DemoRow>
          <DemoRow label="Disabled">
            <ScribeSelectFieldPort
              name="dropdown-disabled"
              label="Label"
              options={selectOptions}
              selectedOption={selectOptions[0]}
              disabled
            />
          </DemoRow>
        </div>
      </div>
    </FieldDemoFrame>
  ),
  "search-fields": (
    <FieldDemoFrame>
      <div className="scribe-field-search-demo-stack">
        <div className="scribe-field-demo-column">
          <div className="scribe-field-demo-row scribe-field-demo-row-wide">
            <p className="scribe-field-demo-state">Default</p>
            <ScribeSearchFieldPort id="search-default" />
          </div>
          <div className="scribe-field-demo-row scribe-field-demo-row-wide">
            <p className="scribe-field-demo-state">Focus</p>
            <ScribeSearchFieldPort id="search-focused" isFocused />
          </div>
        </div>
      </div>
    </FieldDemoFrame>
  ),
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/FormInput/*
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/Select/*
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/SearchBar.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/ValidationErrorMessage/ValidationErrorMessage.tsx
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Production field ports with fixture states
      </Badge>
    </div>
  ),
};
