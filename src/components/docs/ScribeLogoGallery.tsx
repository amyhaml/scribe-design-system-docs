import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, Download, ExternalLink, Figma, Github } from "lucide-react";

import { SCRIBE_COLOR_PRIMITIVES } from "@/data/scribe-color-tokens";
import type { ResourceCardCopy, ResourceCardDefinition } from "@/lib/docs/resource-card-content";
import { cn } from "@/lib/utils";

const FIGMA_BRAND_GUIDELINES_URL =
  "https://www.figma.com/design/Sb0fwIT2ib3LNx0Q8gIyAo/Scribe-Brand-Guidelines?timeline=keyframe&node-id=1139-1660&t=I1Ar043XcQB28Wrn-0";
const GITHUB_LOGO_FILES_URL = "https://github.com/Media-Platforms/scribe/tree/main/public";

const LOGO_WORDMARK_ASSET = "/brand/logo-wordmark.svg";
const LOGO_BASE_ASSET = "/brand/logo-base.svg";
const LOGO_LETTER_ASSET = "/brand/logo-letter-icon.svg";
const LOGO_SOCIAL_ASSET = "/brand/logo-social-icon.svg";
const LOGO_SOCIAL_DARK_ASSET = "/brand/logo-social-icon-dark.svg";
const LOGO_ZIP_ASSET = "/brand/scribe-logos.zip";
const LOGO_PREVIEW_BACKGROUND = "#444444";

type LogoResourceCardDefinition = ResourceCardDefinition & {
  download?: boolean;
  href: string;
  icon: "download" | "figma" | "github";
};

export const LOGO_RESOURCE_CARD_DEFINITIONS: readonly LogoResourceCardDefinition[] = [
  {
    id: "figma-brand-guidelines",
    href: FIGMA_BRAND_GUIDELINES_URL,
    icon: "figma",
  },
  {
    id: "github-logo-files",
    href: GITHUB_LOGO_FILES_URL,
    icon: "github",
  },
  {
    id: "download-svg-files",
    download: true,
    href: LOGO_ZIP_ASSET,
    icon: "download",
  },
];

type WordmarkTone = "black" | "white";

type LogoColorVariant = {
  background: string;
  label: string;
  tone: WordmarkTone;
};

const logoColorVariants: LogoColorVariant[] = [
  { background: SCRIBE_COLOR_PRIMITIVES.white, label: "White", tone: "black" },
  { background: SCRIBE_COLOR_PRIMITIVES.yellow[30], label: "Yellow", tone: "black" },
  { background: SCRIBE_COLOR_PRIMITIVES.green[30], label: "Green", tone: "black" },
  { background: SCRIBE_COLOR_PRIMITIVES.blue[60], label: "Blue", tone: "white" },
  { background: SCRIBE_COLOR_PRIMITIVES.pink[40], label: "Purple", tone: "white" },
  { background: SCRIBE_COLOR_PRIMITIVES.black, label: "Black", tone: "white" },
];

function LogoWordmark({
  className,
  tone,
}: {
  className?: string;
  tone: WordmarkTone;
}) {
  const color = tone === "black" ? SCRIBE_COLOR_PRIMITIVES.black : SCRIBE_COLOR_PRIMITIVES.white;
  const mask = `url("${LOGO_WORDMARK_ASSET}") center / contain no-repeat`;
  return (
    <div
      className={cn("aspect-[218/69] w-full", className)}
      style={
        {
          backgroundColor: color,
          WebkitMask: mask,
          mask,
        } as CSSProperties
      }
      aria-hidden
    />
  );
}

function ResourceLinkCard({
  download,
  description,
  href,
  icon,
  title,
}: {
  download?: boolean;
  description: string;
  href: string;
  icon: "download" | "figma" | "github";
  title: string;
}) {
  const Icon = icon === "figma" ? Figma : icon === "github" ? Github : Download;
  return (
    <a
      href={href}
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noreferrer"}
      download={download}
      className="group rounded-2xl border bg-background p-5 shadow-sm transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="flex min-h-32 flex-col justify-between gap-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/40 text-foreground">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
            {title}
            {download ? null : (
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            )}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
    </a>
  );
}

function LogoColorTile({ variant }: { variant: LogoColorVariant }) {
  return (
    <div
      className="flex min-h-[12rem] items-center justify-center p-8"
      style={{ backgroundColor: variant.background }}
      aria-label={`${variant.label} logo color treatment`}
    >
      <LogoWordmark className="max-w-[15rem]" tone={variant.tone} />
    </div>
  );
}

function LogoAssetCard({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <article className="space-y-3">
      <div
        className="flex min-h-40 items-center justify-center rounded-2xl p-8"
        style={{ backgroundColor: LOGO_PREVIEW_BACKGROUND }}
      >
        {children}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </article>
  );
}

function IconStep({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="flex min-w-[7rem] flex-col items-center gap-3">
      <div
        className="flex h-24 w-24 items-center justify-center rounded-2xl"
        style={{ backgroundColor: LOGO_PREVIEW_BACKGROUND }}
      >
        {children}
      </div>
      <p className="text-center font-mono text-xs font-semibold uppercase tracking-wide text-white/80">
        {label}
      </p>
    </div>
  );
}

export function ScribeLogoGallery({ resources }: { resources: readonly ResourceCardCopy[] }) {
  const definitionsById = new Map(
    LOGO_RESOURCE_CARD_DEFINITIONS.map((definition) => [definition.id, definition]),
  );

  return (
    <div className="space-y-12">
      <section id="logo-resources" className="scroll-mt-24 space-y-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Resources
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {resources.map((copy) => {
            const definition = definitionsById.get(copy.id)!;
            return <ResourceLinkCard key={copy.id} {...copy} {...definition} />;
          })}
        </div>
      </section>

      <section id="logo-assets" className="scroll-mt-24 space-y-5 border-t pt-12">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Logo assets
        </h2>
        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr_1fr]">
          <LogoAssetCard label="Social icon">
            <div className="flex items-center gap-8">
              <img src={LOGO_SOCIAL_ASSET} alt="" className="h-16 w-16" />
              <img src={LOGO_SOCIAL_DARK_ASSET} alt="" className="h-16 w-16" />
            </div>
          </LogoAssetCard>
          <LogoAssetCard label="Wordmark">
            <div className="grid w-full gap-6 sm:grid-cols-2">
              <div className="flex min-h-24 items-center justify-center p-5">
                <LogoWordmark className="max-w-[14rem]" tone="white" />
              </div>
              <div className="flex min-h-24 items-center justify-center p-5">
                <LogoWordmark className="max-w-[14rem]" tone="black" />
              </div>
            </div>
          </LogoAssetCard>
          <LogoAssetCard label="Letter icon">
            <div className="flex items-center gap-8">
              <img src={LOGO_LETTER_ASSET} alt="" className="h-16 w-16" />
              <img src={LOGO_LETTER_ASSET} alt="" className="h-16 w-16 invert" />
            </div>
          </LogoAssetCard>
        </div>
      </section>

      <section id="logo-color-variants" className="scroll-mt-24 space-y-5 border-t pt-12">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Color variants
        </h2>
        <div className="overflow-hidden rounded-2xl border bg-background">
          <div className="grid md:grid-cols-3">
            {logoColorVariants.map((variant) => (
              <LogoColorTile key={variant.label} variant={variant} />
            ))}
          </div>
        </div>
        <div className="grid overflow-hidden rounded-xl border sm:grid-cols-3 lg:grid-cols-6">
          {logoColorVariants.map((variant) => (
            <div
              key={variant.label}
              className="flex min-h-24 items-center justify-center p-5"
              style={{ backgroundColor: variant.background }}
            >
              <LogoWordmark className="max-w-24" tone={variant.tone} />
            </div>
          ))}
        </div>
      </section>

      <section id="logo-icon-construction" className="scroll-mt-24 space-y-5 border-t pt-12">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Icon construction
        </h2>
        <div
          className="rounded-2xl border p-6 sm:p-8"
          style={{ backgroundColor: LOGO_PREVIEW_BACKGROUND }}
        >
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
            <IconStep label="Base">
              <img src={LOGO_BASE_ASSET} alt="" className="h-16 w-16" />
            </IconStep>
            <span className="text-2xl font-medium text-white/80" aria-hidden>
              +
            </span>
            <IconStep label="Letter">
              <img src={LOGO_LETTER_ASSET} alt="" className="h-16 w-16 invert" />
            </IconStep>
            <ArrowRight className="h-6 w-6 text-white/80" aria-hidden />
            <IconStep label="Light">
              <img src={LOGO_SOCIAL_ASSET} alt="" className="h-16 w-16" />
            </IconStep>
            <IconStep label="Dark">
              <img src={LOGO_SOCIAL_DARK_ASSET} alt="" className="h-16 w-16" />
            </IconStep>
            <ArrowRight className="h-6 w-6 text-white/80" aria-hidden />
            <IconStep label="Favicon preview">
              <div className="flex items-center gap-2 bg-black px-3 py-2 text-white">
                <img src={LOGO_SOCIAL_ASSET} alt="" className="h-6 w-6" />
                <span className="text-sm font-medium">Scribe</span>
              </div>
            </IconStep>
          </div>
        </div>
      </section>
    </div>
  );
}
