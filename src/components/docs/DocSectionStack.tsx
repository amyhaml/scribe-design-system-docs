import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const GAP_CLASS = {
  "6": "gap-6",
  "8": "gap-8",
} as const;

export function DocSectionStack({
  children,
  gap = "6",
  className,
}: {
  children: ReactNode;
  gap?: keyof typeof GAP_CLASS;
  className?: string;
}) {
  return (
    <div className={cn("doc-section-stack flex flex-col", GAP_CLASS[gap], className)}>{children}</div>
  );
}
