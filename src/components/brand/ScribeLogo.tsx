import { cn } from "@/lib/utils";
import scribeLogoWideBlackAnimated from "../../../public/logo-wide-black-animated.svg?raw";

/**
 * Sidebar logo. The SVG asset uses the supplied animated artwork; its resting
 * state is the animation's final frame to avoid hover-time logo shifts.
 */
export function ScribeLogoWideBlack({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block aspect-[218/69] h-7 max-w-full shrink-0 dark:invert",
        "[&>svg]:block [&>svg]:h-full [&>svg]:w-full [&>svg]:overflow-visible",
        "group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:max-h-7 group-data-[collapsible=icon]:max-w-[calc(var(--sidebar-width-icon)-4px)]",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: scribeLogoWideBlackAnimated }}
    />
  );
}
