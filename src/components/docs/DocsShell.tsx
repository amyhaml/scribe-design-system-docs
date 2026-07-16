import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

function DocsTocList({ toc }: { toc: { id: string; label: string }[] }) {
  return (
    <>
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-2 border-l">
        {toc.map((t) => (
          <li key={t.id}>
            <a
              href={`#${t.id}`}
              className="block border-l-2 border-transparent pl-3 -ml-px text-xs text-muted-foreground hover:border-foreground hover:text-foreground"
            >
              {t.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export function DocsShell({
  breadcrumbs,
  title,
  description,
  headerExtra,
  children,
  toc,
  tocPlacement = "sidebar",
  headerAlign = "left",
}: {
  breadcrumbs?: { label: string; to?: string }[];
  title: string;
  description?: ReactNode;
  /** Rendered immediately after the title in the header row (e.g. Figma link on toolkit-only pages). */
  headerExtra?: ReactNode;
  children: ReactNode;
  toc?: { id: string; label: string }[];
  /** `header`: full-width article; compact “On this page” beside the title. `sidebar`: right rail (component docs). */
  tocPlacement?: "header" | "sidebar";
  headerAlign?: "left" | "center";
}) {
  const hasToc = toc && toc.length > 0;
  const headerToc = hasToc && tocPlacement === "header";
  const sidebarToc = hasToc && tocPlacement === "sidebar";

  return (
    <div className="mx-auto flex w-full max-w-[1400px] gap-10 px-6 py-10 lg:px-10">
      <article className="min-w-0 flex-1">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {b.to ? (
                  <Link to={b.to} className="hover:text-foreground">
                    {b.label}
                  </Link>
                ) : (
                  <span>{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
              </span>
            ))}
          </nav>
        )}
        <header className={cn("mb-8", !headerToc && "border-b pb-6")}>
          {headerToc ? (
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12 xl:gap-16">
              <div className="min-w-0 flex-1 border-b pb-6">
                <div className="flex min-w-0 flex-wrap items-center gap-3">
                  <h1 className="min-w-0 text-3xl font-semibold tracking-tight text-foreground">
                    {title}
                  </h1>
                  {headerExtra}
                </div>
                {description && (
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>
              <nav
                aria-label="On this page"
                className="w-full shrink-0 lg:w-56 lg:max-w-none lg:self-start"
              >
                <DocsTocList toc={toc} />
              </nav>
            </div>
          ) : (
            <>
              <div
                className={cn(
                  "flex min-w-0 flex-wrap items-center gap-3",
                  headerAlign === "center" && "justify-center text-center",
                )}
              >
                <h1 className="min-w-0 text-3xl font-semibold tracking-tight text-foreground">
                  {title}
                </h1>
                {headerExtra}
              </div>
              {description && (
                <p
                  className={cn(
                    "mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground",
                    headerAlign === "center" && "mx-auto text-center",
                  )}
                >
                  {description}
                </p>
              )}
            </>
          )}
        </header>
        <div className="space-y-12">{children}</div>
      </article>

      {sidebarToc && (
        <aside className="sticky top-16 hidden w-56 shrink-0 self-start xl:block">
          <nav aria-label="On this page">
            <DocsTocList toc={toc} />
          </nav>
        </aside>
      )}
    </div>
  );
}

export function DocsSection({
  id,
  title,
  children,
  className,
}: {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20", className)}>
      {title && (
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      )}
      {children}
    </section>
  );
}
