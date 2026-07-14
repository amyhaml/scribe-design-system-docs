/**
 * Editorial / UI font roles in the Scribe product. Stacks align with `@scribe/packages/styles`
 * (`fonts.heading`, `fonts.body`, `fonts.main`). Specimens load the same woff2 sources via
 * `scribe-product-fonts.css` (see `public/scribe-fonts`).
 */
export const SCRIBE_FONT_FAMILIES: {
  id: string;
  /** Small label, top-left (e.g. Headline, Composer, UI). */
  category: string;
  /** Actual typeface name, top-right in monospace. */
  fontName: string;
  /** Short usage line below the specimen. */
  usage: string;
  /** CSS `font-family` stack for specimens (includes fallbacks). */
  specimenStack: string;
  /** Tailwind classes for specimen size (headline largest, then composer, then UI). */
  sampleClassName: string;
}[] = [
  {
    id: "headline",
    category: "Headline",
    fontName: "Tiempos Headline",
    usage: "Article titles, page headlines, hero copy.",
    specimenStack: '"Tiempos Headline", "Tiempos", "Times New Roman", Times, Georgia, serif',
    sampleClassName: "text-3xl leading-snug sm:text-4xl",
  },
  {
    id: "composer",
    category: "Composer",
    fontName: "Charter",
    usage: "Long-form body copy in the article composer.",
    specimenStack: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, Georgia, serif',
    sampleClassName: "text-xl leading-snug sm:text-2xl",
  },
  {
    id: "ui",
    category: "UI",
    fontName: "Inter",
    usage: "Application UI: nav, buttons, inputs, labels, metadata.",
    specimenStack: '"Inter", ui-sans-serif, system-ui, sans-serif',
    sampleClassName: "text-lg leading-snug sm:text-xl",
  },
];
