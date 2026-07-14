import { createFileRoute } from "@tanstack/react-router";
import { Figma } from "lucide-react";

import { DocPageSections } from "@/components/docs/DocPageSections";
import { DocsShell } from "@/components/docs/DocsShell";
import { alertBarDemos } from "@/components/docs/demos/alert-bar-demos";
import { Button } from "@/components/ui/button";
import { getFigmaUrlForDocSlug } from "@/data/component-figma-links";
import { getDoc } from "@/lib/docs/load-doc";
import { getTocFromDoc } from "@/lib/docs/parse-doc";

const doc = getDoc("components/alert-bar");

export const Route = createFileRoute("/components/alert-bar")({
  head: () => ({
    meta: [
      { title: `${doc.frontmatter.title} — Scribe` },
      {
        name: "description",
        content:
          doc.frontmatter.description ??
          "Inline alerts and page banners ported from the Scribe application source.",
      },
    ],
  }),
  component: AlertBarDocsPage,
});

function AlertBarDocsPage() {
  const figmaUrl = getFigmaUrlForDocSlug("alert-bar");

  return (
    <DocsShell
      breadcrumbs={doc.frontmatter.breadcrumbs}
      title={doc.frontmatter.title}
      description={doc.frontmatter.description}
      headerExtra={
        figmaUrl ? (
          <Button asChild variant="ghost" size="sm" className="gap-1.5 font-medium text-sm">
            <a href={figmaUrl} target="_blank" rel="noreferrer">
              <Figma className="shrink-0" aria-hidden />
              Open in Figma
            </a>
          </Button>
        ) : null
      }
      toc={getTocFromDoc(doc)}
    >
      <DocPageSections sections={doc.sections} demos={alertBarDemos} toc={doc.frontmatter.toc} />
    </DocsShell>
  );
}
