import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  ScribeAssetBarPort,
  ScribeAssetBarSelectionActions,
  ToolkitButton,
} from "@/components/scribe";

function AssetBarDemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="scribe-app-css-vars">
      <div className="scribe-asset-bar-demo-frame">{children}</div>
    </div>
  );
}

export const assetBarDemos = {
  "default-actions": (
    <AssetBarDemoFrame>
      <ScribeAssetBarPort
        title="Add Images"
        buttons={
          <>
            <ToolkitButton type="button" background="transparent" border color="var(--text)">
              Cancel
            </ToolkitButton>
            <ToolkitButton type="button" background="var(--primary)" color="var(--primary-contrast-text)">
              Save
            </ToolkitButton>
          </>
        }
      />
    </AssetBarDemoFrame>
  ),
  "selection-actions": (
    <AssetBarDemoFrame>
      <ScribeAssetBarPort
        title="Add Images"
        buttons={<ScribeAssetBarSelectionActions count={0} addDisabled />}
      />
    </AssetBarDemoFrame>
  ),
  "title-only": (
    <AssetBarDemoFrame>
      <ScribeAssetBarPort title="Add Images" />
    </AssetBarDemoFrame>
  ),
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/FullscreenTakeover.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/Content/BulkAddImageModal.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/pages/Feeds/SearchContentModal/index.tsx
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Production toolbar port with fixture buttons
      </Badge>
    </div>
  ),
};
