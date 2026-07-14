import { Link, getRouteApi, useRouterState } from "@tanstack/react-router";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Search, Palette, Droplets, Type, Ruler, Square, Layers, Sparkles } from "lucide-react";

import { ScribeLogoWideBlack } from "@/components/brand/ScribeLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { buildComponentList, groupComponents, type ComponentDoc } from "@/lib/storybook";

const rootRoute = getRouteApi("__root__");

/** Docs-only nav rows (not from Storybook index). */
type DocsNavButton = {
  _docsButton: true;
  id: string;
  label: string;
  to:
    | "/components/button"
    | "/components/alert-bar"
    | "/components/app-bar"
    | "/components/asset-bar"
    | "/components/card"
    | "/components/checkbox"
    | "/components/chip"
    | "/components/datepicker"
    | "/components/dialog"
    | "/components/dropzone"
    | "/components/field"
    | "/components/filter"
    | "/components/menu";
};

type SidebarComponentEntry = ComponentDoc | DocsNavButton;

function isDocsButton(item: SidebarComponentEntry): item is DocsNavButton {
  return "_docsButton" in item && item._docsButton === true;
}

const DOCS_NAV_ENTRIES: DocsNavButton[] = [
  { _docsButton: true, id: "app-bar", label: "App Bar", to: "/components/app-bar" },
  { _docsButton: true, id: "asset-bar", label: "Asset Bar", to: "/components/asset-bar" },
  { _docsButton: true, id: "alert-bar", label: "Alert & Banner", to: "/components/alert-bar" },
  { _docsButton: true, id: "button", label: "Button", to: "/components/button" },
  { _docsButton: true, id: "card", label: "Card", to: "/components/card" },
  { _docsButton: true, id: "checkbox", label: "Checkbox", to: "/components/checkbox" },
  { _docsButton: true, id: "chip", label: "Chip", to: "/components/chip" },
  { _docsButton: true, id: "datepicker", label: "Datepicker", to: "/components/datepicker" },
  { _docsButton: true, id: "dialog", label: "Dialog", to: "/components/dialog" },
  { _docsButton: true, id: "dropzone", label: "Dropzone", to: "/components/dropzone" },
  { _docsButton: true, id: "field", label: "Field", to: "/components/field" },
  { _docsButton: true, id: "filter", label: "Filter", to: "/components/filter" },
  { _docsButton: true, id: "menu", label: "Menu", to: "/components/menu" },
];

const SIDEBAR_SCROLL_STORAGE_KEY = "scribe-docs-sidebar-scroll-top";
const HIDDEN_STORYBOOK_GROUPS = new Set(["Can Use", "Icons"]);
const HIDDEN_STORYBOOK_SLUGS = new Set(["drawer"]);

function sidebarSortLabel(item: SidebarComponentEntry): string {
  return isDocsButton(item) ? item.label : item.displayName;
}

function mergeDocsNavIntoComponentsGroup(
  groups: { group: string; items: ComponentDoc[] }[],
  pinnedDocs: DocsNavButton[],
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

const foundations = [
  { slug: "palette", label: "Palette", icon: Palette },
  { slug: "color", label: "Color", icon: Droplets },
  { slug: "typography", label: "Typography", icon: Type },
  { slug: "spacing", label: "Spacing", icon: Ruler },
  { slug: "radius", label: "Radius", icon: Square },
  { slug: "elevation", label: "Elevation", icon: Layers },
  { slug: "icons", label: "Icons", icon: Sparkles },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [query, setQuery] = useState("");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const scrollTopRef = useRef(0);
  const { storybookIndex } = rootRoute.useLoaderData();

  const saveSidebarScroll = (scrollTop: number) => {
    scrollTopRef.current = scrollTop;
    window.sessionStorage.setItem(SIDEBAR_SCROLL_STORAGE_KEY, String(scrollTop));
  };

  const grouped = useMemo(() => {
    if (!storybookIndex) return [];
    const all = buildComponentList(storybookIndex).filter(
      (component) => !HIDDEN_STORYBOOK_SLUGS.has(component.slug),
    );
    const q = query.trim().toLowerCase();
    const filtered = q ? all.filter((c) => c.displayName.toLowerCase().includes(q)) : all;
    const storyGroups = groupComponents(filtered).filter((group) => !HIDDEN_STORYBOOK_GROUPS.has(group.group));
    const pinnedDocs = q
      ? DOCS_NAV_ENTRIES.filter(
          (d) =>
            d.label.toLowerCase().includes(q) ||
            d.id.includes(q) ||
            "app bar".includes(q) ||
            "asset bar".includes(q) ||
            "alert".includes(q) ||
            "banner".includes(q) ||
            "card".includes(q) ||
            "checkbox".includes(q) ||
            "chip".includes(q) ||
            "datepicker".includes(q) ||
            "date picker".includes(q) ||
            "dialog".includes(q) ||
            "dropzone".includes(q) ||
            "drop zone".includes(q) ||
            "field".includes(q) ||
            "filter".includes(q) ||
            "menu".includes(q),
        )
      : DOCS_NAV_ENTRIES;
    return mergeDocsNavIntoComponentsGroup(storyGroups, pinnedDocs);
  }, [storybookIndex, query]);

  const isActive = (path: string) => pathname === path;
  const navItemCount = grouped.reduce((count, group) => count + group.items.length, 0);
  const saveCurrentSidebarScroll = () => {
    const content = contentRef.current;
    if (!content) return;
    saveSidebarScroll(content.scrollTop);
  };

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const storedScrollTop = Number(window.sessionStorage.getItem(SIDEBAR_SCROLL_STORAGE_KEY));
    const scrollTop = Number.isFinite(storedScrollTop) ? storedScrollTop : scrollTopRef.current;
    scrollTopRef.current = scrollTop;
    const restore = () => {
      content.scrollTop = scrollTop;
    };
    const frame = window.requestAnimationFrame(restore);
    const settledFrame = window.setTimeout(() => {
      window.requestAnimationFrame(restore);
    }, 0);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settledFrame);
    };
  }, [pathname, navItemCount]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <Link
          to="/"
          aria-label="Scribe Design System, home"
          className="flex w-full min-w-0 flex-row items-center gap-2 px-2 py-1.5 group-data-[collapsible=icon]:justify-center"
        >
          <ScribeLogoWideBlack className="min-w-0 shrink" />
          <span className="shrink-0 pt-1 text-[11px] leading-tight text-muted-foreground group-data-[collapsible=icon]:hidden">
            Design System
          </span>
        </Link>
        <div className="w-full px-2 pb-2">
          <div className="flex h-8 w-full items-center gap-2 rounded-md border border-input bg-white px-2.5 shadow-sm focus-within:ring-1 focus-within:ring-ring dark:border-sidebar-border">
            <Search
              className="pointer-events-none h-3.5 w-3.5 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              aria-label="Search components"
              className="h-full min-h-0 flex-1 border-0 bg-transparent p-0 text-xs shadow-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 md:text-xs"
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent
        ref={contentRef}
        onPointerDownCapture={(event) => {
          saveSidebarScroll(event.currentTarget.scrollTop);
        }}
        onClickCapture={(event) => {
          saveSidebarScroll(event.currentTarget.scrollTop);
        }}
        onScroll={(event) => {
          saveSidebarScroll(event.currentTarget.scrollTop);
        }}
      >
        <SidebarGroup>
          <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")}>
                  <Link to="/" onClick={saveCurrentSidebarScroll}>
                    Introduction
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Foundations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {foundations.map((f) => (
                <SidebarMenuItem key={f.slug}>
                  <SidebarMenuButton asChild isActive={isActive(`/foundations/${f.slug}`)}>
                    <Link
                      to="/foundations/$token"
                      params={{ token: f.slug }}
                      className="flex items-center gap-2"
                      onClick={saveCurrentSidebarScroll}
                    >
                      <f.icon className="h-3.5 w-3.5" />
                      <span>{f.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {grouped.map((g) => (
          <SidebarGroup key={g.group}>
            <SidebarGroupLabel>{g.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((item) => (
                  <SidebarMenuItem key={isDocsButton(item) ? `__docs-${item.id}__` : item.slug}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        isDocsButton(item)
                          ? isActive(item.to)
                          : isActive(`/components/${item.slug}`)
                      }
                    >
                      {isDocsButton(item) ? (
                        <Link to={item.to} onClick={saveCurrentSidebarScroll}>
                          {item.label}
                        </Link>
                      ) : (
                        <Link
                          to="/components/$slug"
                          params={{ slug: item.slug }}
                          onClick={saveCurrentSidebarScroll}
                        >
                          {item.displayName}
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
