# Scribe Design System Docs

A docs site modeled on the MotorTrend reference, with a left sidebar nav and per-component pages (overview, live preview, props, code, usage).

## Sourcing strategy (this is the key decision)

I can't read your private GitHub repo or your Figma file directly:

- **GitHub** — `Media-Platforms/scribe` returns 404 to me (private).
- **Figma** — needs Lovable Desktop + the Figma local MCP connector. Not connected.
- **Storybook** at `scribe.kubefeature.hearstapps.net/storybook` ✅ — I can read its `index.json` (55 components found) and embed any story by ID via `/storybook/iframe.html?id=<story-id>`.

So the plan is:

1. **Component previews = embedded Storybook iframes.** This is genuinely 1:1 — it's literally your live components, not a re-implementation. No risk of drift, no invented props.
2. **Props tables = Storybook ArgTypes.** Storybook's `index.json` + per-story metadata expose the same prop tables Storybook renders. I'll fetch and render them.
3. **Foundations (color, type, spacing, radius, elevation)** — I need these from you. Three options, pick one:
   - (a) Connect Figma via Lovable Desktop ([install](https://lovable.dev/download), enable Dev Mode MCP, link under Settings → Connectors), then I read tokens directly.
   - (b) Export tokens from Figma as JSON (Tokens Studio / Variables export) and upload here.
   - (c) Paste the token values (hex/rem/px) and I'll codify them.
4. **Code snippets** — derived from each story's `args` (e.g. `<Avatar src="..." size="md" />`). Real source from the repo would be better; without repo access, args-based snippets are the honest 1:1 representation.

## Site structure (mirrors MotorTrend reference)

```text
Left sidebar (collapsible groups)        Main content
─────────────────────────────             ───────────────────────────────
Getting Started                          ┌─ Breadcrumb
  Introduction                           │  H1 + short description
Foundations                              │
  Color                                  │  ── Overview
  Typography                             │  ── Live preview (iframe)
  Spacing                                │     [variant tabs from stories]
  Radius                                 │  ── Props table
  Elevation                              │  ── Code (args-derived)
  Icons                                  │  ── Usage / when to use
Components (55, grouped)                 │  ── Related
  Avatar, Card, Chip, …                  └─
```

## Routes (TanStack Start, file-based)

```
src/routes/
  __root.tsx                 sidebar shell, header, theme
  index.tsx                  landing (intro + quick links)
  foundations.$token.tsx     color | typography | spacing | radius | elevation | icons
  components.$slug.tsx       one page per component, fed by Storybook index
```

Component slugs come from `index.json` titles (e.g. `Avatar` → `/components/avatar`). Categories inferred from Storybook's `Shared/`, `Icons/`, `Components/` prefixes.

## v1 scope

- Sidebar shell + theming (light/dark toggle).
- Foundations pages (placeholder values until you provide tokens).
- All 55 component pages auto-generated from Storybook `index.json`:
  - Embedded Storybook iframe (resizable, light/dark switch via Storybook globals).
  - Variant tabs (one per story under the title).
  - Props table from Storybook argTypes.
  - Args-derived code snippet with copy button.
  - Empty "Usage" / "Do / Don't" sections you can fill in later.
- Search across components (client-side over Storybook index).

## Out of scope for v1

- Patterns, Getting Started deep content, contribution guide — you said Foundations + Components only.
- Authoring system for editing docs in-app (we'd revisit if you want this).

## Technical notes

- TanStack Start + Tailwind v4, shadcn primitives already in the template.
- A small `src/lib/storybook.ts` fetches `https://scribe.kubefeature.hearstapps.net/storybook/index.json` at build/runtime and groups stories by title.
- Iframes point at `${STORYBOOK_URL}/iframe.html?id=${storyId}&viewMode=story`. URL kept in `import.meta.env.VITE_STORYBOOK_URL` so you can swap environments.
- Foundations tokens land in `src/styles.css` under `@theme` once you share them.
- CORS: `index.json` fetched OK from my side; if the browser blocks it, I'll add a tiny server function proxy.

## What I need from you before building

1. Pick a **foundations source**: (a) Figma via Desktop MCP, (b) tokens JSON upload, or (c) paste values.
2. Confirm **Storybook URL is stable** and OK to embed (CSP / X-Frame-Options on `scribe.kubefeature.hearstapps.net`). If it blocks framing, we'll need a different host or screenshots.
3. Confirm OK that **code snippets are derived from Storybook args**, not lifted from repo source.
