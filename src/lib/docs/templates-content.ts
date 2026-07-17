import type { TemplateDefinition } from "@/data/templates";

import type { ParsedDoc } from "./parse-doc";

export type TemplateCopy = {
  id: string;
  title: string;
  description: string;
};

export type ResolvedDocsTemplate = TemplateDefinition & TemplateCopy;

export type TemplateGalleryContent = {
  title: string;
  description: string;
  templates: ResolvedDocsTemplate[];
};

function invalidTemplatesContent(message: string): never {
  throw new Error(`Invalid content/templates.md: ${message}`);
}

function requireText(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    invalidTemplatesContent(`${field} must be a non-empty string.`);
  }

  return value.trim();
}

function validateRegistry(registry: readonly TemplateDefinition[]) {
  const seenIds = new Set<string>();

  registry.forEach((entry) => {
    if (!entry.id.trim()) invalidTemplatesContent("registry entries must have a non-empty id.");
    if (seenIds.has(entry.id)) {
      invalidTemplatesContent(`registry contains duplicate id "${entry.id}".`);
    }
    seenIds.add(entry.id);
  });
}

function validateVaultCopy(doc: ParsedDoc): TemplateCopy[] {
  const seenIds = new Set<string>();

  return doc.sections.map((section, index) => {
    const id = requireText(section.id, `template section ${index + 1} id`);
    const title = requireText(section.title, `template section "${id}" title`);
    const description = requireText(section.proseBefore, `template section "${id}" description`);

    if (seenIds.has(id)) {
      invalidTemplatesContent(`contains duplicate template section id "${id}".`);
    }
    seenIds.add(id);

    return { id, title, description };
  });
}

export function resolveTemplateGalleryContent(
  doc: ParsedDoc,
  registry: readonly TemplateDefinition[],
): TemplateGalleryContent {
  const title = requireText(doc.frontmatter.title, "frontmatter.title");
  const description = requireText(doc.frontmatter.description, "frontmatter.description");
  validateRegistry(registry);

  const copies = validateVaultCopy(doc);
  const copiesById = new Map(copies.map((copy) => [copy.id, copy]));
  const registryIds = new Set(registry.map((entry) => entry.id));
  const unknownIds = copies.filter((copy) => !registryIds.has(copy.id)).map((copy) => copy.id);
  const missingIds = registry.filter((entry) => !copiesById.has(entry.id)).map((entry) => entry.id);

  if (unknownIds.length) {
    invalidTemplatesContent(`contains unknown template section id(s): ${unknownIds.join(", ")}.`);
  }

  if (missingIds.length) {
    invalidTemplatesContent(`is missing template section(s) for registry id(s): ${missingIds.join(", ")}.`);
  }

  return {
    title,
    description,
    templates: registry.map((entry) => ({ ...entry, ...copiesById.get(entry.id)! })),
  };
}
