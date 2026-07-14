import { queryOptions } from "@tanstack/react-query";

export const STORYBOOK_PROXY_BASE = "/api/sb";

/** Must match `src/routes/api/sb.$.ts`. Used for SSR: Node `fetch` cannot use relative `/api/...` URLs. */
export const STORYBOOK_UPSTREAM_BASE = "https://scribe.kubefeature.hearstapps.net/storybook";

export type StoryEntry = {
  type: "story" | "docs";
  id: string;
  name: string;
  title: string;
  importPath: string;
  tags?: string[];
};

export type StorybookIndex = {
  v: number;
  entries: Record<string, StoryEntry>;
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type ComponentDoc = {
  slug: string;
  title: string;
  displayName: string;
  group: string;
  importPath: string;
  stories: StoryEntry[];
};

const GROUP_ALIASES: Record<string, string> = {
  shared: "Shared",
  icons: "Icons",
  components: "Components",
};

function parseTitle(title: string): { group: string; displayName: string } {
  if (title.includes("/")) {
    const segments = title.split("/");
    const first = segments[0];
    const groupKey = first.toLowerCase();
    const group = GROUP_ALIASES[groupKey] ?? first;
    const displayName = segments.slice(1).join(" / ");
    return { group, displayName };
  }
  return { group: "Components", displayName: title };
}

export function buildComponentList(index: StorybookIndex): ComponentDoc[] {
  const byTitle = new Map<string, ComponentDoc>();
  for (const entry of Object.values(index.entries)) {
    if (entry.type !== "story") continue;
    const existing = byTitle.get(entry.title);
    if (existing) {
      existing.stories.push(entry);
      continue;
    }
    const { group, displayName } = parseTitle(entry.title);
    byTitle.set(entry.title, {
      slug: slugify(entry.title),
      title: entry.title,
      displayName,
      group,
      importPath: entry.importPath,
      stories: [entry],
    });
  }
  return Array.from(byTitle.values()).sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export type GroupedComponents = { group: string; items: ComponentDoc[] }[];

export function groupComponents(components: ComponentDoc[]): GroupedComponents {
  const groups = new Map<string, ComponentDoc[]>();
  for (const c of components) {
    const list = groups.get(c.group) ?? [];
    list.push(c);
    groups.set(c.group, list);
  }
  const order = ["Components", "Shared", "Icons"];
  return Array.from(groups.entries())
    .sort(([a], [b]) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    })
    .map(([group, items]) => ({
      group,
      items: items.sort((a, b) => a.displayName.localeCompare(b.displayName)),
    }));
}

/** Serialize Storybook iframe `args` (semicolon-separated `key:value` pairs). */
export function serializeStorybookArgs(args: Record<string, string | number | boolean>): string {
  return Object.entries(args)
    .map(([key, val]) => `${key}:${typeof val === "string" ? val : String(val)}`)
    .join(";");
}

/** Fallback when Storybook cannot be reached (offline, VPN, or HTTP errors). Keeps SSR from 500ing. */
export const EMPTY_STORYBOOK_INDEX: StorybookIndex = { v: 0, entries: {} };

export async function fetchStorybookIndex(): Promise<StorybookIndex> {
  try {
    const url =
      typeof window === "undefined"
        ? `${STORYBOOK_UPSTREAM_BASE}/index.json`
        : `${STORYBOOK_PROXY_BASE}/index.json`;
    const res = await fetch(url, {
      headers: typeof window === "undefined" ? { "user-agent": "scribe-docs-ssr" } : undefined,
    });
    if (!res.ok) {
      console.error(`[scribe-docs] Storybook index HTTP ${res.status} for ${url}`);
      return EMPTY_STORYBOOK_INDEX;
    }
    const data = (await res.json()) as StorybookIndex;
    if (!data || typeof data !== "object" || !data.entries || typeof data.entries !== "object") {
      console.error("[scribe-docs] Storybook index.json had an unexpected shape");
      return EMPTY_STORYBOOK_INDEX;
    }
    return data;
  } catch (e) {
    console.error("[scribe-docs] Storybook index fetch failed", e);
    return EMPTY_STORYBOOK_INDEX;
  }
}

export const storybookIndexQuery = queryOptions({
  queryKey: ["storybook-index"],
  queryFn: fetchStorybookIndex,
  staleTime: 5 * 60 * 1000,
});

export function storyIframeSrc(
  storyId: string,
  opts?: {
    dark?: boolean;
    /** Forwarded to Storybook as URL `args` when the story defines matching controls. */
    args?: Record<string, string | number | boolean>;
  },
) {
  const params = new URLSearchParams({ id: storyId, viewMode: "story" });
  if (opts?.dark) params.set("globals", "backgrounds.value:!hex(1a1a1a)");
  if (opts?.args && Object.keys(opts.args).length > 0) {
    params.set("args", serializeStorybookArgs(opts.args));
  }
  return `${STORYBOOK_PROXY_BASE}/iframe.html?${params.toString()}`;
}

export function upstreamStorybookStoryUrl(storyId: string) {
  return `${STORYBOOK_UPSTREAM_BASE}/?path=/story/${storyId}`;
}
