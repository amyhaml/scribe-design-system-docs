import {
  buildComponentList,
  groupComponents,
  type ComponentDoc,
  type StorybookIndex,
} from "@/lib/storybook";

export type FoundationSlug =
  | "palette"
  | "color"
  | "typography"
  | "spacing"
  | "radius"
  | "elevation"
  | "icons"
  | "logo";

export type FoundationNavEntry = {
  slug: FoundationSlug;
  label: string;
};

export type DocsComponentNavEntry = {
  _docsButton: true;
  id: string;
  label: string;
  path: `/components/${string}`;
  keywords?: string[];
};

export type SidebarComponentEntry = ComponentDoc | DocsComponentNavEntry;

export type DocsSearchItem = {
  id: string;
  label: string;
  group: "Getting Started" | "Templates" | "Foundations" | "Components" | "Storybook Components";
  keywords: string[];
  route:
    | { kind: "home" }
    | { kind: "templates" }
    | { kind: "foundation"; token: FoundationSlug }
    | { kind: "component"; slug: string };
};

export const FOUNDATION_NAV_ENTRIES: FoundationNavEntry[] = [
  { slug: "palette", label: "Palette" },
  { slug: "color", label: "Color" },
  { slug: "typography", label: "Typography" },
  { slug: "spacing", label: "Spacing" },
  { slug: "radius", label: "Radius" },
  { slug: "elevation", label: "Elevation" },
  { slug: "icons", label: "Icons" },
  { slug: "logo", label: "Logo" },
];

export const DOCS_NAV_ENTRIES: DocsComponentNavEntry[] = [
  {
    _docsButton: true,
    id: "app-bar",
    label: "App Bar",
    path: "/components/app-bar",
    keywords: ["navigation", "nav bar", "listing bar", "content bar"],
  },
  { _docsButton: true, id: "asset-bar", label: "Asset Bar", path: "/components/asset-bar" },
  {
    _docsButton: true,
    id: "alert-bar",
    label: "Alert & Banner",
    path: "/components/alert-bar",
    keywords: ["alert", "banner", "message", "validation"],
  },
  { _docsButton: true, id: "button", label: "Button", path: "/components/button" },
  { _docsButton: true, id: "card", label: "Card", path: "/components/card" },
  { _docsButton: true, id: "checkbox", label: "Checkbox", path: "/components/checkbox" },
  { _docsButton: true, id: "chip", label: "Chip", path: "/components/chip" },
  {
    _docsButton: true,
    id: "datepicker",
    label: "Datepicker",
    path: "/components/datepicker",
    keywords: ["date picker", "calendar"],
  },
  { _docsButton: true, id: "dialog", label: "Dialog", path: "/components/dialog" },
  {
    _docsButton: true,
    id: "dropzone",
    label: "Dropzone",
    path: "/components/dropzone",
    keywords: ["drop zone", "upload", "creation zone"],
  },
  { _docsButton: true, id: "field", label: "Field", path: "/components/field" },
  { _docsButton: true, id: "filter", label: "Filter", path: "/components/filter" },
  { _docsButton: true, id: "menu", label: "Menu", path: "/components/menu" },
  {
    _docsButton: true,
    id: "radio-input",
    label: "Radio Button",
    path: "/components/radio-input",
    keywords: ["radio input"],
  },
  {
    _docsButton: true,
    id: "snackbar",
    label: "Snackbar",
    path: "/components/snackbar",
    keywords: ["toast"],
  },
  {
    _docsButton: true,
    id: "switch",
    label: "Switch",
    path: "/components/switch",
    keywords: ["toggle"],
  },
  { _docsButton: true, id: "table", label: "Table", path: "/components/table" },
  {
    _docsButton: true,
    id: "tabbed-layout",
    label: "Tabs",
    path: "/components/tabbed-layout",
    keywords: ["tab", "tabbed layout"],
  },
  { _docsButton: true, id: "tooltip", label: "Tooltip", path: "/components/tooltip" },
  {
    _docsButton: true,
    id: "tree-menu",
    label: "Tree",
    path: "/components/tree-menu",
    keywords: ["tree menu"],
  },
];

export const HIDDEN_STORYBOOK_GROUPS = new Set(["Can Use", "Icons"]);
export const HIDDEN_STORYBOOK_SLUGS = new Set([
  "drawer",
  "table",
  "tabbed-layout",
  "toggle",
  "tooltip",
  "tree-menu",
]);

export function isDocsNavEntry(item: SidebarComponentEntry): item is DocsComponentNavEntry {
  return "_docsButton" in item && item._docsButton === true;
}

function itemSearchText(parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(" ").toLowerCase();
}

function docsEntryMatches(item: DocsComponentNavEntry, query: string): boolean {
  if (!query) return true;
  return itemSearchText([item.label, item.id, ...(item.keywords ?? [])]).includes(query);
}

function visibleStorybookComponents(index: StorybookIndex): ComponentDoc[] {
  return buildComponentList(index).filter(
    (component) =>
      !HIDDEN_STORYBOOK_SLUGS.has(component.slug) &&
      !HIDDEN_STORYBOOK_GROUPS.has(component.group),
  );
}

function storybookComponentMatches(item: ComponentDoc, query: string): boolean {
  if (!query) return true;
  return itemSearchText([item.displayName, item.title, item.slug, item.group]).includes(query);
}

function mergeDocsNavIntoComponentsGroup(
  groups: { group: string; items: ComponentDoc[] }[],
  pinnedDocs: DocsComponentNavEntry[],
): { group: string; items: SidebarComponentEntry[] }[] {
  const pinnedIds = new Set(pinnedDocs.map((d) => d.id));
  const storybookItems = groups
    .flatMap((group) => group.items)
    .filter((item) => !pinnedIds.has(item.slug))
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
  const sortedPinned = [...pinnedDocs].sort((a, b) => a.label.localeCompare(b.label));
  const next: { group: string; items: SidebarComponentEntry[] }[] = [];

  if (sortedPinned.length > 0) {
    next.push({ group: "Components", items: sortedPinned });
  }

  if (storybookItems.length > 0) {
    next.push({ group: "Storybook Components", items: storybookItems });
  }

  return next;
}

export function getSidebarComponentGroups(
  storybookIndex: StorybookIndex,
  query: string,
): { group: string; items: SidebarComponentEntry[] }[] {
  const q = query.trim().toLowerCase();
  const storybookItems = visibleStorybookComponents(storybookIndex).filter((item) =>
    storybookComponentMatches(item, q),
  );
  const storyGroups = groupComponents(storybookItems);
  const pinnedDocs = DOCS_NAV_ENTRIES.filter((item) => docsEntryMatches(item, q));

  return mergeDocsNavIntoComponentsGroup(storyGroups, pinnedDocs);
}

export function buildDocsSearchGroups(
  storybookIndex: StorybookIndex,
): Array<{ group: DocsSearchItem["group"]; items: DocsSearchItem[] }> {
  const pinnedIds = new Set(DOCS_NAV_ENTRIES.map((item) => item.id));
  const storybookItems = visibleStorybookComponents(storybookIndex)
    .filter((item) => !pinnedIds.has(item.slug))
    .sort((a, b) => a.displayName.localeCompare(b.displayName));

  const groups: Array<{ group: DocsSearchItem["group"]; items: DocsSearchItem[] }> = [
    {
      group: "Foundations",
      items: FOUNDATION_NAV_ENTRIES.map((item) => ({
        id: `foundation-${item.slug}`,
        label: item.label,
        group: "Foundations",
        keywords: [item.slug],
        route: { kind: "foundation", token: item.slug },
      })),
    },
    {
      group: "Components",
      items: [...DOCS_NAV_ENTRIES]
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((item) => ({
          id: `component-${item.id}`,
          label: item.label,
          group: "Components",
          keywords: [item.id, ...(item.keywords ?? [])],
          route: { kind: "component", slug: item.id },
        })),
    },
  ];

  if (storybookItems.length > 0) {
    groups.push({
      group: "Storybook Components",
      items: storybookItems.map((item) => ({
        id: `storybook-${item.slug}`,
        label: item.displayName,
        group: "Storybook Components",
        keywords: [item.slug, item.title, item.group],
        route: { kind: "component", slug: item.slug },
      })),
    });
  }

  return groups;
}
