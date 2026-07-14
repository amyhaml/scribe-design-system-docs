/**
 * Editorial guidance for Scribe font-size tokens (`--scribe-*-font-size`).
 * Typical HTML semantics are examples only — product code may use different elements.
 */
export const SCRIBE_TYPE_ROLE_GUIDANCE: {
  tokenName: string;
  role: string;
  /** Short, scannable bullets for where this size is used in the product UI. */
  usageBullets: string[];
}[] = [
  {
    tokenName: "default-font-size",
    role: "Body",
    usageBullets: [
      "Body copy in drawers, dialogs, and side panels",
      "Paragraphs and stacked descriptions under a title",
      "Form hints, list body text, and supporting explanations",
    ],
  },
  {
    tokenName: "label-font-size",
    role: "Label",
    usageBullets: [
      "Field labels, legends, and captions",
      "Compact table or list column headers",
      "Metadata lines beside titles (e.g. character counts)",
    ],
  },
  {
    tokenName: "heading-font-size",
    role: "Heading",
    usageBullets: [
      "Section, card, and sidebar group titles",
      "Modal, dialog, and drawer titles",
      "Primary heading within a surface or panel",
    ],
  },
  {
    tokenName: "form-heading-font-size",
    role: "Form heading",
    usageBullets: [
      "Step titles in wizards and multi-page flows",
      "Large headers above grouped fields",
    ],
  },
  {
    tokenName: "heading-medium-font-size",
    role: "Display heading",
    usageBullets: ["Hero and marketing headline lines", "Large empty-state and onboarding titles"],
  },
  {
    tokenName: "small-font-size",
    role: "Small",
    usageBullets: [
      "Helper and validation text under inputs",
      "Footnotes, timestamps, and secondary notes",
    ],
  },
  {
    tokenName: "xsmall-font-size",
    role: "Extra small",
    usageBullets: ["Badges, tags, and status pills", "Dense table meta (dates, counts, read time)"],
  },
];

export function getUsageBulletsForToken(tokenName: string): readonly string[] {
  const row = SCRIBE_TYPE_ROLE_GUIDANCE.find((r) => r.tokenName === tokenName);
  return row?.usageBullets ?? [];
}
