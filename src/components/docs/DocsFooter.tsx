import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { ScribeLogoWideBlack } from "@/components/brand/ScribeLogo";
import {
  AstryxGithubIcon,
  FIGMA_LIBRARY_URL,
  FigmaLibraryIcon,
  GITHUB_REPO_URL,
} from "@/components/docs/DocsTopNav";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SCRIBE_FEATURE_URL = "https://scribe.kubefeature.hearstapps.net/creation/content";
const SCRIBE_REPO_URL = "https://github.com/Media-Platforms/scribe";

function FooterIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="docs-global-nav-interactive inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
        >
          {children}
        </a>
      </TooltipTrigger>
      <TooltipContent side="top" className="rounded-full bg-slate-950 px-3 py-1.5 text-xs text-white">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export function DocsFooter() {
  return (
    <footer className="mt-auto bg-background px-10 pb-6 pt-[100px]">
      <div className="grid w-full gap-5 border-t border-border/80 pt-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <Link to="/" aria-label="Scribe Design System home" className="inline-flex w-fit">
            <ScribeLogoWideBlack className="h-6 [&_*]:!fill-current" />
          </Link>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground lg:justify-center"
        >
          <Link to="/" className="hover:underline">
            Components
          </Link>
          <Link to="/templates" className="hover:underline">
            Templates
          </Link>
          <a
            href={SCRIBE_FEATURE_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Scribe feature
          </a>
          <a
            href={SCRIBE_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Scribe repo
          </a>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Docs repo
          </a>
        </nav>

        <TooltipProvider delayDuration={100}>
          <nav
            aria-label="Footer external links"
            className="flex items-center gap-1 text-xs text-muted-foreground lg:justify-self-end"
          >
            <span className="mr-3">©2026 MediaOS</span>
            <FooterIconLink href={FIGMA_LIBRARY_URL} label="Figma library">
              <FigmaLibraryIcon className="h-5 w-5" />
            </FooterIconLink>
            <FooterIconLink href={GITHUB_REPO_URL} label="Docs repo">
              <AstryxGithubIcon className="h-5 w-5" />
            </FooterIconLink>
          </nav>
        </TooltipProvider>
      </div>
    </footer>
  );
}
