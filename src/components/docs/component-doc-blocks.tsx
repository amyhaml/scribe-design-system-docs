import { StoryFrame } from "@/components/docs/StoryFrame";
import type { StoryEntry } from "@/lib/storybook";
import { getFigmaUrlForDocSlug } from "@/data/component-figma-links";
import { cn } from "@/lib/utils";

export function deriveImportName(displayName: string): string {
  return displayName.replace(/[^a-zA-Z0-9]/g, "");
}

/** Stable fragment id for in-page links (sanitizes Storybook story id). */
export function storyAnchorId(storyId: string): string {
  return `story-${storyId.replace(/[^a-zA-Z0-9-]/g, "-")}`;
}

export function StoryCard({
  story,
  layout,
  componentSlug,
  showTitle = true,
}: {
  story: StoryEntry;
  layout: "stack" | "row";
  /** Same as `/components/$slug` — used to resolve optional Figma deep link. */
  componentSlug: string;
  showTitle?: boolean;
}) {
  const isRow = layout === "row";
  const figmaUrl = getFigmaUrlForDocSlug(componentSlug);
  return (
    <div
      id={storyAnchorId(story.id)}
      className={cn(
        "scroll-mt-20",
        isRow ? "flex min-w-[260px] max-w-md flex-1 flex-col gap-2" : "space-y-3",
      )}
    >
      {showTitle && (
        <h3
          className={
            isRow
              ? "text-xs font-semibold text-foreground"
              : "text-base font-semibold text-foreground"
          }
        >
          {story.name}
        </h3>
      )}
      <StoryFrame storyId={story.id} variant={isRow ? "compact" : "default"} figmaUrl={figmaUrl} />
    </div>
  );
}
