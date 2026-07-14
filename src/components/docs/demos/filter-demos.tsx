import {
  ScribeFilterChipCheckboxPort,
  ScribeFilterChipListRowPort,
  ScribeFilterDateRowPort,
  ScribeFilterGroupLabelPort,
  ScribeFilterSelectRowPort,
  ScribeFilterSetPort,
  ScribeFilterToggleRowPort,
} from "@/components/scribe";
import { Badge } from "@/components/ui/badge";

function FilterDemoFrame({ children }: { children: React.ReactNode }) {
  return <div className="scribe-app-css-vars">{children}</div>;
}

const allContentOption = { label: "All Content", value: "all-content" };

const selectOptions = [
  allContentOption,
  { label: "Standard Articles", value: "standard-articles" },
  { label: "Listicles", value: "listicles" },
];

type FilterChipOption = {
  isChecked?: boolean;
  label: string;
};

function FilterChipCheckboxGroup({ chips }: { chips: FilterChipOption[] }) {
  return (
    <div className="scribe-filter-chip-checkboxes-row">
      {chips.map((chip) => (
        <ScribeFilterChipCheckboxPort
          isChecked={chip.isChecked}
          key={chip.label}
          label={chip.label}
        />
      ))}
    </div>
  );
}

function ContentStatusChips() {
  return (
    <FilterChipCheckboxGroup
      chips={[
        { label: "Draft" },
        { label: "Scheduled" },
        { label: "Published" },
        { label: "Unpublished" },
      ]}
    />
  );
}

const filterVariantChip = [{ label: "Chip text", value: "chip-text" }];

function FilterVariantStack() {
  return (
    <div className="scribe-filter-demo-variant-stack">
      <ScribeFilterChipListRowPort heading="Filter title" selectedChips={[]} />
      <ScribeFilterChipListRowPort
        chipLayout="full"
        heading="Filter title"
        selectedChips={filterVariantChip}
      />
      <ScribeFilterChipListRowPort
        chipLayout="condensed"
        heading="Filter title"
        selectedChips={filterVariantChip}
      />
    </div>
  );
}

function ContentFilterSet() {
  return (
    <ScribeFilterSetPort title="Content" clearAllDisabled={false}>
      <ScribeFilterToggleRowPort
        name="created-by-me"
        isChecked={false}
        label={
          <>
            <span className="scribe-filter-demo-avatar" aria-hidden="true">
              AH
            </span>
            Created by Me
          </>
        }
      />
      <ScribeFilterToggleRowPort name="include-lift-content" label="Include LIFT Content" isChecked />
      <ScribeFilterToggleRowPort name="sponsored" label="Sponsored" />
      <ScribeFilterGroupLabelPort label="Status" />
      <ContentStatusChips />
      <ScribeFilterGroupLabelPort label="Updated Date" />
      <ScribeFilterDateRowPort label="Updated Date" />
      <ScribeFilterGroupLabelPort label="Organization" />
      <ScribeFilterSelectRowPort
        label="Display Type"
        name="display-type"
        options={selectOptions}
        selectedOption={allContentOption}
      />
      <ScribeFilterSelectRowPort
        label="Content Type"
        name="content-type"
        options={selectOptions}
        selectedOption={allContentOption}
      />
      <ScribeFilterChipListRowPort heading="Section" selectedChips={[]} />
      <ScribeFilterChipListRowPort heading="Subsection" selectedChips={[]} />
      <ScribeFilterChipListRowPort heading="Collection" selectedChips={[]} />
      <ScribeFilterGroupLabelPort label="Contributors" />
      <ScribeFilterChipListRowPort heading="Author" selectedChips={[]} />
      <ScribeFilterChipListRowPort heading="Created By" selectedChips={[]} />
    </ScribeFilterSetPort>
  );
}

function ImageFilterSet() {
  return (
    <ScribeFilterSetPort title="Image" clearAllDisabled={false}>
      <ScribeFilterGroupLabelPort label="Updated Date" />
      <ScribeFilterDateRowPort label="Updated Date" />
      <ScribeFilterGroupLabelPort label="Contributors" />
      <ScribeFilterChipListRowPort heading="Uploaded By" selectedChips={[]} />
      <ScribeFilterChipListRowPort heading="Photographer" selectedChips={[]} />
      <ScribeFilterChipListRowPort heading="Source" selectedChips={[]} />
    </ScribeFilterSetPort>
  );
}

function VideoFilterSet() {
  return (
    <ScribeFilterSetPort title="Video" clearAllDisabled={false}>
      <ScribeFilterGroupLabelPort label="Status" />
      <FilterChipCheckboxGroup chips={[{ label: "Disabled" }, { label: "Enabled", isChecked: true }]} />
      <ScribeFilterToggleRowPort name="velocity-videos" label="Velocity Videos" />
      <ScribeFilterGroupLabelPort label="Tags" />
      <ScribeFilterChipListRowPort heading="Include Tags" selectedChips={[]} />
      <ScribeFilterChipListRowPort heading="Exclude Tags" selectedChips={[]} />
      <ScribeFilterGroupLabelPort label="Uploaded Date" />
      <ScribeFilterDateRowPort label="Uploaded Date" />
      <ScribeFilterGroupLabelPort label="Aspect Ratio" />
      <FilterChipCheckboxGroup
        chips={[{ label: "1:1" }, { label: "4:3" }, { label: "9:16" }, { label: "16:9" }]}
      />
      <ScribeFilterGroupLabelPort label="Attribute" />
      <FilterChipCheckboxGroup
        chips={[
          { label: "Ads Disabled" },
          { label: "OK for Playlists" },
          { label: "OK for Syndication" },
        ]}
      />
      <ScribeFilterGroupLabelPort label="Video Type" />
      <FilterChipCheckboxGroup chips={[{ label: "Livestream" }, { label: "Standard" }]} />
      <ScribeFilterGroupLabelPort label="Contributors" />
      <ScribeFilterChipListRowPort heading="Uploaded By" selectedChips={[]} />
    </ScribeFilterSetPort>
  );
}

export const filterDemos = {
  filters: (
    <FilterDemoFrame>
      <FilterVariantStack />
    </FilterDemoFrame>
  ),
  "filter-sets": (
    <FilterDemoFrame>
      <div className="scribe-filter-set-demo-grid">
        <ContentFilterSet />
        <ImageFilterSet />
        <VideoFilterSet />
      </div>
    </FilterDemoFrame>
  ),
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/FilterPanel.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/ListFilters/ListFilters.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/FilterSidebar/index.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/data/filters/content.ts
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Source-backed list filter ports with fixture state
      </Badge>
    </div>
  ),
};
