import { StoryFrame } from "@/components/docs/StoryFrame";
import {
  ScribeDropdownMenuPort,
  ScribeTreeItemStatesPort,
  ScribeTreeMenuPort,
  type ScribeTreeNodePort,
} from "@/components/scribe";
import { Badge } from "@/components/ui/badge";
import { getFigmaUrlForDocSlug } from "@/data/component-figma-links";

function TreeDemoFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="scribe-app-css-vars">
      <div className="scribe-tree-demo-frame">{children}</div>
    </div>
  );
}

const treeData: ScribeTreeNodePort[] = [
  {
    label: "Label",
    value: "root-1",
    children: [
      { label: "Label", value: "root-1-child-1" },
      { label: "Label", value: "root-1-child-2" },
      { label: "Label", value: "root-1-child-3" },
    ],
  },
  { label: "Label", value: "root-2" },
  { label: "Label", value: "root-3" },
  { label: "Label", value: "root-4" },
  { label: "Label", value: "root-5" },
  { label: "Label", value: "root-6" },
  { label: "Label", value: "root-7" },
  { label: "Label", value: "root-8" },
];

const treeItemData: ScribeTreeNodePort[] = [
  {
    label: "Label",
    value: "item-parent",
    children: [
      { label: "Label", value: "item-child" },
      { label: "Label", value: "item-child-disabled", isDisabled: true },
    ],
  },
  { label: "Label", value: "item-sibling" },
  { label: "Label", value: "item-disabled", isDisabled: true },
];

const dropdownOptions = [
  { isFocused: true, label: "Label" },
  { label: "Label" },
  { label: "Label" },
  { label: "Label" },
  { label: "Label" },
  { label: "Label" },
];

export const treeMenuDemos = {
  overview: (
    <StoryFrame
      storyId="tree-menu--families"
      height={380}
      figmaUrl={getFigmaUrlForDocSlug("tree-menu")}
    />
  ),
  "tree-items": (
    <TreeDemoFrame>
      <div className="scribe-tree-item-matrix" aria-label="Tree item states">
        <div className="scribe-tree-item-column">
          <p className="scribe-tree-item-column-heading">Expanded and selected</p>
          <ScribeTreeItemStatesPort
            data={treeItemData}
            expandedValues={["item-parent"]}
            selectedItem="item-parent"
            selectedValues={["item-child"]}
          />
        </div>
        <div className="scribe-tree-item-column">
          <p className="scribe-tree-item-column-heading">Disabled values</p>
          <ScribeTreeItemStatesPort
            data={treeItemData}
            disabledValues={["item-disabled", "item-child-disabled"]}
            expandedValues={["item-parent"]}
            selectedValues={["item-parent", "item-child"]}
          />
        </div>
      </div>
    </TreeDemoFrame>
  ),
  tree: (
    <TreeDemoFrame>
      <div className="scribe-tree-demo-pair">
        <ScribeTreeMenuPort
          data={treeData}
          expandedValues={["root-1"]}
          searchPlaceholder="Search"
          selectedValues={["root-1-child-1"]}
        />
        <ScribeTreeMenuPort
          data={treeData}
          expandedValues={["root-1"]}
          searchPlaceholder="Search"
          selectedValues={["root-1", "root-1-child-1"]}
        />
      </div>
    </TreeDemoFrame>
  ),
  "related-components": (
    <TreeDemoFrame>
      <ScribeDropdownMenuPort options={dropdownOptions} />
    </TreeDemoFrame>
  ),
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/TreeMenu.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/TreeBlock.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/SearchBar.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/Popover/Popover.tsx
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Production tree menu port with fixture tree data
      </Badge>
    </div>
  ),
};
