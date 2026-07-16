import { createFileRoute } from "@tanstack/react-router";

import { ComponentOverviewGrid } from "@/components/docs/ComponentOverviewGrid";
import { DocsShell } from "@/components/docs/DocsShell";
import { OverviewResourceCards } from "@/components/docs/OverviewResourceCards";
import { getDoc } from "@/lib/docs/load-doc";
import { storybookIndexQuery } from "@/lib/storybook";

const doc = getDoc("getting-started/overview");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: doc.frontmatter.title },
      {
        name: "description",
        content: doc.frontmatter.description ?? "Foundations, components, and patterns powering Scribe.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(storybookIndexQuery),
  component: IndexPage,
});

function IndexPage() {
  return (
    // Overview is a custom component index, so `content/getting-started/overview.md`
    // intentionally stays frontmatter-only instead of supplying markdown sections.
    <DocsShell
      title={doc.frontmatter.title}
      description={doc.frontmatter.description}
      headerAlign="center"
    >
      <OverviewResourceCards />
      <div className="border-t" aria-hidden />
      <ComponentOverviewGrid />
    </DocsShell>
  );
}
