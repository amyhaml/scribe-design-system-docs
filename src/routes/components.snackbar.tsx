import { createFileRoute } from "@tanstack/react-router";
import { Figma } from "lucide-react";

import { DocPageSections } from "@/components/docs/DocPageSections";
import { DocsShell } from "@/components/docs/DocsShell";
import { snackbarDemos } from "@/components/docs/demos/snackbar-demos";
import { Button } from "@/components/ui/button";
import { getFigmaUrlForDocSlug } from "@/data/component-figma-links";
import { getDoc } from "@/lib/docs/load-doc";
import { getTocFromDoc } from "@/lib/docs/parse-doc";

const doc = getDoc("components/snackbar");
const toc = getTocFromDoc(doc);

export const Route = createFileRoute("/components/snackbar")({
  head: () => ({
    meta: [
      { title: `${doc.frontmatter.title} - Scribe` },
      {
        name: "description",
        content:
          doc.frontmatter.description ??
          "Scribe Snackbar documentation for success and error notification states.",
      },
    ],
  }),
  component: SnackbarDocsPage,
});

function SnackbarDocsPage() {
  const figmaUrl = getFigmaUrlForDocSlug("snackbar");

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
      <DocPageSections sections={doc.sections} demos={snackbarDemos} toc={doc.frontmatter.toc} />
    </DocsShell>
  );
}
