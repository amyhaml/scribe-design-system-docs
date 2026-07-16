import { createFileRoute } from "@tanstack/react-router";
import { Figma } from "lucide-react";

import { DocPageSections } from "@/components/docs/DocPageSections";
import { DocsShell } from "@/components/docs/DocsShell";
import { switchDemos } from "@/components/docs/demos/switch-demos";
import { Button } from "@/components/ui/button";
import { getFigmaUrlForDocSlug } from "@/data/component-figma-links";
import { getDoc } from "@/lib/docs/load-doc";
import { getTocFromDoc } from "@/lib/docs/parse-doc";

const doc = getDoc("components/switch");
const toc = getTocFromDoc(doc);

export const Route = createFileRoute("/components/switch")({
  head: () => ({
    meta: [
      { title: `${doc.frontmatter.title} - Scribe` },
      {
        name: "description",
        content:
          doc.frontmatter.description ??
          "Scribe Switch documentation for source-backed Toggle states.",
      },
    ],
  }),
  component: SwitchDocsPage,
});

function SwitchDocsPage() {
  const figmaUrl = getFigmaUrlForDocSlug("switch");

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
      <DocPageSections sections={doc.sections} demos={switchDemos} toc={doc.frontmatter.toc} />
    </DocsShell>
  );
}
