import { createFileRoute } from "@tanstack/react-router";
import { Figma } from "lucide-react";

import { DocPageSections } from "@/components/docs/DocPageSections";
import { DocsShell } from "@/components/docs/DocsShell";
import { tabbedLayoutDemos } from "@/components/docs/demos/tabbed-layout-demos";
import { Button } from "@/components/ui/button";
import { getFigmaUrlForDocSlug } from "@/data/component-figma-links";
import { getDoc } from "@/lib/docs/load-doc";
import { getTocFromDoc } from "@/lib/docs/parse-doc";

const doc = getDoc("components/tabbed-layout");
const toc = getTocFromDoc(doc);

export const Route = createFileRoute("/components/tabbed-layout")({
  head: () => ({
    meta: [
      { title: `${doc.frontmatter.title} - Scribe` },
      {
        name: "description",
        content:
          doc.frontmatter.description ??
          "Scribe Tabs documentation for source-backed TabbedLayout states.",
      },
    ],
  }),
  component: TabbedLayoutDocsPage,
});

function TabbedLayoutDocsPage() {
  const figmaUrl = getFigmaUrlForDocSlug("tabbed-layout");

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
      <DocPageSections
        sections={doc.sections}
        demos={tabbedLayoutDemos}
        toc={doc.frontmatter.toc}
      />
    </DocsShell>
  );
}
