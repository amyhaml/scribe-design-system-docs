import * as DialogPrimitive from "@radix-ui/react-dialog";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ExternalLink, X } from "lucide-react";
import type { KeyboardEvent, MouseEvent } from "react";
import { useMemo, useState } from "react";

import { DocsShell } from "@/components/docs/DocsShell";
import { Button } from "@/components/ui/button";
import { DOCS_TEMPLATES, TEMPLATE_CATEGORIES } from "@/data/templates";
import { getDoc } from "@/lib/docs/load-doc";
import {
  resolveTemplateGalleryContent,
  type ResolvedDocsTemplate,
} from "@/lib/docs/templates-content";
import { storyIframeSrc, upstreamStorybookStoryUrl } from "@/lib/storybook";
import { cn } from "@/lib/utils";

type TemplatesSearch = {
  preview?: string;
  category?: string;
};

const ENABLE_FEATURE_IFRAME_PREVIEWS =
  import.meta.env.VITE_ENABLE_FEATURE_IFRAME_PREVIEWS === "true";
const templateGallery = resolveTemplateGalleryContent(getDoc("templates"), DOCS_TEMPLATES);

export const Route = createFileRoute("/templates")({
  validateSearch: (search: Record<string, unknown>): TemplatesSearch => ({
    preview: typeof search.preview === "string" ? search.preview : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: `${templateGallery.title} | Scribe Design System` },
      {
        name: "description",
        content: templateGallery.description,
      },
    ],
  }),
  component: TemplatesPage,
});

function TemplateIframe({
  template,
  mode,
}: {
  template: ResolvedDocsTemplate;
  mode: "card" | "modal";
}) {
  const isCard = mode === "card";
  const src =
    template.preview.kind === "storybook"
      ? storyIframeSrc(template.preview.storyId)
      : template.preview.url;

  return (
    <iframe
      src={src}
      title={`${template.title} preview`}
      loading="lazy"
      tabIndex={-1}
      aria-hidden={isCard ? true : undefined}
      className={cn(
        "origin-top-left border-0 bg-white",
        isCard ? "pointer-events-none h-[760px] w-[1240px] scale-[0.42]" : "h-full w-full",
      )}
    />
  );
}

function FeatureUrlPreview({
  template,
  mode,
}: {
  template: ResolvedDocsTemplate;
  mode: "card" | "modal";
}) {
  const isCard = mode === "card";
  const isFeatureUrl = template.preview.kind === "feature-url";

  if (isFeatureUrl && ENABLE_FEATURE_IFRAME_PREVIEWS) {
    return <TemplateIframe template={template} mode={mode} />;
  }

  if (isFeatureUrl && template.preview.image) {
    return (
      <div
        className={cn(
          "h-full w-full overflow-hidden",
          isCard ? "bg-white" : "flex items-center justify-center bg-muted/40",
        )}
      >
        <img
          src={template.preview.image}
          alt=""
          className={cn(
            isCard
              ? "h-full w-full object-cover object-top"
              : "block h-auto w-auto max-h-full max-w-full",
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center bg-muted/40 text-center",
        isCard ? "p-6" : "p-10",
      )}
    >
      <div
        className={cn(
          "rounded-full bg-background px-3 py-1 font-mono text-muted-foreground shadow-sm",
          isCard ? "text-[10px]" : "text-xs",
        )}
      >
        Live Scribe page
      </div>
      <div className={cn("mt-4 font-semibold text-foreground", isCard ? "text-sm" : "text-2xl")}>
        {template.title}
      </div>
      <p
        className={cn(
          "mt-2 max-w-md text-muted-foreground",
          isCard ? "text-xs leading-relaxed" : "text-sm leading-relaxed",
        )}
      >
        This template uses the deployed Scribe page as its source of truth.
        {!ENABLE_FEATURE_IFRAME_PREVIEWS &&
          " Cross-origin iframe previews are disabled because Scribe blocks external framing."}
      </p>
      {!isCard && isFeatureUrl && (
        <Button asChild className="mt-6 rounded-full">
          <a href={template.preview.url} target="_blank" rel="noreferrer">
            Open in Scribe
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      )}
    </div>
  );
}

function TemplatePreviewSurface({
  template,
  mode,
}: {
  template: ResolvedDocsTemplate;
  mode: "card" | "modal";
}) {
  if (template.preview.kind === "storybook") {
    return <TemplateIframe template={template} mode={mode} />;
  }

  return <FeatureUrlPreview template={template} mode={mode} />;
}

function TemplatePreviewCard({
  template,
  onPreview,
}: {
  template: ResolvedDocsTemplate;
  onPreview: (template: ResolvedDocsTemplate) => void;
}) {
  const previewLabel = `Preview ${template.title}`;
  const hasSelectedText = () => Boolean(window.getSelection()?.toString().trim());
  const handleCardClick = () => {
    if (!hasSelectedText()) onPreview(template);
  };
  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    onPreview(template);
  };
  const stopActionPropagation = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <article className="group relative">
      <div
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        className="relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={previewLabel}
      >
        <div
          className="relative block aspect-[1.6] w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-muted/40 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="absolute left-1/2 top-1/2 h-[319px] w-[521px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border bg-white shadow-sm">
            <TemplatePreviewSurface template={template} mode="card" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end rounded-2xl bg-slate-950/0 p-5 opacity-0 transition-all duration-200 group-hover:bg-slate-950/72 group-hover:opacity-100 group-focus-within:bg-slate-950/72 group-focus-within:opacity-100">
          <div className="pointer-events-auto">
            <h2 className="cursor-text select-text text-xl font-semibold text-white">
              {template.title}
            </h2>
            <p className="mt-1 max-w-md cursor-text select-text text-sm leading-relaxed text-white/90">
              {template.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={(event) => {
                  stopActionPropagation(event);
                  onPreview(template);
                }}
                className="inline-flex h-9 cursor-pointer items-center justify-center rounded-full bg-white/18 px-4 text-sm font-medium text-white transition-colors hover:bg-white/26 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Preview
              </button>
              {template.figmaUrl ? (
                <a
                  href={template.figmaUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={stopActionPropagation}
                  className="inline-flex h-9 items-center justify-center rounded-full bg-white/18 px-4 text-sm font-medium text-white transition-colors hover:bg-white/26 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ExternalLink className="mr-2 h-3.5 w-3.5" />
                  View Figma designs
                </a>
              ) : (
                <button
                  type="button"
                  aria-disabled="true"
                  onClick={stopActionPropagation}
                  className="inline-flex h-9 cursor-default items-center justify-center rounded-full bg-white/12 px-4 text-sm font-medium text-white/58"
                >
                  <ExternalLink className="mr-2 h-3.5 w-3.5" />
                  View Figma designs
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm font-medium text-foreground">{template.title}</div>
    </article>
  );
}

function TemplatePreviewDialog({
  template,
  open,
  onOpenChange,
}: {
  template?: ResolvedDocsTemplate;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!template) return null;

  const storybookUrl =
    template.preview.kind === "storybook"
      ? upstreamStorybookStoryUrl(template.preview.storyId)
      : undefined;
  const featureUrl = template.preview.kind === "feature-url" ? template.preview.url : undefined;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="docs-template-preview-overlay fixed inset-0 z-[10000] bg-slate-950/38 backdrop-blur-[2px]" />
        <DialogPrimitive.Content className="docs-template-preview-dialog fixed left-1/2 top-1/2 z-[10001] flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-4rem)] max-w-[88rem] flex-col overflow-hidden rounded-3xl border border-white/70 bg-background p-4 shadow-[0_2px_2px_rgb(0_0_0_/_10%),0_18px_54px_rgb(0_0_0_/_18%)] outline-none">
          <div className="flex items-start justify-between gap-4 px-2 pb-4">
            <div className="min-w-0">
              <DialogPrimitive.Title className="text-xl font-semibold text-foreground">
                {template.title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground">
                {template.description}
              </DialogPrimitive.Description>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {featureUrl && (
                <Button asChild size="sm" className="rounded-full">
                  <a href={featureUrl} target="_blank" rel="noreferrer">
                    Open in Scribe
                  </a>
                </Button>
              )}
              {template.figmaUrl && (
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <a href={template.figmaUrl} target="_blank" rel="noreferrer">
                    Open in Figma
                  </a>
                </Button>
              )}
              {storybookUrl && (
                <Button asChild size="sm" className="rounded-full">
                  <a href={storybookUrl} target="_blank" rel="noreferrer">
                    Open Storybook
                  </a>
                </Button>
              )}
              <DialogPrimitive.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Close preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </DialogPrimitive.Close>
            </div>
          </div>
          <div className="h-[min(824px,calc(100dvh-10rem))] flex-none overflow-hidden rounded-2xl border bg-muted/40">
            <TemplatePreviewSurface template={template} mode="modal" />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function TemplatesPage() {
  const navigate = useNavigate({ from: "/templates" });
  const search = Route.useSearch();
  const [activeCategory, setActiveCategory] = useState(search.category ?? "All");
  const activeTemplate = useMemo(
    () => templateGallery.templates.find((template) => template.id === search.preview),
    [search.preview],
  );
  const visibleTemplates = useMemo(
    () =>
      templateGallery.templates.filter(
        (template) => activeCategory === "All" || template.category === activeCategory,
      ),
    [activeCategory],
  );

  const openPreview = (template: ResolvedDocsTemplate) => {
    void navigate({
      search: (prev) => ({ ...prev, preview: template.id }),
      resetScroll: false,
    });
  };

  const closePreview = () => {
    void navigate({
      search: (prev) => {
        const next = { ...prev };
        delete next.preview;
        return next;
      },
      resetScroll: false,
    });
  };

  return (
    <DocsShell
      title={templateGallery.title}
      description={templateGallery.description}
      headerAlign="center"
    >
      <div className="mx-auto flex flex-wrap justify-center gap-2">
        {TEMPLATE_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setActiveCategory(category);
              void navigate({
                search: (prev) => ({
                  ...prev,
                  category: category === "All" ? undefined : category,
                }),
              });
            }}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-normal text-muted-foreground transition-colors",
              activeCategory === category
                ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                : "docs-global-nav-interactive",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        {visibleTemplates.map((template) => (
          <TemplatePreviewCard key={template.id} template={template} onPreview={openPreview} />
        ))}
      </section>

      <TemplatePreviewDialog
        template={activeTemplate}
        open={Boolean(activeTemplate)}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) closePreview();
        }}
      />
    </DocsShell>
  );
}
