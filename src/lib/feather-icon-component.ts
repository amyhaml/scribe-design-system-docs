import type { Icon } from "react-feather";
import * as FeatherIcons from "react-feather";

/** Feather slugs whose react-feather export name is not plain PascalCase. */
const FEATHER_SLUG_OVERRIDES: Record<string, string> = {
  github: "GitHub",
};

export function featherSlugToComponentName(slug: string): string {
  if (slug in FEATHER_SLUG_OVERRIDES) return FEATHER_SLUG_OVERRIDES[slug];
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function featherSlugToIcon(slug: string): Icon | null {
  const name = featherSlugToComponentName(slug);
  const Icon = (FeatherIcons as Record<string, Icon | undefined>)[name];
  return Icon ?? null;
}
