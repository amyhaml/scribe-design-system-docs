import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Figma } from "lucide-react";

import { DocPageSections } from "@/components/docs/DocPageSections";
import { DocsShell } from "@/components/docs/DocsShell";
import { buttonDemos } from "@/components/docs/demos/button-demos";
import { Button } from "@/components/ui/button";
import { getFigmaUrlForDocSlug } from "@/data/component-figma-links";
import { getTypographySlotsForSlug } from "@/data/component-typography-slots";
import { getDoc } from "@/lib/docs/load-doc";
import { getTocFromDoc } from "@/lib/docs/parse-doc";

const doc = getDoc("components/button");

export const Route = createFileRoute("/components/button")({
  head: () => ({
    meta: [
      { title: `${doc.frontmatter.title} — Scribe` },
      {
        name: "description",
        content:
          doc.frontmatter.description ??
          "Scribe product Button from @scribe/toolkit — styles and toolbar wiring match the application source.",
      },
    ],
  }),
  component: ButtonDocsPage,
});

function ButtonDocsPage() {
  const figmaUrl = getFigmaUrlForDocSlug("button");
  const typoSpec = useMemo(() => getTypographySlotsForSlug("button"), []);

  const sections = useMemo(
    () => (typoSpec ? doc.sections : doc.sections.filter((s) => s.id !== "typography")),
    [typoSpec],
  );

  const toc = useMemo(() => {
    const items = getTocFromDoc(doc);
    return typoSpec ? items : items.filter((t) => t.id !== "typography");
  }, [typoSpec]);

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
      <DocPageSections sections={sections} demos={buttonDemos} toc={doc.frontmatter.toc} />
    </DocsShell>
  );
}
