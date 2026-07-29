import { Download } from "lucide-react";

import { CodeBlock } from "@/components/docs/CodeBlock";
import type { DocSectionCopy } from "@/lib/docs/resource-card-content";

const INSTALL_COMMAND =
  "npx skills add amyhaml/scribe-design-system-docs --skill scribe-design-guidance";

export function OverviewSkillGuidance({ copy }: { copy: DocSectionCopy }) {
  return (
    <section aria-labelledby={copy.id} className="space-y-5">
      <div>
        <h2 id={copy.id} className="text-xl font-semibold tracking-tight text-foreground">
          {copy.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {copy.description}
        </p>
      </div>

      <div>
        <div className="rounded-xl border bg-muted/40 p-5">
          <div className="flex items-start gap-3">
            <Download className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden />
            <div>
              <h3 className="text-base font-semibold text-foreground">How to install</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Run this from the Scribe repository.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <CodeBlock code={INSTALL_COMMAND} language="shell" />
          </div>
        </div>
      </div>
    </section>
  );
}
