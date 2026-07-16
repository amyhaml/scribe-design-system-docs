import { createFileRoute } from "@tanstack/react-router";
import { Figma } from "lucide-react";

import { DocPageSections } from "@/components/docs/DocPageSections";
import { DocsShell } from "@/components/docs/DocsShell";
import { tableDemos } from "@/components/docs/demos/table-demos";
import { Button } from "@/components/ui/button";
import { getFigmaUrlForDocSlug } from "@/data/component-figma-links";
import { getDoc } from "@/lib/docs/load-doc";
import { getTocFromDoc } from "@/lib/docs/parse-doc";

const doc = getDoc("components/table");
const toc = getTocFromDoc(doc);

export const Route = createFileRoute("/components/table")({
  head: () => ({
    meta: [
      { title: `${doc.frontmatter.title} - Scribe` },
      {
        name: "description",
        content:
          doc.frontmatter.description ??
          "Scribe Table documentation for row and headered table layouts.",
      },
    ],
  }),
  component: TableDocsPage,
});

function TableDocsPage() {
  const figmaUrl = getFigmaUrlForDocSlug("table");

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
      <DocPageSections sections={doc.sections} demos={tableDemos} toc={doc.frontmatter.toc} />
    </DocsShell>
  );
}
