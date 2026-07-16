import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { buildDocsSearchGroups, type DocsSearchItem } from "@/lib/docs/navigation";
import type { StorybookIndex } from "@/lib/storybook";

const GITHUB_REPO_URL = "https://github.com/Media-Platforms/scribe";
const FIGMA_LIBRARY_URL =
  "https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library?node-id=0-1&p=f&t=qxkyYWkYPUXaJ9Gg-0";

function AstryxSearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function AstryxGithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.59 2 12.253c0 4.532 2.865 8.374 6.839 9.731.5.095.682-.222.682-.494 0-.244-.009-1.055-.014-1.915-2.782.62-3.369-1.217-3.369-1.217-.455-1.185-1.11-1.5-1.11-1.5-.908-.637.069-.624.069-.624 1.004.072 1.532 1.057 1.532 1.057.892 1.568 2.34 1.115 2.91.853.091-.663.35-1.115.636-1.372-2.221-.259-4.556-1.139-4.556-5.067 0-1.119.39-2.034 1.03-2.751-.103-.26-.446-1.302.098-2.713 0 0 .84-.276 2.75 1.051A9.423 9.423 0 0 1 12 6.946a9.42 9.42 0 0 1 2.504.346c1.91-1.327 2.748-1.05 2.748-1.05.546 1.41.203 2.452.1 2.712.64.717 1.028 1.632 1.028 2.751 0 3.938-2.338 4.805-4.566 5.059.359.317.679.943.679 1.901 0 1.372-.013 2.478-.013 2.815 0 .274.18.594.688.493C19.138 20.613 22 16.773 22 12.253 22 6.59 17.523 2 12 2Z"
      />
    </svg>
  );
}

function FigmaLibraryIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5Z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2Z" />
      <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9Z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5Z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0Z" />
    </svg>
  );
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

function ShortcutKey({ children }: { children: string }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-slate-200/80 px-1.5 text-[11px] font-medium leading-none text-muted-foreground shadow-[inset_0_-2px_0_rgba(15,23,42,0.16),0_1px_1px_rgba(15,23,42,0.06)]">
      {children}
    </kbd>
  );
}

function DocsTopNavButton({
  label,
  children,
  className,
  onClick,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          onClick={onClick}
          className={cn(
            "docs-global-nav-interactive inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2",
            className,
          )}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="rounded-full bg-slate-950 px-3 py-1.5 text-xs text-white">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

function DocsSearchDialog({
  open,
  onOpenChange,
  storybookIndex,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storybookIndex: StorybookIndex;
}) {
  const navigate = useNavigate();
  const groups = useMemo(() => buildDocsSearchGroups(storybookIndex), [storybookIndex]);

  const navigateToItem = (item: DocsSearchItem) => {
    onOpenChange(false);
    window.requestAnimationFrame(() => {
      if (item.route.kind === "home") {
        void navigate({ to: "/" });
        return;
      }

      if (item.route.kind === "templates") {
        void navigate({ to: "/templates" });
        return;
      }

      if (item.route.kind === "foundation") {
        void navigate({ to: "/foundations/$token", params: { token: item.route.token } });
        return;
      }

      void navigate({ to: "/components/$slug", params: { slug: item.route.slug } });
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Docs demos preserve production z-index values, so global search must sit above page content. */}
        <DialogPrimitive.Overlay
          className="docs-search-overlay fixed inset-0 z-[10000] backdrop-blur-[2px]"
          style={{ backgroundColor: "light-dark(#01122866, #11111299)" }}
        />
        <DialogPrimitive.Content className="docs-search-dialog-content fixed left-1/2 top-1/2 z-[10001] flex max-h-[min(80vh,42rem)] w-[calc(100vw-2rem)] max-w-[40rem] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 outline-none">
          <DialogPrimitive.Title className="sr-only">Search documentation</DialogPrimitive.Title>
          <Command
            className="min-h-0 rounded-none bg-white text-slate-950"
            shouldFilter
            loop
          >
            <CommandInput
              autoFocus
              placeholder="Search..."
              className="h-12 text-sm text-slate-950 placeholder:text-slate-500"
            />
            <CommandList className="max-h-[min(58vh,25rem)] min-h-[18rem] overflow-y-auto overflow-x-hidden px-2 py-2">
              <CommandEmpty>No results found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup
                  key={group.group}
                  heading={group.group}
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={[item.label, item.group, ...item.keywords].join(" ")}
                      onSelect={() => navigateToItem(item)}
                      className="h-[37px] cursor-pointer rounded-lg px-3 text-sm text-slate-950 data-[selected=true]:bg-slate-100 data-[selected=true]:text-slate-950"
                    >
                      <span className="truncate">{item.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <div className="flex h-10 flex-wrap items-center gap-3 border-t border-slate-200 bg-slate-50 px-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShortcutKey>↑</ShortcutKey>
                <ShortcutKey>↓</ShortcutKey>
                Navigate
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShortcutKey>↵</ShortcutKey>
                Select
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShortcutKey>Esc</ShortcutKey>
                Close
              </span>
            </div>
          </Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}

export function DocsGlobalNav({ storybookIndex }: { storybookIndex: StorybookIndex }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const componentsActive =
    pathname === "/" || pathname.startsWith("/components") || pathname.startsWith("/foundations");
  const templatesActive = pathname === "/templates";

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isCommandK = event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);
      const isSlash = event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey;

      if (isCommandK || (isSlash && !isEditableTarget(event.target))) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <TooltipProvider delayDuration={100}>
      <header className="docs-global-nav sticky top-0 z-40">
        <span
          className="docs-global-nav-glass backdrop-blur-[18px] backdrop-saturate-[1.15]"
          aria-hidden="true"
        />
        <div className="relative z-[1] grid h-[52px] w-full grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-10">
          <nav
            aria-label="Primary documentation navigation"
            className="col-start-2 flex items-center gap-1 text-sm"
          >
            <Link
              to="/"
              aria-current={componentsActive ? "page" : undefined}
              className={cn(
                "docs-global-nav-interactive rounded-md px-3 py-1.5 font-normal text-muted-foreground transition-colors",
                componentsActive && "font-medium text-foreground",
              )}
            >
              Components
            </Link>
            <Link
              to="/templates"
              aria-current={templatesActive ? "page" : undefined}
              className={cn(
                "docs-global-nav-interactive rounded-md px-3 py-1.5 font-normal text-muted-foreground transition-colors",
                templatesActive && "font-medium text-foreground",
              )}
            >
              Templates
            </Link>
          </nav>
          <nav
            aria-label="Documentation actions"
            className="col-start-3 flex items-center gap-1 justify-self-end"
          >
            <DocsTopNavButton label="Search" onClick={() => setSearchOpen(true)}>
              <AstryxSearchIcon className="h-5 w-5" />
            </DocsTopNavButton>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={FIGMA_LIBRARY_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Scribe Figma component library"
                  className="docs-global-nav-interactive inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                >
                  <FigmaLibraryIcon className="h-5 w-5" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="rounded-full bg-slate-950 px-3 py-1.5 text-xs text-white">
                Figma library
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Scribe GitHub repository"
                  className="docs-global-nav-interactive inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                >
                  <AstryxGithubIcon className="h-5 w-5" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="rounded-full bg-slate-950 px-3 py-1.5 text-xs text-white">
                GitHub
              </TooltipContent>
            </Tooltip>
          </nav>
        </div>
      </header>
      <DocsSearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        storybookIndex={storybookIndex}
      />
    </TooltipProvider>
  );
}
