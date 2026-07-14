import type { ReactNode } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";

import { DocsShell, DocsSection } from "@/components/docs/DocsShell";
import { ScribeIconsGallery } from "@/components/docs/ScribeIconsGallery";
import { MarkdownProse } from "@/components/docs/MarkdownProse";
import { typographyTokenAnchorId } from "@/data/component-typography-slots";
import {
  SCRIBE_COLOR_PRIMITIVES,
  SCRIBE_CSS_COLOR_VARS,
  SCRIBE_TYPOGRAPHY_SIZE_TOKENS,
  appVarToDocCssVar,
} from "@/data/scribe-color-tokens";
import { getUsageBulletsForToken } from "@/data/scribe-type-roles";
import { SCRIBE_FONT_FAMILIES } from "@/data/scribe-typography";
import { useRootCssVar } from "@/hooks/use-root-css-var";
import { formatFontSizeWithCrossUnit, ROOT_FONT_PX } from "@/lib/typography-display";
import {
  SCRIBE_APP_SPACING,
  SCRIBE_APP_SPACING_ORDER,
  SCRIBE_DESIGN_ELEVATION_TOKENS,
  SCRIBE_DESIGN_RADIUS_TOKENS,
} from "@/data/scribe-spacing-tokens";
import { storybookIndexQuery } from "@/lib/storybook";
import { getDocOptional } from "@/lib/docs/load-doc";
import { getTocFromDoc } from "@/lib/docs/parse-doc";

function spacingRemToPxLabel(remStr: string): string {
  const m = remStr.trim().match(/^([\d.]+)\s*rem$/i);
  if (!m) return "—";
  return `${Math.round(parseFloat(m[1]) * ROOT_FONT_PX)}px`;
}

type Foundation = {
  render: () => ReactNode;
};

function colorGroupAnchorId(group: string): string {
  return `semantic-color-${group
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

function formatSemanticTokenLabel(appName: string): string {
  const spaced = appName.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/-/g, " ");
  return spaced.replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Prefer #RRGGBB for display when the browser resolves to rgb/rgba. */
function cssResolvedToDisplayValue(resolved: string): string {
  if (!resolved || resolved === "—") return resolved;
  const t = resolved.trim();
  if (t.startsWith("#")) return t.toUpperCase();
  const rgb = t.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgb) {
    const r = Math.min(255, Number(rgb[1]));
    const g = Math.min(255, Number(rgb[2]));
    const b = Math.min(255, Number(rgb[3]));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }
  return t;
}

const PRIMITIVE_CORE_FAMILIES = new Set(["white", "black"]);

function formatPrimitiveHexForDisplay(hex: string): string {
  const t = hex.trim();
  if (!t.startsWith("#")) return t.toLowerCase();
  return `#${t.slice(1).toLowerCase()}`;
}

function primitiveShadeLabel(family: string, tintKey: string): string {
  if (tintKey === "tint") return `${family}-tint`;
  const n = Number(tintKey);
  if (!Number.isNaN(n) && tintKey === String(n)) {
    const digits = n <= 99 ? String(n).padStart(2, "0") : String(n);
    return `${family}-${digits}`;
  }
  return `${family}-${tintKey}`;
}

function PrimitiveSwatchCard({ label, hex }: { label: string; hex: string }) {
  return (
    <div className="box-border flex h-[122px] w-[143px] shrink-0 flex-col overflow-hidden rounded-md border border-border bg-card">
      <div
        className="h-[60px] w-full shrink-0 border-b border-border/50"
        style={{ backgroundColor: hex }}
        aria-hidden
      />
      <div className="flex h-[60px] flex-col justify-center space-y-1 px-2.5 py-2">
        <p className="truncate text-xs font-medium lowercase leading-snug text-foreground">
          {label}
        </p>
        <p className="truncate font-mono text-[11px] leading-snug text-muted-foreground">
          {formatPrimitiveHexForDisplay(hex)}
        </p>
      </div>
    </div>
  );
}

function SemanticColorSwatch({ name }: { name: string }) {
  const docVar = appVarToDocCssVar(name);
  const raw = useRootCssVar(docVar);
  const label = formatSemanticTokenLabel(name);
  const valueLine = cssResolvedToDisplayValue(raw);

  return (
    <div className="flex min-w-0 items-center gap-3 rounded-lg border border-border bg-card px-3 py-2">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border/60">
        <div
          className="absolute inset-0 bg-[repeating-conic-gradient(#d4d4d8_0%_25%,#fafafa_0%_50%)] bg-[length:12px_12px] dark:bg-[repeating-conic-gradient(#3f3f46_0%_25%,#18181b_0%_50%)] dark:bg-[length:12px_12px]"
          aria-hidden
        />
        <div className="relative h-full w-full" style={{ backgroundColor: `var(--${docVar})` }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-tight text-foreground">{label}</p>
        <p className="mt-0.5 truncate font-mono text-[11px] leading-tight text-muted-foreground">
          {valueLine}
        </p>
      </div>
    </div>
  );
}

function PrimitiveColorFamilies() {
  const allFamilies = Object.entries(SCRIBE_COLOR_PRIMITIVES);
  const corePairs = allFamilies.filter(
    ([k, v]) => PRIMITIVE_CORE_FAMILIES.has(k) && typeof v === "string",
  ) as [string, string][];
  corePairs.sort((a, b) => {
    const order = ["white", "black"];
    return order.indexOf(a[0]) - order.indexOf(b[0]);
  });
  const scaleSections = allFamilies.filter(([k]) => !PRIMITIVE_CORE_FAMILIES.has(k));

  const condensedGrid = "grid justify-start gap-3 [grid-template-columns:repeat(auto-fill,143px)]";

  return (
    <div className="space-y-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Primitives (<code className="text-xs">packages/styles</code> → colors)
      </p>

      {corePairs.length > 0 ? (
        <div className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">Core</h2>
          <div className={condensedGrid}>
            {corePairs.map(([family, hex]) => (
              <PrimitiveSwatchCard key={family} label={family} hex={hex} />
            ))}
          </div>
        </div>
      ) : null}

      {scaleSections.map(([family, value]) => {
        if (typeof value === "string") {
          return (
            <div key={family} className="space-y-2">
              <h2 className="text-base font-semibold capitalize text-foreground">{family}</h2>
              <div className={condensedGrid}>
                <PrimitiveSwatchCard label={family} hex={value} />
              </div>
            </div>
          );
        }
        const entries = Object.entries(value).filter(
          ([k, v]) => v != null && typeof v === "string",
        ) as [string, string][];
        entries.sort(([a], [b]) => {
          const na = Number(a);
          const nb = Number(b);
          const aNum = !Number.isNaN(na) && a === String(na);
          const bNum = !Number.isNaN(nb) && b === String(nb);
          if (aNum && bNum) return na - nb;
          if (aNum) return -1;
          if (bNum) return 1;
          return a.localeCompare(b);
        });
        return (
          <div key={family} className="space-y-2">
            <h2 className="text-base font-semibold capitalize text-foreground">{family}</h2>
            <div className={condensedGrid}>
              {entries.map(([tint, hex]) => (
                <PrimitiveSwatchCard
                  key={tint}
                  label={primitiveShadeLabel(family, tint)}
                  hex={hex}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SemanticCssVariables() {
  const groups = [...new Set(SCRIBE_CSS_COLOR_VARS.map((v) => v.group))];
  return (
    <div className="space-y-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Semantic tokens (<code className="text-xs">--scribe-*</code>)
      </p>
      {groups.map((group) => (
        <div key={group} id={colorGroupAnchorId(group)} className="scroll-mt-20">
          <h2 className="mb-2 text-base font-semibold text-foreground">{group}</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SCRIBE_CSS_COLOR_VARS.filter((v) => v.group === group).map((v) => (
              <SemanticColorSwatch key={v.name} name={v.name} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function formatTypographySizeLabel(tokenName: string): string {
  const stem = tokenName.replace(/-font-size$/, "");
  if (stem === "xsmall") return "Extra small";
  return stem
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function TypographySizeTokenRow({ name, fallback }: { name: string; fallback: string }) {
  const docVar = appVarToDocCssVar(name);
  const resolved = useRootCssVar(docVar);
  const raw = resolved && resolved !== "—" ? resolved : fallback;
  const display = formatFontSizeWithCrossUnit(raw);
  const usageBullets = getUsageBulletsForToken(name);

  return (
    <div id={typographyTokenAnchorId(name)} className="scroll-mt-24 space-y-5 p-5">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,1fr)_minmax(10rem,20rem)] md:items-baseline md:gap-x-6">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-xs text-muted-foreground">{formatTypographySizeLabel(name)}</span>
          <span className="text-xs leading-none text-muted-foreground/70" aria-hidden>
            ·
          </span>
          <code className="font-mono text-xs text-muted-foreground">{display}</code>
        </div>
        <code className="break-all font-mono text-xs leading-snug text-muted-foreground md:pl-4">
          --{name}
        </code>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(10rem,20rem)] md:items-start md:gap-x-6">
        <div
          style={{ fontSize: `var(--${docVar})`, lineHeight: 1.35 }}
          className="min-w-0 overflow-x-auto whitespace-nowrap border-t border-border pt-4 font-sans text-foreground md:border-t-0 md:pt-0"
        >
          The quick brown fox jumps over the lazy dog.
        </div>
        <div className="min-w-0 border-t border-border pt-4 md:border-t-0 md:pt-0">
          {usageBullets.length > 0 ? (
            <ul className="list-disc space-y-0.5 pl-4 text-left text-[11px] leading-snug text-muted-foreground">
              {usageBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : (
            <p className="pl-4 text-[11px] text-muted-foreground">—</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ScribeTypographySizes() {
  return (
    <div id="font-sizes" className="space-y-4 scroll-mt-24">
      <h2 className="text-base font-semibold text-foreground">Font sizes</h2>
      <div className="divide-y rounded-lg border">
        {SCRIBE_TYPOGRAPHY_SIZE_TOKENS.map((t) => (
          <TypographySizeTokenRow key={t.name} name={t.name} fallback={t.value} />
        ))}
      </div>
    </div>
  );
}

function ScribeTypographyFamilies() {
  return (
    <div id="typography-families" className="scroll-mt-20 space-y-4">
      <h2 className="text-base font-semibold text-foreground">Families</h2>
      <div className="flex flex-col gap-3">
        {SCRIBE_FONT_FAMILIES.map((font) => (
          <div
            key={font.id}
            className="rounded-lg border border-border bg-card px-5 py-5 sm:px-6 sm:py-6"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs text-muted-foreground">{font.category}</span>
              <code className="shrink-0 font-mono text-xs text-muted-foreground">
                {font.fontName}
              </code>
            </div>
            <p
              className={`mt-5 font-normal text-foreground ${font.sampleClassName}`}
              style={{ fontFamily: font.specimenStack }}
            >
              The quick brown fox jumps over the lazy dog
            </p>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{font.usage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const FOUNDATIONS: Record<string, Foundation> = {
  palette: {
    render: () => (
      <div className="space-y-8">
        <PrimitiveColorFamilies />
      </div>
    ),
  },
  color: {
    render: () => <SemanticCssVariables />,
  },
  typography: {
    render: () => (
      <div className="space-y-10">
        <ScribeTypographyFamilies />
        <ScribeTypographySizes />
      </div>
    ),
  },
  spacing: {
    render: () => (
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[42rem] table-fixed border-collapse text-sm">
          <colgroup>
            <col style={{ width: "5.5rem" }} />
            <col style={{ width: "5rem" }} />
            <col style={{ width: "16rem" }} />
            <col />
          </colgroup>
          <tbody className="divide-y divide-border">
            {SCRIBE_APP_SPACING_ORDER.map((key) => {
              const rem = SCRIBE_APP_SPACING[key];
              const px = spacingRemToPxLabel(rem);
              const token = `--spacing-${key}`;
              return (
                <tr key={key}>
                  <td className="py-3 pl-4 pr-2 align-middle font-mono text-xs text-foreground">
                    {key}
                  </td>
                  <td className="py-3 pr-2 align-middle font-mono text-xs tabular-nums text-muted-foreground">
                    {px}
                  </td>
                  <td className="py-3 pr-4 align-middle font-mono text-xs text-foreground">
                    <code className="whitespace-nowrap">{token}</code>
                  </td>
                  <td className="py-3 pr-4 align-middle">
                    <div className="flex min-h-2.5 items-center justify-start">
                      <div
                        className="h-2.5 shrink-0 rounded-full"
                        style={{
                          width: rem,
                          backgroundColor: "var(--scribe-primary)",
                        }}
                        aria-hidden
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ),
  },
  radius: {
    render: () => (
      <div className="space-y-10">
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-foreground">Scale</h2>
          <div className="flex flex-wrap justify-start gap-10 border-b border-border pb-8">
            {SCRIBE_DESIGN_RADIUS_TOKENS.map((row) => (
              <div
                key={row.token}
                className="flex w-[4.5rem] flex-col items-center gap-2 sm:w-[5.5rem]"
              >
                <div
                  className="h-16 w-16 shrink-0 border border-border bg-background shadow-sm"
                  style={{ borderRadius: `var(${row.token})` }}
                  aria-hidden
                />
                <span className="text-center text-xs font-medium text-foreground">
                  {row.scaleLabel}
                </span>
                <span className="text-center font-mono text-[11px] tabular-nums text-muted-foreground">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-base font-semibold text-foreground">Reference</h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[48rem] table-fixed border-collapse text-sm">
              <colgroup>
                <col style={{ width: "22%" }} />
                <col style={{ width: "8rem" }} />
                <col style={{ width: "14rem" }} />
                <col />
              </colgroup>
              <thead>
                <tr className="border-b border-border bg-muted/40 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <th className="p-3 pl-4 font-medium">Token</th>
                  <th className="p-3 font-medium">Value</th>
                  <th className="p-3 font-medium">Tailwind</th>
                  <th className="p-3 pr-4 font-medium">Use for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SCRIBE_DESIGN_RADIUS_TOKENS.map((row) => (
                  <tr key={row.token}>
                    <td className="p-3 pl-4 align-middle font-mono text-xs text-foreground">
                      <code>{row.token}</code>
                    </td>
                    <td className="p-3 align-middle font-mono text-xs tabular-nums text-muted-foreground">
                      {row.value}
                    </td>
                    <td className="p-3 align-middle font-mono text-xs text-muted-foreground">
                      <code className="text-foreground">{row.tailwind}</code>
                    </td>
                    <td className="p-3 pr-4 align-middle text-sm leading-snug text-muted-foreground">
                      {row.useFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    ),
  },
  elevation: {
    render: () => (
      <div className="space-y-10">
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-foreground">Scale</h2>
          <div className="mb-10 rounded-xl border border-border bg-muted/30 px-4 py-8 sm:px-8">
            <div className="flex flex-wrap justify-center gap-10 sm:justify-start sm:gap-12">
              {SCRIBE_DESIGN_ELEVATION_TOKENS.map((row) => (
                <div key={row.key} className="flex w-[10.5rem] flex-col items-center gap-3">
                  <div className="flex min-h-[6.5rem] w-full items-center justify-center p-4">
                    <div
                      className="flex h-24 w-[9.5rem] shrink-0 items-center justify-center rounded-lg border border-border/80 bg-card"
                      style={{ boxShadow: row.value }}
                    >
                      <span className="font-mono text-sm font-medium tabular-nums text-muted-foreground">
                        {row.scaleDpLabel}
                      </span>
                    </div>
                  </div>
                  <code className="text-center font-mono text-[11px] text-foreground">
                    {row.scaleClassLine}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-base font-semibold text-foreground">Reference</h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[28rem] table-fixed border-collapse text-sm">
              <colgroup>
                <col style={{ width: "28%" }} />
                <col />
              </colgroup>
              <thead>
                <tr className="border-b border-border bg-muted/40 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <th className="p-3 pl-4 font-medium">Token</th>
                  <th className="p-3 pr-4 font-medium">Use for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SCRIBE_DESIGN_ELEVATION_TOKENS.map((row) => (
                  <tr key={row.key}>
                    <td className="p-3 pl-4 align-top font-mono text-xs text-foreground">
                      <code>{row.token}</code>
                    </td>
                    <td className="p-3 pr-4 align-top text-sm leading-snug text-muted-foreground">
                      {row.useFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    ),
  },
  icons: {
    render: () => <ScribeIconsGallery />,
  },
};

export const Route = createFileRoute("/foundations/$token")({
  loader: ({ context }) => context.queryClient.ensureQueryData(storybookIndexQuery),
  head: ({ params }) => {
    const doc = getDocOptional(`foundations/${params.token}`);
    const title = doc ? `${doc.frontmatter.title} — Scribe` : "Foundations — Scribe";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: doc?.frontmatter.description ?? "Scribe design foundations.",
        },
      ],
    };
  },
  component: FoundationPage,
});

function FoundationPage() {
  const { token } = Route.useParams();
  const foundation = FOUNDATIONS[token];
  const doc = getDocOptional(`foundations/${token}`);
  if (!foundation || !doc) throw notFound();

  const intro = doc.sections[0];
  const description =
    token === "icons" ? (
      <>
        <a
          href="https://feathericons.com/"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Feather Icons
        </a>{" "}
        v4.29 reference grid (Lucide) with a 1.5px or 2px stroke toggle.
      </>
    ) : (
      doc.frontmatter.description
    );

  return (
    <DocsShell
      breadcrumbs={[{ label: "Foundations" }, { label: doc.frontmatter.title }]}
      title={doc.frontmatter.title}
      description={description}
      toc={getTocFromDoc(doc).length ? getTocFromDoc(doc) : undefined}
      tocPlacement={doc.frontmatter.toc?.length ? "header" : undefined}
    >
      {intro?.content.trim() ? (
        <DocsSection>
          <MarkdownProse content={intro.content} />
        </DocsSection>
      ) : null}
      {foundation.render()}
    </DocsShell>
  );
}
