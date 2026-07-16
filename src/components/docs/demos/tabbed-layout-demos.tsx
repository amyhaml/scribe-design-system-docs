import type { ReactNode } from "react";

import { StoryFrame } from "@/components/docs/StoryFrame";
import { Badge } from "@/components/ui/badge";
import { ScribeTabbedLayoutPort, type ScribeTabItemPort } from "@/components/scribe";
import { getFigmaUrlForDocSlug } from "@/data/component-figma-links";

function TabsDemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="scribe-app-css-vars">
      <div className="scribe-tabs-demo-frame">{children}</div>
    </div>
  );
}

function DemoPanel({ children }: { children: ReactNode }) {
  return <div className="scribe-tabs-demo-panel">{children}</div>;
}

const stateTabs: ScribeTabItemPort[] = [
  { label: "Content", content: <DemoPanel>Content tab panel</DemoPanel> },
  { label: "Images", content: <DemoPanel>Images tab panel</DemoPanel> },
  { label: "Redirects", content: <DemoPanel>Redirects tab panel</DemoPanel> },
  { label: "Disabled", isDisabled: true, content: <DemoPanel>Disabled tab panel</DemoPanel> },
];

const validationTabs: ScribeTabItemPort[] = [
  {
    label: "Headlines",
    missingFieldsCount: 4,
    content: <DemoPanel>Headline fields need attention.</DemoPanel>,
  },
  { label: "Header", content: <DemoPanel>Header settings panel</DemoPanel> },
  { label: "Settings", content: <DemoPanel>Settings panel</DemoPanel> },
  { label: "Embed", content: <DemoPanel>Embed panel</DemoPanel> },
  { label: "SEO", missingFieldsCount: 1, content: <DemoPanel>SEO panel needs attention.</DemoPanel> },
];

const secondaryTabs: ScribeTabItemPort[] = [
  { label: "Text above", content: <DemoPanel>Text above preview</DemoPanel> },
  { label: "Text only", content: <DemoPanel>Text only preview</DemoPanel> },
  { label: "Image left", content: <DemoPanel>Image left preview</DemoPanel> },
  { label: "Image right", content: <DemoPanel>Image right preview</DemoPanel> },
];

const actionTabs: ScribeTabItemPort[] = [
  { label: "Composer", content: <DemoPanel>Composer panel</DemoPanel> },
  { label: "History", content: <DemoPanel>History panel</DemoPanel> },
  { label: "Configs", content: <DemoPanel>Configs panel</DemoPanel> },
];

export const tabbedLayoutDemos = {
  overview: (
    <StoryFrame
      storyId="tabbed-layout--tabbed-layout"
      height={280}
      figmaUrl={getFigmaUrlForDocSlug("tabbed-layout")}
    />
  ),
  states: (
    <TabsDemoFrame>
      <ScribeTabbedLayoutPort
        activeTab={0}
        isActiveTabEnabled
        tabs={stateTabs}
        uniqueId="tabs-state-demo"
        unmountOnHide={false}
      />
    </TabsDemoFrame>
  ),
  "validation-tabs": (
    <TabsDemoFrame>
      <ScribeTabbedLayoutPort
        activeTab={0}
        isActiveTabEnabled
        tabs={validationTabs}
        uniqueId="tabs-validation-demo"
        unmountOnHide={false}
      />
    </TabsDemoFrame>
  ),
  "secondary-tabs": (
    <TabsDemoFrame>
      <ScribeTabbedLayoutPort
        activeTab={0}
        isActiveTabEnabled
        tabs={secondaryTabs}
        uniqueId="tabs-secondary-demo"
        unmountOnHide={false}
        variant="secondary"
      />
    </TabsDemoFrame>
  ),
  "tabs-with-actions": (
    <TabsDemoFrame>
      <ScribeTabbedLayoutPort
        activeTab={0}
        isActiveTabEnabled
        onCollapse={() => undefined}
        rightButtons={[{ id: "add-item", label: "Add item", onClick: () => undefined }]}
        tabs={actionTabs}
        uniqueId="tabs-actions-demo"
        unmountOnHide={false}
      />
    </TabsDemoFrame>
  ),
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/TabbedLayout/index.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/TabbedLayout/TabPanel.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/TabbedLayout/SecondaryTabbedStyledLayout
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Production tab layout port with fixture tabs
      </Badge>
    </div>
  ),
};
