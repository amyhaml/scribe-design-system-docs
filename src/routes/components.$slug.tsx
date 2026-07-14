import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Figma } from "lucide-react";
import { useMemo } from "react";

import { StoryCard } from "@/components/docs/component-doc-blocks";
import { DocSectionStack } from "@/components/docs/DocSectionStack";
import { DocsShell, DocsSection } from "@/components/docs/DocsShell";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { MarkdownProse } from "@/components/docs/MarkdownProse";
import { Button } from "@/components/ui/button";
import { getFigmaUrlForDocSlug } from "@/data/component-figma-links";
import { getTypographySlotsForSlug } from "@/data/component-typography-slots";
import { getStoryLayoutForSlug } from "@/data/component-story-layout";
import { getDocOptional } from "@/lib/docs/load-doc";
import {
  buildComponentCodeSnippet,
  buildStorybookComponentToc,
  ComponentCodeBadges,
  ComponentTypographySection,
  filterOptionalVaultSections,
  getOverviewProse,
  getStorybookPageDescription,
  getStorybookPageTitle,
  OptionalVaultSection,
  storySectionId,
  storySectionIds,
  vaultTypographyProse,
} from "@/lib/docs/storybook-component-page";
import { buildComponentList, storybookIndexQuery } from "@/lib/storybook";

export const Route = createFileRoute("/components/$slug")({
  head: ({ params }) => {
    const vault = getDocOptional(`components/${params.slug}`);
    return {
      meta: [
        {
          title: vault?.frontmatter.title
            ? `${vault.frontmatter.title} — Scribe`
            : `${params.slug} — Scribe`,
        },
        {
          name: "description",
          content:
            vault?.frontmatter.description ?? `Scribe component documentation for ${params.slug}.`,
        },
      ],
    };
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(storybookIndexQuery),
  component: ComponentPage,
});

function ComponentPage() {
  const { slug } = Route.useParams();
  const { data: index } = useQuery(storybookIndexQuery);
  const vault = useMemo(() => getDocOptional(`components/${slug}`), [slug]);
  const figmaUrl = getFigmaUrlForDocSlug(slug);

  const component = useMemo(() => {
    if (!index) return null;
    const all = buildComponentList(index);
    return all.find((c) => c.slug === slug) ?? null;
  }, [index, slug]);

  const typoSpec = useMemo(() => getTypographySlotsForSlug(slug), [slug]);
  const storyLayout = getStoryLayoutForSlug(slug);

  const stories = component?.stories ?? [];
  const storyIds = useMemo(() => storySectionIds(stories), [stories]);

  const optionalSections = useMemo(
    () => filterOptionalVaultSections(vault?.sections ?? [], storyIds, Boolean(typoSpec)),
    [vault, storyIds, typoSpec],
  );

  const toc = useMemo(
    () =>
      buildStorybookComponentToc({
        stories,
        optionalSections,
        hasTypographySpec: Boolean(typoSpec),
        vaultToc: vault?.frontmatter.toc,
      }),
    [stories, optionalSections, typoSpec, vault],
  );

  if (!index) return null;
  if (!component) throw notFound();

  const codeSnippet = buildComponentCodeSnippet(component);
  const typographyIntro = vaultTypographyProse(vault);

  return (
    <DocsShell
      breadcrumbs={
        vault?.frontmatter.breadcrumbs ?? [
          { label: "Components" },
          { label: component.group },
          { label: component.displayName },
        ]
      }
      title={getStorybookPageTitle(component, vault)}
      description={getStorybookPageDescription(component, vault)}
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
      <DocsSection id="overview" title="Overview">
        <MarkdownProse content={getOverviewProse(vault, component)} />
      </DocsSection>

      {stories.map((story) => (
        <DocsSection key={story.id} id={storySectionId(story.name)} title={story.name}>
          <StoryCard
            story={story}
            layout={storyLayout === "row" ? "row" : "stack"}
            componentSlug={slug}
            showTitle={false}
          />
        </DocsSection>
      ))}

      {optionalSections.map((section) => (
        <DocsSection key={section.id} id={section.id} title={section.title}>
          <OptionalVaultSection section={section} />
        </DocsSection>
      ))}

      {typoSpec && (
        <DocsSection id="typography" title="Typography">
          <DocSectionStack>
            <ComponentTypographySection typoSpec={typoSpec} intro={typographyIntro} />
          </DocSectionStack>
        </DocsSection>
      )}

      <DocsSection id="code" title="Code">
        <DocSectionStack>
          <ComponentCodeBadges importPath={component.importPath} storyCount={stories.length} />
          <CodeBlock code={codeSnippet} />
        </DocSectionStack>
      </DocsSection>
    </DocsShell>
  );
}
