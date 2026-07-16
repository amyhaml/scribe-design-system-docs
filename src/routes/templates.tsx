import { createFileRoute } from "@tanstack/react-router";

import { DocsShell } from "@/components/docs/DocsShell";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates | Scribe Design System" },
      {
        name: "description",
        content: "Reusable Scribe templates for page and workflow patterns.",
      },
    ],
  }),
  component: TemplatesPage,
});

function TemplatesPage() {
  return (
    <DocsShell title="Templates">
      <p className="text-sm text-muted-foreground">Templates will be added here.</p>
    </DocsShell>
  );
}
