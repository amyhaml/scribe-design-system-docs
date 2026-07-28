import { describe, expect, it } from "vitest";

import { resolveDocSectionCopy, resolveResourceCardCopy } from "./resource-card-content";
import type { ParsedDoc } from "./parse-doc";

const definitions = [{ id: "alpha" }, { id: "beta" }];

function section(id: string, title: string, description: string): ParsedDoc["sections"][number] {
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
  return { frontmatter: { title: "Resources" }, sections };
}

describe("resolveResourceCardCopy", () => {
  it("merges copy in runtime definition order", () => {
    expect(
      resolveResourceCardCopy(
        docWith([
          section("beta", "Beta", "Beta description."),
          section("alpha", "Alpha", "Alpha description."),
        ]),
        definitions,
        "content/example.md",
      ),
    ).toEqual([
      { id: "alpha", title: "Alpha", description: "Alpha description." },
      { id: "beta", title: "Beta", description: "Beta description." },
    ]);
  });

  it("rejects missing, unknown, duplicate, and blank copy", () => {
    expect(() =>
      resolveResourceCardCopy(
        docWith([section("alpha", "Alpha", "Alpha description.")]),
        definitions,
        "content/example.md",
      ),
    ).toThrow("is missing resource card section(s) for definition id(s): beta");

    expect(() =>
      resolveResourceCardCopy(
        docWith([
          section("alpha", "Alpha", "Alpha description."),
          section("beta", "Beta", "Beta description."),
          section("unknown", "Unknown", "Unknown description."),
        ]),
        definitions,
        "content/example.md",
      ),
    ).toThrow("contains unknown resource card section id(s): unknown");

    expect(() =>
      resolveResourceCardCopy(
        docWith([
          section("alpha", "Alpha", "Alpha description."),
          section("alpha", "Again", "Again."),
        ]),
        definitions,
        "content/example.md",
      ),
    ).toThrow('contains duplicate resource card section id "alpha"');

    expect(() =>
      resolveResourceCardCopy(
        docWith([
          section("alpha", "", "Alpha description."),
          section("beta", "Beta", "Beta description."),
        ]),
        definitions,
        "content/example.md",
      ),
    ).toThrow('resource card section "alpha" title must be a non-empty string');
  });

  it("allows explicitly registered non-resource sections and resolves their copy", () => {
    const doc = docWith([
      section("design-guidance", "Scribe Design Guidance", "Install this skill once."),
      section("alpha", "Alpha", "Alpha description."),
      section("beta", "Beta", "Beta description."),
    ]);

    expect(
      resolveResourceCardCopy(doc, definitions, "content/example.md", {
        allowedSectionIds: ["design-guidance"],
      }),
    ).toHaveLength(2);
    expect(resolveDocSectionCopy(doc, "design-guidance", "content/example.md")).toEqual({
      id: "design-guidance",
      title: "Scribe Design Guidance",
      description: "Install this skill once.",
    });
  });

  it("rejects missing and duplicate required sections", () => {
    expect(() =>
      resolveDocSectionCopy(docWith([]), "design-guidance", "content/example.md"),
    ).toThrow('is missing section "design-guidance"');

    expect(() =>
      resolveDocSectionCopy(
        docWith([
          section("design-guidance", "Guidance", "One."),
          section("design-guidance", "Guidance", "Two."),
        ]),
        "design-guidance",
        "content/example.md",
      ),
    ).toThrow('contains duplicate section id "design-guidance"');
  });
});
