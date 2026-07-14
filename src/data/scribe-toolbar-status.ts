/**
 * `TOOLBAR_STATUS` from `Scribe/src/data/toolbar.ts` and
 * `videoTranscodingFailureNotification` from `Scribe/src/data/videos.ts`.
 */
export type ToolbarStatusItem = {
  alertBarColor: string;
  background: string;
  border?: string;
  color: string;
  id: string;
  name: string;
  textColor?: string;
};

export type NotificationBarStatus = Pick<ToolbarStatusItem, "alertBarColor" | "textColor">;

/** Mirrors `Scribe/src/data/toolbar.ts` TOOLBAR_STATUS (ids match Scribe constants). */
export const SCRIBE_TOOLBAR_STATUS = {
  archived: {
    alertBarColor: "var(--archived-muted)",
    background: "var(--archived-muted)",
    border: "var(--archived-text)",
    color: "var(--archived)",
    id: "6",
    name: "archived",
    textColor: "var(--archived-text)",
  },
  draft: {
    alertBarColor: "var(--schedule)",
    background: "var(--draft)",
    border: "var(--draft)",
    color: "var(--draft)",
    id: "1",
    name: "draft",
  },
  locked: {
    alertBarColor: "var(--locked)",
    background: "var(--locked)",
    border: "var(--locked)",
    color: "var(--locked)",
    id: "7",
    name: "locked",
    textColor: "var(--text)",
  },
  lockedUser: {
    alertBarColor: "var(--locked-user)",
    background: "var(--locked-user)",
    border: "var(--locked-border)",
    color: "var(--locked-user)",
    id: "8",
    name: "locked-user",
    textColor: "var(--locked-user)",
  },
  published: {
    alertBarColor: "var(--published-muted)",
    background: "transparent",
    border: "var(--published-text)",
    color: "var(--published)",
    id: "3",
    name: "published",
    textColor: "var(--published-text)",
  },
  scheduled: {
    alertBarColor: "var(--scheduled-muted)",
    background: "var(--scheduled-muted)",
    border: "var(--scheduled)",
    color: "var(--scheduled)",
    id: "4",
    name: "scheduled",
  },
  unpublished: {
    alertBarColor: "var(--schedule)",
    background: "var(--draft)",
    border: "var(--draft)",
    color: "var(--draft)",
    id: "5",
    name: "unpublished",
  },
} as const satisfies Record<string, ToolbarStatusItem>;

export const SCRIBE_VIDEO_TRANSCODING_FAILURE_NOTIFICATION = {
  alertBarColor: "var(--error)",
  textColor: "var(--background-paper)",
} as const satisfies NotificationBarStatus;
