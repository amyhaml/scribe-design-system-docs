import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SCROLL_THRESHOLD = 400;
const VIEWPORT_OFFSET = 24;

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(VIEWPORT_OFFSET);

  useEffect(() => {
    const updatePosition = () => {
      const footer = document.querySelector<HTMLElement>("footer");
      const footerOverlap = footer
        ? Math.max(0, window.innerHeight - footer.getBoundingClientRect().top)
        : 0;

      setIsVisible((visible) => {
        const nextVisible = window.scrollY > SCROLL_THRESHOLD;
        return visible === nextVisible ? visible : nextVisible;
      });
      setBottomOffset(Math.max(VIEWPORT_OFFSET, footerOverlap + VIEWPORT_OFFSET));
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div
        className="fixed right-4 z-30 transition-[bottom,opacity,transform] duration-200 ease-out sm:right-10"
        style={{ bottom: `${bottomOffset}px` }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              aria-hidden={!isVisible}
              tabIndex={isVisible ? 0 : -1}
              className={`docs-global-nav-interactive inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-[opacity,transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 ${
                isVisible
                  ? "pointer-events-auto scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              <ArrowUp className="h-5 w-5" aria-hidden="true" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="rounded-full bg-slate-950 px-3 py-1.5 text-xs text-white">
            Back to top
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
