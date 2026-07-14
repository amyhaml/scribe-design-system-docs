import type { ReactNode } from "react";

import { StoryFrame } from "@/components/docs/StoryFrame";
import { Badge } from "@/components/ui/badge";
import {
  ScribeChipListPort,
  ScribeChipPort,
  type ScribeChipPortData,
} from "@/components/scribe";
import { getFigmaUrlForDocSlug } from "@/data/component-figma-links";

function ChipDemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="scribe-app-css-vars">
      <div className="scribe-chip-demo-frame">{children}</div>
    </div>
  );
}

function ChipStatesDemo() {
  const chips: ScribeChipPortData[] = [
    { label: "Chip text", value: "default" },
    { label: "Chip text", value: "primary", isPrimary: true },
  ];

  return (
    <ChipDemoFrame>
      <div className="scribe-chip-demo-stack">
        {chips.map((chip) => (
          <ScribeChipPort key={String(chip.value)} {...chip} />
        ))}
      </div>
    </ChipDemoFrame>
  );
}

function RelatedFiltersDemo() {
  const selectedChips: ScribeChipPortData[] = [
    { label: "Chip text", value: "chip-text" },
  ];

  return (
    <ChipDemoFrame>
      <div className="scribe-chip-demo-related">
        <div className="scribe-chip-demo-filter-grid">
          <div>
            <div className="scribe-chip-demo-filter-title">Filter, Filter w/ Chip</div>
            <div className="scribe-chip-demo-filter-card">
              <ScribeChipListPort
                addButtonLabel="Add filter"
                heading="Filter title"
                selectedChips={selectedChips}
              />
              <ScribeChipListPort addButtonLabel="Add filter" heading="Filter title" />
            </div>
          </div>
          <div>
            <div className="scribe-chip-demo-filter-title">Usage w/ Chip</div>
            <div className="scribe-chip-demo-filter-card">
              <ScribeChipListPort
                addButtonLabel="Add filter"
                heading="Filter title"
                selectedChips={selectedChips}
              />
            </div>
          </div>
        </div>
      </div>
    </ChipDemoFrame>
  );
}

export const chipDemos = {
  overview: (
    <StoryFrame storyId="chip--chip-example" height={220} figmaUrl={getFigmaUrlForDocSlug("chip")} />
  ),
  states: <ChipStatesDemo />,
  related: <RelatedFiltersDemo />,
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/Chip/Chip.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/Chip/ChipBase.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/Chip/ChipList.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/Chip/ChipListBase.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/Chips/*
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/SvgButton/index.tsx
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Production chip and chip-list ports
      </Badge>
    </div>
  ),
};
