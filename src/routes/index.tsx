import { createFileRoute } from "@tanstack/react-router";

import { ComponentOverviewGrid } from "@/components/docs/ComponentOverviewGrid";
import { DocsShell } from "@/components/docs/DocsShell";
import {
  OVERVIEW_RESOURCE_CARD_DEFINITIONS,
  OverviewResourceCards,
} from "@/components/docs/OverviewResourceCards";
import { OverviewSkillGuidance } from "@/components/docs/OverviewSkillGuidance";
import { getDoc } from "@/lib/docs/load-doc";
import { resolveDocSectionCopy, resolveResourceCardCopy } from "@/lib/docs/resource-card-content";
import { storybookIndexQuery } from "@/lib/storybook";

const doc = getDoc("getting-started/overview");
const designGuidance = resolveDocSectionCopy(
  doc,
  "scribe-design-guidance",
  "content/getting-started/overview.md",
);
const resourceCards = resolveResourceCardCopy(
  doc,
  OVERVIEW_RESOURCE_CARD_DEFINITIONS,
  "content/getting-started/overview.md",
  { allowedSectionIds: [designGuidance.id] },
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: doc.frontmatter.title },
      {
        name: "description",
        content:
          doc.frontmatter.description ?? "Foundations, components, and patterns powering Scribe.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(storybookIndexQuery),
  component: IndexPage,
});

function IndexPage() {
  return (
    // Overview is a custom component index; its Markdown sections supply resource-card copy.
    <DocsShell
      title={doc.frontmatter.title}
      description={doc.frontmatter.description}
      headerAlign="center"
    >
      <OverviewSkillGuidance copy={designGuidance} />
      <div className="border-t" aria-hidden />
      <OverviewResourceCards cards={resourceCards} />
      <div className="border-t" aria-hidden />
      <ComponentOverviewGrid />
    </DocsShell>
  );
}
