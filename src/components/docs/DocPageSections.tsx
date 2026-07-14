import type { ReactNode } from "react";

import {
  sectionHasDemoMarker,
  type DocSection,
  type DocTocItem,
} from "@/lib/docs/parse-doc";

import { DocSectionStack } from "./DocSectionStack";
import { DocsSection } from "./DocsShell";
import { MarkdownProse } from "./MarkdownProse";

type DemoValue = ReactNode | ReactNode[];

function resolveDemosForSection(
  section: DocSection,
  demos: Record<string, DemoValue>,
  toc?: DocTocItem[],
): DemoValue | undefined {
  if (demos[section.id] !== undefined) return demos[section.id];

  if (!sectionHasDemoMarker(section)) return undefined;

  if (toc) {
    const titleLower = section.title.toLowerCase();
    for (const item of toc) {
      if (demos[item.id] === undefined) continue;
      const labelLower = item.label.toLowerCase();
      if (titleLower.includes(labelLower) || labelLower.includes(titleLower)) {
        return demos[item.id];
      }
    }
  }

  if (import.meta.env.DEV) {
    console.warn(
      `[DocPageSections] Section "${section.title}" (id="${section.id}") has <!-- demo --> but no matching demo. ` +
        `Add {#${section.id}} to the heading or register demos["${section.id}"].`,
    );
  }

  return undefined;
}

function toDemoList(demos: DemoValue | undefined): ReactNode[] {
  if (demos === undefined) return [];
  return Array.isArray(demos) ? demos : [demos];
}

export function DocPageSections({
  sections,
  demos = {},
  toc,
}: {
  sections: DocSection[];
  demos?: Record<string, DemoValue>;
  toc?: DocTocItem[];
}) {
  return (
    <>
      {sections.map((section) => {
        const resolvedDemos = resolveDemosForSection(section, demos, toc);
        const demoList = toDemoList(resolvedDemos);
        const demoSlotCount = section.blocks.filter((b) => b.type === "demo").length;
        const hasBlocks = section.blocks.length > 0;

        if (import.meta.env.DEV && demoSlotCount > 0 && demoList.length !== demoSlotCount) {
          console.warn(
            `[DocPageSections] Section "${section.title}" (id="${section.id}") expects ${demoSlotCount} demo(s) but received ${demoList.length}.`,
          );
        }

        let demoIndex = 0;

        return (
          <DocsSection key={section.id} id={section.id} title={section.title}>
            {hasBlocks ? (
              <DocSectionStack>
                {section.blocks.map((block, blockIndex) => {
                  if (block.type === "prose") {
                    return (
                      <MarkdownProse
                        key={`${section.id}-prose-${blockIndex}`}
                        content={block.content}
                      />
                    );
                  }
                  const node = demoList[demoIndex];
                  demoIndex += 1;
                  return node ? (
                    <div key={`${section.id}-demo-${blockIndex}`} className="doc-demo-slot">
                      {node}
                    </div>
                  ) : null;
                })}
              </DocSectionStack>
            ) : null}
            {!hasBlocks && section.content.trim() ? (
              <MarkdownProse content={section.content} />
            ) : null}
          </DocsSection>
        );
      })}
    </>
  );
}
