import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { ScribeDropzonePort } from "@/components/scribe";

function DropzoneDemoFrame({ children }: { children: ReactNode }) {
  return <div className="scribe-app-css-vars">{children}</div>;
}

export const dropzoneDemos = {
  image: (
    <DropzoneDemoFrame>
      <ScribeDropzonePort
        variant="image"
        isDismissable
        isGettySearchEnabled
        heading="Drag & drop files here or upload from Getty"
        disclaimers={[
          "Maximum file size is 6 MB in png, jpg, jpeg, gif formats",
          "Minimum width 320px | Minimum height 125px",
          "Maximum width 12000px | Maximum height 12000px",
        ]}
      />
    </DropzoneDemoFrame>
  ),
  video: (
    <DropzoneDemoFrame>
      <ScribeDropzonePort
        variant="video"
        isDismissable
        heading="Drag and drop files here or browse your device"
        disclaimers={["Supported file formats: mp4, ogg, mpeg"]}
      />
    </DropzoneDemoFrame>
  ),
  uploading: (
    <DropzoneDemoFrame>
      <ScribeDropzonePort variant="uploading" progressLabel="50% completed" />
    </DropzoneDemoFrame>
  ),
  error: (
    <DropzoneDemoFrame>
      <ScribeDropzonePort variant="error" isDismissable />
    </DropzoneDemoFrame>
  ),
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/CreationZone/index.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/CreationZone/FileInput.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/CreationZone/shared.ts
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/AssetPreview.tsx
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Production upload ports with fixture states
      </Badge>
    </div>
  ),
};
