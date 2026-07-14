import { Calendar, Check, ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  ToolkitButton,
  TOOLKIT_BUTTON_SIZES,
  TOOLKIT_BUTTON_VARIANTS,
} from "@/components/scribe";
import {
  getTypographySlotsForSlug,
  typographyTokenAnchorId,
  type ComponentTypographySlot,
} from "@/data/component-typography-slots";
import { SCRIBE_APP_SPACING } from "@/data/scribe-spacing-tokens";
import { SCRIBE_TYPOGRAPHY_SIZE_TOKENS, appVarToDocCssVar } from "@/data/scribe-color-tokens";
import { useRootCssVar } from "@/hooks/use-root-css-var";
import { formatFontSizeWithCrossUnit } from "@/lib/typography-display";

const ACTION_PREVIEW_BG = "var(--info)";
const TOOLBAR_DRAFT_BG = "var(--draft)";
const ACTION_PUBLISH_BG = "var(--publish)";
const ACTION_SCHEDULE_BG = "var(--schedule)";
const ACTION_DRAFT_SAVED_BORDER = "var(--draft-saved)";
const ACTION_DRAFT_SAVED_COLOR = "var(--draft-saved)";
const TOOLBAR_PUBLISHED_BORDER = "var(--published-text)";
const TOOLBAR_PUBLISHED_COLOR = "var(--published-text)";
const TOOLBAR_SCHEDULED_BORDER = "var(--scheduled)";
const TOOLBAR_SCHEDULED_COLOR = "var(--scheduled)";

function ComponentTypographySlotRow({ slot }: { slot: ComponentTypographySlot }) {
  const docVar = appVarToDocCssVar(slot.tokenName);
  const resolved = useRootCssVar(docVar);
  const fallback =
    SCRIBE_TYPOGRAPHY_SIZE_TOKENS.find((t) => t.name === slot.tokenName)?.value ?? "";
  const raw = resolved && resolved !== "—" ? resolved : fallback;
  const formatted = formatFontSizeWithCrossUnit(raw);
  const href = `/foundations/typography#${typographyTokenAnchorId(slot.tokenName)}`;

  return (
    <tr>
      <td className="px-3 py-2 font-medium text-foreground">{slot.label}</td>
      <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
        {slot.element ? <code className="text-foreground">{slot.element}</code> : "—"}
      </td>
      <td className="px-3 py-2 font-mono text-xs">
        <a
          href={href}
          className="text-foreground underline decoration-muted-foreground/50 underline-offset-2 hover:decoration-foreground"
        >
          --{slot.tokenName}
        </a>
        <div className="mt-0.5 text-[10px] text-muted-foreground">--{docVar}</div>
      </td>
      <td className="px-3 py-2 font-mono text-[11px] text-muted-foreground">{formatted}</td>
      <td className="px-3 py-2 text-xs leading-relaxed text-muted-foreground">
        {slot.notes ?? "—"}
      </td>
    </tr>
  );
}

function ButtonTypographyTable() {
  const typoSpec = getTypographySlotsForSlug("button");
  if (!typoSpec) return null;

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead className="border-b bg-muted/40 font-medium text-foreground">
          <tr>
            <th className="px-3 py-2">Slot</th>
            <th className="px-3 py-2">Element</th>
            <th className="px-3 py-2">Token</th>
            <th className="px-3 py-2">Size</th>
            <th className="px-3 py-2">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {typoSpec.slots.map((s) => (
            <ComponentTypographySlotRow key={s.id} slot={s} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const gap = SCRIBE_APP_SPACING.m;

export const buttonDemos = {
  "editor-toolbar": (
    <div
      className="scribe-app-css-vars inline-flex flex-wrap items-stretch rounded-xl border bg-card p-4"
      style={{ gap }}
    >
      <ToolkitButton type="button" background={ACTION_PREVIEW_BG}>
        Preview
      </ToolkitButton>
      <ToolkitButton type="button" background={TOOLBAR_DRAFT_BG}>
        Save draft
      </ToolkitButton>
      <ToolkitButton type="button" background={ACTION_PUBLISH_BG}>
        Publish
      </ToolkitButton>
      <ToolkitButton type="button" background={ACTION_SCHEDULE_BG}>
        Schedule
      </ToolkitButton>
    </div>
  ),
  "editor-status": (
    <div
      className="scribe-app-css-vars inline-flex flex-wrap items-stretch rounded-xl border bg-card p-4"
      style={{ gap }}
    >
      <ToolkitButton
        type="button"
        background="transparent"
        border={ACTION_DRAFT_SAVED_BORDER}
        color={ACTION_DRAFT_SAVED_COLOR}
      >
        <Check className="size-4" aria-hidden />
        <span>Draft saved</span>
      </ToolkitButton>
      <ToolkitButton
        type="button"
        background="transparent"
        border={TOOLBAR_PUBLISHED_BORDER}
        color={TOOLBAR_PUBLISHED_COLOR}
      >
        <Check className="size-4" aria-hidden />
        <span>Published</span>
      </ToolkitButton>
      <ToolkitButton
        type="button"
        background="transparent"
        border={TOOLBAR_SCHEDULED_BORDER}
        color={TOOLBAR_SCHEDULED_COLOR}
      >
        <Calendar className="size-4" aria-hidden />
        <span>Scheduled</span>
      </ToolkitButton>
    </div>
  ),
  "split-preview": (
    <div className="scribe-app-css-vars rounded-xl border bg-card p-4">
      <div className="inline-flex items-stretch" style={{ gap: "0.0625rem" }}>
        <ToolkitButton type="button" background={ACTION_PREVIEW_BG} splitSegment="start">
          Preview
        </ToolkitButton>
        <ToolkitButton type="button" splitSegment="end" aria-label="Preview options">
          <ChevronDown className="size-4" strokeWidth={3} aria-hidden />
        </ToolkitButton>
      </div>
    </div>
  ),
  sizes: (
    <div
      className="scribe-app-css-vars flex flex-wrap items-end gap-4 rounded-xl border bg-muted/20 p-6"
      style={{ gap: SCRIBE_APP_SPACING.m }}
    >
      {TOOLKIT_BUTTON_SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <ToolkitButton type="button" variant="contained" size={size}>
            {size}
          </ToolkitButton>
          <span className="font-mono text-[11px] text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  ),
  flex: (
    <div className="scribe-app-css-vars rounded-xl border bg-card p-4">
      <ToolkitButton type="button" flexButton background="var(--primary)">
        Flex
      </ToolkitButton>
    </div>
  ),
  transparent: (
    <div className="scribe-app-css-vars flex flex-wrap gap-3 rounded-xl border bg-card p-4">
      <ToolkitButton type="button" background="transparent" border borderColor="var(--text)">
        Cancel
      </ToolkitButton>
    </div>
  ),
  typography: <ButtonTypographyTable />,
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="font-mono text-xs">
        @/components/scribe → ToolkitButton
      </Badge>
      <Badge variant="secondary" className="text-xs">
        {TOOLKIT_BUTTON_VARIANTS.length} variants · {TOOLKIT_BUTTON_SIZES.length} sizes
      </Badge>
    </div>
  ),
};
