import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { FEATHER_ICON_SLUGS } from "@/data/feather-icon-slugs";
import { featherSlugToIcon } from "@/lib/feather-icon-component";
import { cn } from "@/lib/utils";

export function FeatherIconCatalog({ stroke, size }: { stroke: number; size: number }) {
  const [needle, setNeedle] = useState("");

  const filtered = useMemo(() => {
    const q = needle.trim().toLowerCase();
    if (!q) return [...FEATHER_ICON_SLUGS];
    return FEATHER_ICON_SLUGS.filter((s) => s.toLowerCase().includes(q));
  }, [needle]);

  return (
    <div className="space-y-4 rounded-xl border border-border bg-muted/50 p-4 sm:p-6">
      <div className="relative w-full max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={needle}
          onChange={(e) => setNeedle(e.target.value)}
          placeholder="Search icons..."
          className="h-11 border-border bg-background pl-10 shadow-sm"
          aria-label="Search icons"
        />
      </div>

      <p className="text-[11px] leading-snug text-muted-foreground">
        Showing <span className="font-medium text-foreground">{filtered.length}</span> of{" "}
        <span className="font-medium text-foreground">{FEATHER_ICON_SLUGS.length}</span>
        {needle.trim() ? ` matching “${needle.trim()}”` : ""}.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
        {filtered.map((slug) => {
          const Icon = featherSlugToIcon(slug);
          if (!Icon) {
            if (import.meta.env.DEV) {
              return (
                <div
                  key={slug}
                  className="rounded-lg border border-destructive/40 bg-destructive/5 p-2 text-center text-[10px] text-destructive"
                >
                  Missing: {slug}
                </div>
              );
            }
            return null;
          }

          return (
            <div
              key={slug}
              className={cn(
                "flex flex-col items-center rounded-lg border border-border bg-card px-2 py-3 text-center shadow-sm",
              )}
            >
              <div className="flex h-11 w-full items-center justify-center text-foreground">
                <Icon size={size} strokeWidth={stroke} />
              </div>
              <p className="mt-2 font-mono text-[10px] text-muted-foreground">{slug}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
