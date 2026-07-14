import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  ScribeGlobalToolbarPort,
  ScribeNavPort,
  ScribeTabbedLayoutPort,
  type ScribeToolbarButtonPort,
} from "@/components/scribe";

function AppBarDemoFrame({
  children,
  compact = false,
}: {
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="scribe-app-css-vars">
      <div
        className={
          compact
            ? "scribe-app-bar-demo-frame scribe-app-bar-demo-frame--compact"
            : "scribe-app-bar-demo-frame"
        }
      >
        {children}
      </div>
    </div>
  );
}

const homepageTabs = [
  { label: "Home Page", content: <span className="sr-only">Home Page</span> },
  { label: "Sections", content: <span className="sr-only">Sections</span> },
  { label: "Subsections", content: <span className="sr-only">Subsections</span> },
  { label: "Collections", content: <span className="sr-only">Collections</span> },
];

const composerTabs = [
  {
    label: "Composer",
    missingFieldsCount: 2,
    content: <span className="sr-only">Composer</span>,
  },
  { label: "History", content: <span className="sr-only">History</span> },
];

const toolbarButtons: ScribeToolbarButtonPort[] = [
  {
    id: "preview",
    label: "Preview",
    background: "var(--info)",
    shareLink: true,
    type: "button",
  },
  {
    id: "save-draft",
    label: "Save draft",
    background: "var(--draft)",
    type: "button",
  },
  {
    id: "publish",
    label: "Publish",
    background: "var(--background-disabled)",
    color: "var(--text-light)",
    disabled: true,
    type: "button",
  },
];

export const appBarDemos = {
  "nav-bar": (
    <AppBarDemoFrame>
      <ScribeNavPort />
    </AppBarDemoFrame>
  ),
  "listing-bar": (
    <AppBarDemoFrame compact>
      <ScribeNavPort />
      <ScribeTabbedLayoutPort
        tabs={homepageTabs}
        activeTab={0}
        isActiveTabEnabled
        uniqueId="homepage-app-bar-tabs"
        unmountOnHide={false}
      />
    </AppBarDemoFrame>
  ),
  "content-bar": (
    <AppBarDemoFrame compact>
      <ScribeNavPort activeListing="Creation" workspaceLabel="Creation" tenantLabel="Oprah Daily US" />
      <ScribeGlobalToolbarPort
        title="Untitled content"
        externalLink="/"
        dateComponent="Created: Aug 17, 2024 @ 12:00pm New York time"
        menuButtons={toolbarButtons}
        moreOptionsButtons={[{ id: "more", label: "More options" }]}
        previewUrl="/preview/untitled-content"
      />
      <ScribeTabbedLayoutPort
        tabs={composerTabs}
        activeTab={0}
        isActiveTabEnabled
        uniqueId="content-app-bar-tabs"
        unmountOnHide={false}
      />
    </AppBarDemoFrame>
  ),
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/Nav/*
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/apps/scribe/src/components/GlobalToolbar/*
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/TabbedLayout/*
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Production ports with fixture props only
      </Badge>
    </div>
  ),
};
