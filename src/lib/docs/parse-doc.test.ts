import { describe, expect, it } from "vitest";

import { parseDoc } from "./parse-doc";

describe("parseDoc", () => {
  it("omits site-only skill guidance blocks from rendered sections", () => {
    const doc = parseDoc(`---
title: Foundation
---

Visible reader guidance.

<!-- scribe-skill-guidance:start -->

Hidden skill guidance.

## Hidden section

This must not become a site section.

<!-- scribe-skill-guidance:end -->

## Visible section

Visible section content.
`);

    expect(doc.sections).toEqual([
      expect.objectContaining({
        id: "visible-section",
        title: "Visible section",
        content: "Visible section content.",
      }),
    ]);
    expect(JSON.stringify(doc.sections)).not.toContain("Hidden skill guidance");
  });
});
