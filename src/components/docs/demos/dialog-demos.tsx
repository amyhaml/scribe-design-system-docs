import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { ScribeDialogPort, ScribePublishDialogPort } from "@/components/scribe";

function DialogDemoFrame({
  children,
  overlay = false,
}: {
  children: ReactNode;
  overlay?: boolean;
}) {
  return (
    <div className="scribe-app-css-vars">
      <div className="scribe-dialog-demo-frame" data-overlay={overlay ? "true" : undefined}>
        {children}
      </div>
    </div>
  );
}

function DialogDemoItem({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div>
      <div className="scribe-dialog-demo-label">{label}</div>
      {children}
    </div>
  );
}

export const dialogDemos = {
  "confirmation-dialogs": (
    <DialogDemoFrame overlay>
      <div className="scribe-dialog-demo-grid">
        <DialogDemoItem label="Unsaved changes">
          <ScribeDialogPort
            compactMode
            buttons={[
              { label: "NO", background: "transparent" },
              { label: "YES" },
            ]}
          >
            You have unsaved changes, would you like to save before leaving?
          </ScribeDialogPort>
        </DialogDemoItem>
        <DialogDemoItem label="Destructive confirmation">
          <ScribeDialogPort
            compactMode
            buttons={[
              { label: "CANCEL", background: "transparent" },
              { label: "DELETE", background: "var(--delete)" },
            ]}
          >
            Deleting is permanent and will remove this content from your site.
          </ScribeDialogPort>
        </DialogDemoItem>
      </div>
    </DialogDemoFrame>
  ),
  "publishing-dialogs": (
    <DialogDemoFrame>
      <div className="scribe-dialog-demo-grid">
        <DialogDemoItem label="Publish now">
          <ScribePublishDialogPort variant="publish-now" />
        </DialogDemoItem>
        <DialogDemoItem label="Schedule">
          <ScribePublishDialogPort variant="schedule-empty" />
        </DialogDemoItem>
        <DialogDemoItem label="Schedule filled">
          <ScribePublishDialogPort variant="schedule-filled" />
        </DialogDemoItem>
        <DialogDemoItem label="Unpublish">
          <ScribePublishDialogPort variant="unpublish" />
        </DialogDemoItem>
        <DialogDemoItem label="Archive">
          <ScribePublishDialogPort variant="archive" />
        </DialogDemoItem>
        <DialogDemoItem label="Delete">
          <ScribePublishDialogPort variant="delete" />
        </DialogDemoItem>
      </div>
    </DialogDemoFrame>
  ),
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/Dialog/Dialog.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/apps/scribe/src/modals/LegacyModal.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/PublishPanel/*
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/data/toolbar.ts
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Production dialog and publishing-panel ports with fixture data
      </Badge>
    </div>
  ),
};
