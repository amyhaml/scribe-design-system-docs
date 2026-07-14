import { useState } from "react";

import { FeatherIconCatalog } from "@/components/docs/FeatherIconCatalog";
import { Button } from "@/components/ui/button";

const ICON_SIZE_PX = 24;
const STROKE_OPTIONS = [1.5, 2] as const;

export function ScribeIconsGallery() {
  const [stroke, setStroke] = useState<(typeof STROKE_OPTIONS)[number]>(2);

  return (
    <div className="space-y-4">
      <section id="icon-usage" className="scroll-mt-20 space-y-3 mb-[40px]">
        <h2 className="text-base font-semibold text-foreground">Usage</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[36rem] table-fixed border-collapse text-sm">
            <colgroup>
              <col style={{ width: "14%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "10%" }} />
              <col />
            </colgroup>
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="p-3 pl-4 font-medium">Prop</th>
                <th className="p-3 font-medium">Type</th>
                <th className="p-3 font-medium">Default</th>
                <th className="p-3 pr-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 pl-4 align-top font-mono text-xs text-foreground">
                  <code>size</code>
                </td>
                <td className="p-3 align-top font-mono text-xs text-muted-foreground">
                  <code>number</code>
                </td>
                <td className="p-3 align-top font-mono text-xs tabular-nums text-muted-foreground">
                  24
                </td>
                <td className="p-3 pr-4 align-top text-sm leading-snug text-muted-foreground">
                  Icon dimensions in px (square).
                </td>
              </tr>
              <tr>
                <td className="p-3 pl-4 align-top font-mono text-xs text-foreground">
                  <code>strokeWidth</code>
                </td>
                <td className="p-3 align-top font-mono text-xs text-muted-foreground">
                  <code>number</code>
                </td>
                <td className="p-3 align-top font-mono text-xs tabular-nums text-muted-foreground">
                  2
                </td>
                <td className="p-3 pr-4 align-top text-sm leading-snug text-muted-foreground">
                  Lucide stroke width — use 1.5 for finer UI, 2 by default.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div id="feather-preview" className="scroll-mt-20 flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-foreground">Stroke width</span>
        <div className="inline-flex gap-2">
          {STROKE_OPTIONS.map((w) => (
            <Button
              key={w}
              type="button"
              variant={stroke === w ? "default" : "outline"}
              size="sm"
              className="min-w-[4.5rem]"
              onClick={() => setStroke(w)}
              aria-pressed={stroke === w}
            >
              {w}px
            </Button>
          ))}
        </div>
      </div>

      <section id="feather-icon-catalog" className="scroll-mt-20">
        <FeatherIconCatalog stroke={stroke} size={ICON_SIZE_PX} />
      </section>
    </div>
  );
}
