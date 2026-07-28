import { CheckCircle2, Sparkles } from "lucide-react";

import { CodeBlock } from "@/components/docs/CodeBlock";
import type { DocSectionCopy } from "@/lib/docs/resource-card-content";

const INSTALL_COMMAND = "node skills/scribe-design-guidance/scripts/install-skill.mjs";

export function OverviewSkillGuidance({ copy }: { copy: DocSectionCopy }) {
  return (
    <section aria-labelledby={copy.id} className="space-y-5">
      <div>
        <h2 id={copy.id} className="text-xl font-semibold tracking-tight text-foreground">
          {copy.title}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {copy.description}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-muted/40 p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-background text-foreground shadow-sm">
              <Sparkles className="h-4 w-4" aria-hidden />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Install once</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Run this from a clone of the Scribe Design System Docs repository. The skill
                installs to your local Codex skills directory, not the Scribe checkout.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <CodeBlock code={INSTALL_COMMAND} language="shell" />
          </div>
        </div>

        <div className="rounded-xl border bg-muted/40 p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-background text-foreground shadow-sm">
              <CheckCircle2 className="h-4 w-4" aria-hidden />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Use it normally</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Ask Codex to create, change, or review Scribe UI as usual. For recognizable Scribe
                UI work, it loads the current published guidance before making design decisions.
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <p>
              For a deterministic check or a vague request, invoke{" "}
              <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs text-foreground">
                $scribe-design-guidance
              </code>
              .
            </p>
            <p>
              Guidance refreshes after updates are committed and pushed to this repository&apos;s{" "}
              <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs text-foreground">
                main
              </code>{" "}
              branch. Reinstallation is not required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
