import { useState } from "react";
import { ExternalLink, Figma, Maximize2, Monitor, Smartphone, Tablet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { storyIframeSrc, STORYBOOK_PROXY_BASE } from "@/lib/storybook";
import { cn } from "@/lib/utils";

type Viewport = "mobile" | "tablet" | "desktop";

const VIEWPORTS: Record<Viewport, { width: string; icon: typeof Monitor; label: string }> = {
  mobile: { width: "375px", icon: Smartphone, label: "Mobile" },
  tablet: { width: "768px", icon: Tablet, label: "Tablet" },
  desktop: { width: "100%", icon: Monitor, label: "Desktop" },
};

const DEFAULT_HEIGHT = 420;
const COMPACT_DEFAULT_HEIGHT = 220;

export function StoryFrame({
  storyId,
  height,
  variant = "default",
  className,
  figmaUrl,
}: {
  storyId: string;
  height?: number;
  /** `compact`: smaller chrome + iframe area for horizontal “showcase” rows */
  variant?: "default" | "compact";
  className?: string;
  /** When set (from `getFigmaUrlForDocSlug`), shows "Open in Figma" beside Storybook. */
  figmaUrl?: string;
}) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const src = storyIframeSrc(storyId);
  const v = VIEWPORTS[viewport];
  const isCompact = variant === "compact";
  const frameHeight =
    height !== undefined ? height : isCompact ? COMPACT_DEFAULT_HEIGHT : DEFAULT_HEIGHT;

  return (
    <div className={cn("overflow-hidden rounded-lg border bg-card", className)}>
      <div
        className={cn(
          "flex items-center justify-between gap-2 border-b bg-muted/30 px-3",
          isCompact ? "py-1.5" : "py-2",
        )}
      >
        <div className="flex items-center gap-1">
          {(Object.keys(VIEWPORTS) as Viewport[]).map((key) => {
            const Icon = VIEWPORTS[key].icon;
            return (
              <Button
                key={key}
                variant="ghost"
                size="sm"
                aria-label={VIEWPORTS[key].label}
                className={cn(
                  isCompact ? "h-6 w-6 p-0" : "h-7 w-7 p-0",
                  viewport === key && "bg-accent text-accent-foreground",
                )}
                onClick={() => setViewport(key)}
              >
                <Icon className={cn(isCompact ? "h-3 w-3" : "h-3.5 w-3.5")} />
              </Button>
            );
          })}
        </div>
        <div className="flex items-center gap-1">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn("gap-1 px-2 text-xs", isCompact ? "h-6" : "h-7")}
          >
            <a
              href={`${STORYBOOK_PROXY_BASE}/iframe.html?id=${storyId}&viewMode=story`}
              target="_blank"
              rel="noreferrer"
            >
              <Maximize2 className="h-3 w-3" />
              Open
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn("gap-1 px-2 text-xs", isCompact ? "h-6" : "h-7")}
          >
            <a
              href={`https://scribe.kubefeature.hearstapps.net/storybook/?path=/story/${storyId}`}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink className="h-3 w-3" />
              Storybook
            </a>
          </Button>
          {figmaUrl ? (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className={cn("gap-1 px-2 text-xs", isCompact ? "h-6" : "h-7")}
            >
              <a href={figmaUrl} target="_blank" rel="noreferrer">
                <Figma className="h-3 w-3" />
                Open in Figma
              </a>
            </Button>
          ) : null}
        </div>
      </div>
      <div
        className={cn(
          "flex justify-center bg-[oklch(0.985_0_0)] dark:bg-[oklch(0.18_0_0)]",
          isCompact ? "p-2" : "p-4",
        )}
      >
        <iframe
          key={storyId + viewport}
          src={src}
          title={storyId}
          loading="lazy"
          style={{
            width: v.width,
            height: frameHeight,
            maxWidth: isCompact ? "min(100%, 400px)" : undefined,
          }}
          className="max-w-full rounded border bg-white shadow-sm transition-all"
        />
      </div>
    </div>
  );
}
