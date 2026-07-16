import { Link, getRouteApi, useRouterState } from "@tanstack/react-router";
import { useLayoutEffect, useMemo, useRef, useState, type ComponentType } from "react";
import {
  Search,
  Palette,
  Droplets,
  Type,
  Ruler,
  Square,
  Layers,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

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
import {
  FOUNDATION_NAV_ENTRIES,
  getSidebarComponentGroups,
  isDocsNavEntry,
  type FoundationSlug,
} from "@/lib/docs/navigation";

const rootRoute = getRouteApi("__root__");

const SIDEBAR_SCROLL_STORAGE_KEY = "scribe-docs-sidebar-scroll-top";

type FoundationIcon = LucideIcon | ComponentType<{ className?: string }>;

function ScribeLetterSidebarIcon({ className }: { className?: string }) {
  return (
    <span
      className={className}
      style={{
        backgroundColor: "currentColor",
        WebkitMask: "url('/brand/logo-letter-icon.svg') center / contain no-repeat",
        mask: "url('/brand/logo-letter-icon.svg') center / contain no-repeat",
      }}
      aria-hidden
    />
  );
}

const foundationIcons: Record<FoundationSlug, FoundationIcon> = {
  palette: Palette,
  color: Droplets,
  typography: Type,
  spacing: Ruler,
  radius: Square,
  elevation: Layers,
  icons: Sparkles,
  logo: ScribeLetterSidebarIcon,
};

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
    return getSidebarComponentGroups(storybookIndex, query);
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
                    Overview
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
              {FOUNDATION_NAV_ENTRIES.map((f) => {
                const Icon = foundationIcons[f.slug];

                return (
                  <SidebarMenuItem key={f.slug}>
                    <SidebarMenuButton asChild isActive={isActive(`/foundations/${f.slug}`)}>
                      <Link
                        to="/foundations/$token"
                        params={{ token: f.slug }}
                        className="flex items-center gap-2"
                        onClick={saveCurrentSidebarScroll}
                      >
                        <Icon className={f.slug === "logo" ? "h-[18px] w-[18px]" : "h-3.5 w-3.5"} />
                        <span>{f.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {grouped.map((g) => (
          <SidebarGroup key={g.group}>
            <SidebarGroupLabel>{g.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((item) => (
                  <SidebarMenuItem key={isDocsNavEntry(item) ? `__docs-${item.id}__` : item.slug}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        isDocsNavEntry(item)
                          ? isActive(item.path)
                          : isActive(`/components/${item.slug}`)
                      }
                    >
                      {isDocsNavEntry(item) ? (
                        <Link
                          to="/components/$slug"
                          params={{ slug: item.id }}
                          onClick={saveCurrentSidebarScroll}
                        >
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
