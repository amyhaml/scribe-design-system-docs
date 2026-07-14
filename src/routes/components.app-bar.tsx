import { createFileRoute } from "@tanstack/react-router";
import { Figma } from "lucide-react";

import { DocPageSections } from "@/components/docs/DocPageSections";
import { DocsShell } from "@/components/docs/DocsShell";
import { appBarDemos } from "@/components/docs/demos/app-bar-demos";
import { Button } from "@/components/ui/button";
import { getFigmaUrlForDocSlug } from "@/data/component-figma-links";
import { getDoc } from "@/lib/docs/load-doc";
import { getTocFromDoc } from "@/lib/docs/parse-doc";

const doc = getDoc("components/app-bar");
const toc = getTocFromDoc(doc);

export const Route = createFileRoute("/components/app-bar")({
  head: () => ({
    meta: [
      { title: `${doc.frontmatter.title} - Scribe` },
      {
        name: "description",
        content:
          doc.frontmatter.description ??
          "Scribe App Bar documentation for nav, listing, and content page header patterns.",
      },
    ],
  }),
  component: AppBarDocsPage,
});

function AppBarDocsPage() {
  const figmaUrl = getFigmaUrlForDocSlug("app-bar");

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
      toc={toc}
    >
      <DocPageSections sections={doc.sections} demos={appBarDemos} toc={doc.frontmatter.toc} />
    </DocsShell>
  );
}
