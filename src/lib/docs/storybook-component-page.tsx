import type { ReactNode } from "react";

import { deriveImportName } from "@/components/docs/component-doc-blocks";
import { DocSectionStack } from "@/components/docs/DocSectionStack";
import { MarkdownProse } from "@/components/docs/MarkdownProse";
import { Badge } from "@/components/ui/badge";
import {
  typographyTokenAnchorId,
  type ComponentTypographySlot,
  type ComponentTypographySpec,
} from "@/data/component-typography-slots";
import { SCRIBE_TYPOGRAPHY_SIZE_TOKENS, appVarToDocCssVar } from "@/data/scribe-color-tokens";
import { useRootCssVar } from "@/hooks/use-root-css-var";
import { formatFontSizeWithCrossUnit } from "@/lib/typography-display";
import type { ComponentDoc, StoryEntry } from "@/lib/storybook";
import { slugify } from "@/lib/storybook";
import type { DocSection, DocTocItem, ParsedDoc } from "@/lib/docs/parse-doc";

const RESERVED_SECTION_IDS = new Set(["overview", "code", "typography"]);

export function storySectionId(storyName: string): string {
  return slugify(storyName);
}

export function storySectionIds(stories: StoryEntry[]): Set<string> {
  return new Set(stories.map((s) => storySectionId(s.name)));
}

export function filterOptionalVaultSections(
  sections: DocSection[],
  storyIds: Set<string>,
  hasTypographySpec: boolean,
): DocSection[] {
  return sections.filter((section) => {
    if (RESERVED_SECTION_IDS.has(section.id)) return false;
    if (storyIds.has(section.id)) return false;
    if (hasTypographySpec && section.id === "typography") return false;
    return section.content.trim().length > 0;
  });
}

export function buildStorybookComponentToc({
  stories,
  optionalSections,
  hasTypographySpec,
  vaultToc,
}: {
  stories: StoryEntry[];
  optionalSections: DocSection[];
  hasTypographySpec: boolean;
  vaultToc?: DocTocItem[];
}): DocTocItem[] {
  if (vaultToc?.length) {
    const allowed = new Set([
      "overview",
      ...stories.map((s) => storySectionId(s.name)),
      ...optionalSections.map((s) => s.id),
      ...(hasTypographySpec ? ["typography"] : []),
      "code",
    ]);
    return vaultToc.filter((item) => allowed.has(item.id));
  }

  const items: DocTocItem[] = [{ id: "overview", label: "Overview" }];
  for (const story of stories) {
    items.push({ id: storySectionId(story.name), label: story.name });
  }
  for (const section of optionalSections) {
    items.push({ id: section.id, label: section.title });
  }
  if (hasTypographySpec) items.push({ id: "typography", label: "Typography" });
  items.push({ id: "code", label: "Code" });
  return items;
}

export function getStorybookPageTitle(component: ComponentDoc, vault?: ParsedDoc | null): string {
  return vault?.frontmatter.title ?? component.displayName;
}

export function getStorybookPageDescription(
  component: ComponentDoc,
  vault?: ParsedDoc | null,
): string {
  if (vault?.frontmatter.description?.trim()) return vault.frontmatter.description.trim();
  const surface = component.group.toLowerCase();
  return `${component.displayName} is part of the Scribe ${surface} library. Use it wherever ${component.displayName.toLowerCase()} patterns appear in product workflows.`;
}

export function getOverviewProse(
  vault: ParsedDoc | null | undefined,
  component: ComponentDoc,
): string {
  const overview = vault?.sections.find((s) => s.id === "overview");
  if (overview?.content.trim()) return overview.content.trim();
  return `${component.displayName} supports common ${component.group.toLowerCase()} patterns in Scribe. Each variant below is a live Storybook preview of how the component renders in production.`;
}

export function buildComponentCodeSnippet(component: ComponentDoc): string {
  const importName = deriveImportName(component.displayName);
  const cleanImportPath = component.importPath
    .replace(/^\.\/src\//, "@/")
    .replace(/\.stories\.tsx?$/, "");

  return `import { ${importName} } from "${cleanImportPath}";

export function Example() {
  return <${importName} />;
}`;
}

export function ComponentCodeBadges({
  importPath,
  storyCount,
}: {
  importPath: string;
  storyCount: number;
}) {
  const cleanImportPath = importPath
    .replace(/^\.\/src\//, "@/")
    .replace(/\.stories\.tsx?$/, "");

  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="font-mono text-xs">
        {cleanImportPath}
      </Badge>
      <Badge variant="secondary" className="text-xs">
        {storyCount} {storyCount === 1 ? "story" : "stories"}
      </Badge>
    </div>
  );
}

export function OptionalVaultSection({ section }: { section: DocSection }) {
  const hasDemo = section.blocks.some((b) => b.type === "demo");
  if (!hasDemo) {
    return <MarkdownProse content={section.content} />;
  }

  return (
    <DocSectionStack>
      {section.blocks.map((block, index) =>
        block.type === "prose" ? (
          <MarkdownProse key={`${section.id}-prose-${index}`} content={block.content} />
        ) : null,
      )}
    </DocSectionStack>
  );
}

export function vaultTypographyProse(vault: ParsedDoc | null | undefined): string | null {
  const section = vault?.sections.find((s) => s.id === "typography");
  if (!section?.content.trim()) return null;
  return section.proseBefore.trim() || section.content.split("<!-- demo -->")[0]?.trim() || null;
}

function ComponentTypographySlotRow({ slot }: { slot: ComponentTypographySlot }) {
  const docVar = appVarToDocCssVar(slot.tokenName);
  const resolved = useRootCssVar(docVar);
  const fallback =
    SCRIBE_TYPOGRAPHY_SIZE_TOKENS.find((t) => t.name === slot.tokenName)?.value ?? "";
  const raw = resolved && resolved !== "—" ? resolved : fallback;
  const formatted = formatFontSizeWithCrossUnit(raw);
  const href = `/foundations/typography#${typographyTokenAnchorId(slot.tokenName)}`;

  return (
    <tr>
      <td className="px-3 py-2 font-medium text-foreground">{slot.label}</td>
      <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
        {slot.element ? <code className="text-foreground">{slot.element}</code> : "—"}
      </td>
      <td className="px-3 py-2 font-mono text-xs">
        <a
          href={href}
          className="text-foreground underline decoration-muted-foreground/50 underline-offset-2 hover:decoration-foreground"
        >
          --{slot.tokenName}
        </a>
        <div className="mt-0.5 text-[10px] text-muted-foreground">--{docVar}</div>
      </td>
      <td className="px-3 py-2 font-mono text-[11px] text-muted-foreground">{formatted}</td>
      <td className="px-3 py-2 text-xs leading-relaxed text-muted-foreground">
        {slot.notes ?? "—"}
      </td>
    </tr>
  );
}

export function ComponentTypographySection({
  typoSpec,
  intro,
}: {
  typoSpec: ComponentTypographySpec;
  intro?: string | null;
}) {
  return (
    <>
      <MarkdownProse
        content={
          intro ??
          "Slots that repeat across this component and the Scribe font-size token each should use. Cross-check the [Font sizes](/foundations/typography#font-sizes) section on the Typography foundations page."
        }
      />
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="border-b bg-muted/40 font-medium text-foreground">
            <tr>
              <th className="px-3 py-2">Slot</th>
              <th className="px-3 py-2">Element</th>
              <th className="px-3 py-2">Token</th>
              <th className="px-3 py-2">Size</th>
              <th className="px-3 py-2">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {typoSpec.slots.map((s) => (
              <ComponentTypographySlotRow key={s.id} slot={s} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
