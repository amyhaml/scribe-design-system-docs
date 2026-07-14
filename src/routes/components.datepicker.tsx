import { createFileRoute } from "@tanstack/react-router";

import { DocPageSections } from "@/components/docs/DocPageSections";
import { DocsShell } from "@/components/docs/DocsShell";
import { datepickerDemos } from "@/components/docs/demos/datepicker-demos";
import { getDoc } from "@/lib/docs/load-doc";
import { getTocFromDoc } from "@/lib/docs/parse-doc";

const doc = getDoc("components/datepicker");
const toc = getTocFromDoc(doc);

export const Route = createFileRoute("/components/datepicker")({
  head: () => ({
    meta: [
      { title: `${doc.frontmatter.title} - Scribe` },
      {
        name: "description",
        content:
          doc.frontmatter.description ??
          "Scribe Datepicker documentation for date selection fields.",
      },
    ],
  }),
  component: DatepickerDocsPage,
});

function DatepickerDocsPage() {
  return (
    <DocsShell
      breadcrumbs={doc.frontmatter.breadcrumbs}
      title={doc.frontmatter.title}
      description={doc.frontmatter.description}
      toc={toc}
    >
      <DocPageSections sections={doc.sections} demos={datepickerDemos} toc={doc.frontmatter.toc} />
    </DocsShell>
  );
}
