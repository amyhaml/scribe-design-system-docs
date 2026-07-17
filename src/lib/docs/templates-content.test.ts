import { describe, expect, it } from "vitest";

import type { TemplateDefinition } from "@/data/templates";

import { resolveTemplateGalleryContent } from "./templates-content";
import type { ParsedDoc } from "./parse-doc";

const registry: TemplateDefinition[] = [
  {
    id: "alpha",
    category: "Content",
    preview: { kind: "feature-url", url: "https://scribe.example/alpha" },
  },
  {
    id: "beta",
    category: "Media",
    preview: { kind: "feature-url", url: "https://scribe.example/beta" },
  },
];

function templateSection(id: string, title: string, description: string): ParsedDoc["sections"][number] {
  return {
    id,
    title,
    content: description,
    proseBefore: description,
    proseAfter: "",
    blocks: [{ type: "prose", content: description }],
  };
}

function docWith(sections: ParsedDoc["sections"]): ParsedDoc {
  return {
    frontmatter: {
      title: "Templates",
      description: "Source-backed page templates.",
    },
    sections,
  };
}

describe("resolveTemplateGalleryContent", () => {
  it("merges vault copy into registry entries in registry order", () => {
    const result = resolveTemplateGalleryContent(
      docWith([
        templateSection("beta", "Beta", "Beta description."),
        templateSection("alpha", "Alpha", "Alpha description."),
      ]),
      registry,
    );

    expect(result.title).toBe("Templates");
    expect(result.templates).toEqual([
      expect.objectContaining({ id: "alpha", title: "Alpha", description: "Alpha description." }),
      expect.objectContaining({ id: "beta", title: "Beta", description: "Beta description." }),
    ]);
  });

  it("rejects registry IDs that have no vault copy", () => {
    expect(() =>
      resolveTemplateGalleryContent(
        docWith([templateSection("alpha", "Alpha", "Alpha description.")]),
        registry,
      ),
    ).toThrow('is missing template section(s) for registry id(s): beta');
  });

  it("rejects unknown vault IDs", () => {
    expect(() =>
      resolveTemplateGalleryContent(
        docWith([
          templateSection("alpha", "Alpha", "Alpha description."),
          templateSection("beta", "Beta", "Beta description."),
          templateSection("unknown", "Unknown", "Unknown description."),
        ]),
        registry,
      ),
    ).toThrow('contains unknown template section id(s): unknown');
  });

  it("rejects duplicate vault IDs", () => {
    expect(() =>
      resolveTemplateGalleryContent(
        docWith([
          templateSection("alpha", "Alpha", "Alpha description."),
          templateSection("alpha", "Duplicate", "Duplicate description."),
        ]),
        registry,
      ),
    ).toThrow('contains duplicate template section id "alpha"');
  });

  it("rejects blank reader-facing copy", () => {
    expect(() =>
      resolveTemplateGalleryContent(
        docWith([
          templateSection("alpha", "", "Alpha description."),
          templateSection("beta", "Beta", "   "),
        ]),
        registry,
      ),
    ).toThrow('template section "alpha" title must be a non-empty string');
  });
});
