import { useMemo, useState, type ReactNode } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { CheckSquare, MinusSquare, Search, Square } from "react-feather";

/**
 * Source-truth visual port for Scribe tree docs.
 * Source files:
 * - Scribe/src/components/shared/TreeMenu.tsx
 * - Scribe/src/components/shared/TreeBlock.tsx
 * - Scribe/src/components/shared/SearchBar.tsx
 * - Scribe/packages/toolkit/src/components/Popover/Popover.tsx
 * - Scribe/packages/styles/src/material-ui/index.ts
 */

export type ScribeTreeNodePort = {
  children?: ScribeTreeNodePort[];
  disabledSuffix?: string;
  isDisabled?: boolean;
  isHidden?: boolean;
  label: string;
  value: string;
};

export type ScribeTreeMenuPortProps = {
  data: ScribeTreeNodePort[];
  disabledValues?: string[];
  expandedValues?: string[];
  isPopoverSurface?: boolean;
  multipleSelections?: boolean;
  searchPlaceholder?: string;
  selectedItem?: string;
  selectedValues?: string[];
  showSearch?: boolean;
};

type NodeMap = Map<string, string>;

function createNodeMap(nodes: ScribeTreeNodePort[], values: string[] = []) {
  const map: NodeMap = new Map();

  function visit(node: ScribeTreeNodePort) {
    if (values.includes(node.value)) {
      map.set(node.value, node.label);
    }

    node.children?.forEach(visit);
  }

  nodes.forEach(visit);
  return map;
}

function hasAnySelectedNode(node: ScribeTreeNodePort, selectedNodes: NodeMap): boolean {
  if (node.children?.length) {
    if (selectedNodes.has(node.value)) return true;
    return node.children.some((child) => hasAnySelectedNode(child, selectedNodes));
  }

  return selectedNodes.has(node.value);
}

function hasEverySelectedNode(node: ScribeTreeNodePort, selectedNodes: NodeMap): boolean {
  if (node.children?.length) {
    return node.children.every((child) => hasEverySelectedNode(child, selectedNodes));
  }

  return selectedNodes.has(node.value);
}

function toggleItem(key: string, value: string, nodeMap: NodeMap, setValues: (map: NodeMap) => void) {
  const next = new Map(nodeMap);

  if (next.has(key)) {
    next.delete(key);
  } else {
    next.set(key, value);
  }

  setValues(next);
}

function selectRestOfChildren(
  nodeChildren: ScribeTreeNodePort[],
  selectedNodes: NodeMap,
  setSelectedNodes: (map: NodeMap) => void,
) {
  let next = new Map(selectedNodes);

  function visit(child: ScribeTreeNodePort) {
    if (!next.has(child.value)) {
      next.set(child.value, child.label);
    }

    child.children?.forEach(visit);
  }

  nodeChildren.forEach(visit);
  setSelectedNodes(next);
}

function deselectAllChildren(
  nodeChildren: ScribeTreeNodePort[],
  selectedNodes: NodeMap,
  setSelectedNodes: (map: NodeMap) => void,
) {
  let next = new Map(selectedNodes);

  function visit(child: ScribeTreeNodePort) {
    next.delete(child.value);
    child.children?.forEach(visit);
  }

  nodeChildren.forEach(visit);
  setSelectedNodes(next);
}

function ScribeTreeItemLabelPort({
  disabledSuffix,
  isAnyChildChecked,
  isChecked,
  isDisabled,
  label,
  onToggle,
  showSelectButton,
}: {
  disabledSuffix?: string;
  isAnyChildChecked: boolean;
  isChecked: boolean;
  isDisabled: boolean;
  label: string;
  onToggle: () => void;
  showSelectButton: boolean;
}) {
  return (
    <div className="scribe-tree-port-flex-wrapper">
      {showSelectButton ? (
        <button
          aria-label={`${isChecked ? "unselect" : "select"} ${label}`}
          className="scribe-tree-port-select-button"
          disabled={isDisabled}
          onClick={(event) => {
            event.stopPropagation();
            if (!isDisabled) onToggle();
          }}
          type="button"
        >
          {isChecked ? <CheckSquare /> : isAnyChildChecked ? <MinusSquare /> : <Square />}
        </button>
      ) : null}
      <span>{label}</span>
      {isDisabled && disabledSuffix ? (
        <span className="scribe-tree-port-disabled-suffix">{disabledSuffix}</span>
      ) : null}
    </div>
  );
}

function renderTree(
  node: ScribeTreeNodePort,
  selectedNodes: NodeMap,
  setSelectedNodes: (map: NodeMap) => void,
  multipleSelections: boolean,
  disabledValues: string[],
): ReactNode {
  if (node.isHidden) return null;

  const hasChildren = Boolean(node.children?.length);
  const isDisabled = Boolean(node.isDisabled || disabledValues.includes(node.value));
  const isEveryChildChecked = hasEverySelectedNode(node, selectedNodes);
  const isAnyChildChecked = hasAnySelectedNode(node, selectedNodes);
  const showSelectButton = multipleSelections || !hasChildren;

  const handleToggleItem = () => {
    if (hasChildren && node.children) {
      if (isEveryChildChecked) {
        deselectAllChildren(node.children, selectedNodes, setSelectedNodes);
      } else {
        selectRestOfChildren(node.children, selectedNodes, setSelectedNodes);
      }
    }

    toggleItem(node.value, node.label, selectedNodes, setSelectedNodes);
  };

  return (
    <TreeItem
      className="scribe-tree-port-item"
      disabled={isDisabled}
      id={node.value}
      itemId={node.value}
      key={node.value}
      label={
        <ScribeTreeItemLabelPort
          disabledSuffix={node.disabledSuffix}
          isAnyChildChecked={isAnyChildChecked}
          isChecked={selectedNodes.has(node.value)}
          isDisabled={isDisabled}
          label={node.label}
          onToggle={handleToggleItem}
          showSelectButton={showSelectButton}
        />
      }
    >
      {node.children?.map((child) =>
        renderTree(child, selectedNodes, setSelectedNodes, multipleSelections, disabledValues),
      )}
    </TreeItem>
  );
}

function ScribeTreeSearchPort({ placeholder }: { placeholder: string }) {
  return (
    <div className="scribe-tree-port-search-wrapper">
      <form data-testid="search-form">
        <fieldset>
          <button aria-label="search" data-testid="search-button" type="button">
            <Search data-testid="search-icon" />
          </button>
          <input
            aria-label={placeholder}
            autoFocus
            id="search-node"
            onChange={() => {}}
            placeholder={placeholder}
            readOnly
            type="text"
            value=""
          />
        </fieldset>
      </form>
    </div>
  );
}

export function ScribeTreeMenuPort({
  data,
  disabledValues = [],
  expandedValues = [],
  isPopoverSurface = true,
  multipleSelections = true,
  searchPlaceholder = "Search",
  selectedItem,
  selectedValues = [],
  showSearch = true,
}: ScribeTreeMenuPortProps) {
  const initialSelectedNodes = useMemo(() => createNodeMap(data, selectedValues), [data, selectedValues]);
  const [selectedNodes, setSelectedNodes] = useState<NodeMap>(initialSelectedNodes);
  const [expandedItems, setExpandedItems] = useState<string[]>(expandedValues);

  const tree = (
    <div className="scribe-tree-port-menu-wrapper">
      {showSearch ? <ScribeTreeSearchPort placeholder={searchPlaceholder} /> : null}
      <SimpleTreeView
        expandedItems={expandedItems}
        multiSelect={multipleSelections}
        onExpandedItemsChange={(_event, itemIds) => setExpandedItems(itemIds)}
        selectedItems={multipleSelections ? (selectedItem ? [selectedItem] : undefined) : selectedItem}
      >
        {data.map((node) =>
          renderTree(node, selectedNodes, setSelectedNodes, multipleSelections, disabledValues),
        )}
      </SimpleTreeView>
    </div>
  );

  if (!isPopoverSurface) return tree;

  return (
    <div className="scribe-tree-port-popover" data-testid="popover">
      {tree}
    </div>
  );
}

export function ScribeTreeItemStatesPort({
  data,
  disabledValues,
  expandedValues,
  selectedItem,
  selectedValues,
}: Pick<
  ScribeTreeMenuPortProps,
  "data" | "disabledValues" | "expandedValues" | "selectedItem" | "selectedValues"
>) {
  return (
    <ScribeTreeMenuPort
      data={data}
      disabledValues={disabledValues}
      expandedValues={expandedValues}
      isPopoverSurface={false}
      multipleSelections
      selectedItem={selectedItem}
      selectedValues={selectedValues}
      showSearch={false}
    />
  );
}
