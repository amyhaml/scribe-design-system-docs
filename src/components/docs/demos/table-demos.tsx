import type { ReactNode } from "react";

import { StoryFrame } from "@/components/docs/StoryFrame";
import { Badge } from "@/components/ui/badge";
import { ScribeTableActionPort, ScribeTablePort, type ScribeTableRowPort } from "@/components/scribe";
import { getFigmaUrlForDocSlug } from "@/data/component-figma-links";

const tableColumns = [
  { label: "QUALITY", name: "quality" },
  { label: "SIZE", name: "size" },
  { label: "ACTIONS", name: "action" },
];

function TableDemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="scribe-app-css-vars">
      <div className="scribe-table-demo-frame">{children}</div>
    </div>
  );
}

function SizeCell({
  fileSize,
  resolution,
}: {
  fileSize: string;
  resolution: string;
}) {
  return (
    <span className="scribe-table-demo-size-cell">
      <span>{fileSize}</span>
      <span aria-hidden className="scribe-table-demo-size-separator">
        |
      </span>
      <span>{resolution}</span>
    </span>
  );
}

function createRow({
  id,
  quality,
  fileSize,
  resolution,
}: {
  id: string;
  quality: string;
  fileSize: string;
  resolution: string;
}): ScribeTableRowPort {
  return {
    id,
    content: {
      quality,
      size: <SizeCell fileSize={fileSize} resolution={resolution} />,
      action: <ScribeTableActionPort>DOWNLOAD</ScribeTableActionPort>,
    },
  };
}

const rows = [
  createRow({
    id: "original",
    quality: "Original",
    fileSize: "400 mb",
    resolution: "1920 × 1080",
  }),
  createRow({
    id: "1080p",
    quality: "1080p",
    fileSize: "300 mb",
    resolution: "1920 × 1080",
  }),
  createRow({
    id: "720p",
    quality: "720p",
    fileSize: "200 mb",
    resolution: "1280 × 720",
  }),
  createRow({
    id: "480p",
    quality: "480p",
    fileSize: "100 mb",
    resolution: "960 × 540",
  }),
];

export const tableDemos = {
  overview: (
    <StoryFrame storyId="table--table-example" height={360} figmaUrl={getFigmaUrlForDocSlug("table")} />
  ),
  row: (
    <TableDemoFrame>
      <ScribeTablePort columns={tableColumns} data={[rows[0]]} hideHeaders />
    </TableDemoFrame>
  ),
  table: (
    <TableDemoFrame>
      <ScribeTablePort columns={tableColumns} data={rows} />
    </TableDemoFrame>
  ),
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/Table.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/Videos/AssetsFieldset.tsx
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Production table port with video encoding fixtures
      </Badge>
    </div>
  ),
};
