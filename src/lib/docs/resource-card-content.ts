import type { ParsedDoc } from "./parse-doc";

export type ResourceCardDefinition = {
  id: string;
};

export type ResourceCardCopy = {
  id: string;
  title: string;
  description: string;
};

function invalidResourceCardContent(source: string, message: string): never {
  throw new Error(`Invalid ${source}: ${message}`);
}

function requireText(source: string, value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    invalidResourceCardContent(source, `${field} must be a non-empty string.`);
  }

  return value.trim();
}

export function resolveResourceCardCopy(
  doc: ParsedDoc,
  definitions: readonly ResourceCardDefinition[],
  source: string,
): ResourceCardCopy[] {
  const definitionIds = new Set<string>();

  definitions.forEach((definition) => {
    const id = requireText(source, definition.id, "resource card definition id");
    if (definitionIds.has(id)) {
      invalidResourceCardContent(source, `resource card definitions contain duplicate id "${id}".`);
    }
    definitionIds.add(id);
  });

  const seenIds = new Set<string>();
  const copies = doc.sections.map((section, index) => {
    const id = requireText(source, section.id, `resource card section ${index + 1} id`);
    const title = requireText(source, section.title, `resource card section "${id}" title`);
    const description = requireText(
      source,
      section.proseBefore,
      `resource card section "${id}" description`,
    );

    if (seenIds.has(id)) {
      invalidResourceCardContent(source, `contains duplicate resource card section id "${id}".`);
    }
    seenIds.add(id);

    return { id, title, description };
  });

  const unknownIds = copies.filter((copy) => !definitionIds.has(copy.id)).map((copy) => copy.id);
  const copiesById = new Map(copies.map((copy) => [copy.id, copy]));
  const missingIds = definitions.filter((definition) => !copiesById.has(definition.id)).map(({ id }) => id);

  if (unknownIds.length) {
    invalidResourceCardContent(source, `contains unknown resource card section id(s): ${unknownIds.join(", ")}.`);
  }

  if (missingIds.length) {
    invalidResourceCardContent(
      source,
      `is missing resource card section(s) for definition id(s): ${missingIds.join(", ")}.`,
    );
  }

  return definitions.map((definition) => copiesById.get(definition.id)!);
}
