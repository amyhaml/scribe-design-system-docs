import { useEffect, useRef } from "react";
import ReactTooltip from "react-tooltip";

import { Badge } from "@/components/ui/badge";
import { ScribeTooltipPort } from "@/components/scribe";

function TooltipExample() {
  const anchorRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const show = window.setTimeout(() => {
      ReactTooltip.rebuild();
      ReactTooltip.show(anchor);
    }, 0);

    return () => {
      window.clearTimeout(show);
      ReactTooltip.hide(anchor);
    };
  }, []);

  return (
    <div className="scribe-app-css-vars scribe-tooltip-demo-frame">
      <span
        ref={anchorRef}
        className="scribe-tooltip-demo-anchor"
        data-for="scribe-tooltip-demo"
        data-tip="Tooltip text"
        aria-hidden
      />
      <ScribeTooltipPort id="scribe-tooltip-demo" place="bottom" hideArrow hasInfo />
    </div>
  );
}

export const tooltipDemos = {
  tooltip: <TooltipExample />,
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/Tooltip/Tooltip.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/Tooltip/Tooltip.stories.tsx
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Production react-tooltip port with static docs anchor
      </Badge>
    </div>
  ),
};
