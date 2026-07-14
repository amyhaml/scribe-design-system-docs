import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  ScribeCardPort,
  ScribeStatusIndicatorPort,
  type ScribeCardItemPort,
} from "@/components/scribe";

function CardDemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="scribe-app-css-vars">
      <div className="scribe-card-demo-frame">{children}</div>
    </div>
  );
}

const cityImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1f3344"/>
      <stop offset=".45" stop-color="#24363f"/>
      <stop offset="1" stop-color="#0f1418"/>
    </linearGradient>
    <linearGradient id="window" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f6c05c"/>
      <stop offset="1" stop-color="#85c3a9"/>
    </linearGradient>
  </defs>
  <rect width="800" height="400" fill="url(#sky)"/>
  <g opacity=".95">
    <rect x="35" y="180" width="105" height="220" fill="#2d3f46"/>
    <rect x="160" y="95" width="150" height="305" fill="#24353c"/>
    <rect x="335" y="145" width="115" height="255" fill="#31474e"/>
    <rect x="475" y="70" width="180" height="330" fill="#263940"/>
    <rect x="680" y="170" width="85" height="230" fill="#31464c"/>
  </g>
  <g fill="url(#window)" opacity=".85">
    <path d="M55 205h18v8H55zm34 0h18v8H89zm34 0h18v8h-18zM55 238h18v8H55zm34 0h18v8H89zm34 0h18v8h-18zM55 271h18v8H55zm34 0h18v8H89zm34 0h18v8h-18z"/>
    <path d="M185 125h23v9h-23zm43 0h23v9h-23zm43 0h23v9h-23zM185 166h23v9h-23zm43 0h23v9h-23zm43 0h23v9h-23zM185 207h23v9h-23zm43 0h23v9h-23zm43 0h23v9h-23zM185 248h23v9h-23zm43 0h23v9h-23zm43 0h23v9h-23z"/>
    <path d="M356 173h20v8h-20zm36 0h20v8h-20zm36 0h20v8h-20zM356 209h20v8h-20zm36 0h20v8h-20zm36 0h20v8h-20zM356 245h20v8h-20zm36 0h20v8h-20zm36 0h20v8h-20z"/>
    <path d="M502 102h24v10h-24zm45 0h24v10h-24zm45 0h24v10h-24zM502 149h24v10h-24zm45 0h24v10h-24zm45 0h24v10h-24zM502 196h24v10h-24zm45 0h24v10h-24zm45 0h24v10h-24zM502 243h24v10h-24zm45 0h24v10h-24zm45 0h24v10h-24z"/>
  </g>
  <rect y="330" width="800" height="70" fill="#1a2428" opacity=".75"/>
</svg>`);

function LocaleBadge() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-[2px] bg-black text-[9px] font-semibold leading-none text-white">
        r
      </span>
      <span>US</span>
    </span>
  );
}

const cardItem: ScribeCardItemPort = {
  author: "Author Name",
  authorPhoto:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
  <rect width="40" height="40" fill="#252525"/>
  <circle cx="20" cy="15" r="8" fill="#f6c05c"/>
  <path d="M7 40c2-10 9-15 13-15s11 5 13 15z" fill="#ed4738"/>
</svg>`),
  date: "Oct 10, 2024 @ 01:07 PM",
  id: "card-demo-content",
  image: cityImage,
  metadata: [
    <LocaleBadge key="locale" />,
    "Metadata",
    <ScribeStatusIndicatorPort key="status" backgroundColor="var(--publish)">
      Published
    </ScribeStatusIndicatorPort>,
  ],
  secondaryMetadata: ["Metadata", "Metadata"],
  title: "Title text",
};

const getMenuItems = () => [{ id: "edit", label: "Edit" }];

function ListCardDemo({ selected = false }: { selected?: boolean }) {
  return (
    <CardDemoFrame>
      <div className="scribe-card-demo-list-stack">
        <ScribeCardPort
          getMenuItems={getMenuItems}
          isListView
          isSelected={selected}
          item={cardItem}
          showThumbnail
        />
      </div>
    </CardDemoFrame>
  );
}

function GridCardDemo({ selected = false }: { selected?: boolean }) {
  return (
    <CardDemoFrame>
      <div className="scribe-card-demo-grid-stack">
        <ScribeCardPort
          getMenuItems={getMenuItems}
          isSelected={selected}
          item={cardItem}
          showThumbnail
        />
      </div>
    </CardDemoFrame>
  );
}

export const cardDemos = {
  "list-card": [<ListCardDemo key="list" />, <ListCardDemo key="selected-list" selected />],
  "grid-card": [<GridCardDemo key="grid" />, <GridCardDemo key="selected-grid" selected />],
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/Card/index.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/Card/shared/CardImage.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/MoreOptionsMenu.tsx
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Production card port with fixture item data
      </Badge>
    </div>
  ),
};
