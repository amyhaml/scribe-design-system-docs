import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Palette, Layers, Component } from "lucide-react";

import { DocPageSections } from "@/components/docs/DocPageSections";
import { DocsShell } from "@/components/docs/DocsShell";
import { MarkdownProse } from "@/components/docs/MarkdownProse";
import { Card } from "@/components/ui/card";
import { getDoc } from "@/lib/docs/load-doc";
import { buildComponentList, storybookIndexQuery } from "@/lib/storybook";

const doc = getDoc("getting-started/introduction");

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
  const { data: index } = useQuery(storybookIndexQuery);
  const count = index ? buildComponentList(index).length : 0;
  const howItWorks = doc.sections.find((s) => s.id === "how-this-site-works");

  return (
    <DocsShell title={doc.frontmatter.title} description={doc.frontmatter.description}>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/foundations/$token" params={{ token: "palette" }}>
          <Card className="group h-full p-6 transition-colors hover:border-foreground/30">
            <Palette className="mb-4 h-5 w-5 text-muted-foreground" />
            <h3 className="text-base font-semibold">Foundations</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Color, typography, spacing, and the rules behind them.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-foreground">
              Explore{" "}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Card>
        </Link>

        <Link to="/components/$slug" params={{ slug: "avatar" }}>
          <Card className="group h-full p-6 transition-colors hover:border-foreground/30">
            <Component className="mb-4 h-5 w-5 text-muted-foreground" />
            <h3 className="text-base font-semibold">Components</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {count > 0 ? `${count} components` : "Live components"} with previews, variants, and
              code.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-foreground">
              Browse{" "}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Card>
        </Link>

        <a
          href="https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library"
          target="_blank"
          rel="noreferrer"
        >
          <Card className="group h-full p-6 transition-colors hover:border-foreground/30">
            <Layers className="mb-4 h-5 w-5 text-muted-foreground" />
            <h3 className="text-base font-semibold">Figma library</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The source of truth for design tokens and component specs.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-foreground">
              Open Figma{" "}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Card>
        </a>
      </section>

      {howItWorks ? (
        <section>
          <h2 className="mb-4 text-xl font-semibold tracking-tight">{howItWorks.title}</h2>
          <MarkdownProse content={howItWorks.content} />
        </section>
      ) : null}
    </DocsShell>
  );
}
