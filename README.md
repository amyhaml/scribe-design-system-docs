# Scribe Design System Docs

Source-truth documentation for the Scribe design system. This repo documents Scribe components, foundations, and usage guidance with a practical split between Obsidian-authored prose and source-backed React demos.

## What This Is

The Scribe Design System Docs site is a contributor-facing reference for Scribe UI. It brings together:

- Production Scribe source as the implementation source of truth for curated component demos.
- Figma library links for design intent, specs, and design-system context.
- Storybook references for legacy or generated component previews.
- An Obsidian-compatible content vault for documentation prose and page authoring guidelines.

Curated component pages should explain how a component is used and show source-faithful examples. Figma and screenshots can guide which variants belong on a page, but production Scribe code defines the rendered structure, styling, spacing, and behavior.

## Quick Links

- [Production Scribe repo](https://github.com/Media-Platforms/scribe)
- [Scribe Storybook](https://scribe.kubefeature.hearstapps.net/storybook)
- [Scribe Component Library](https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library?node-id=0-1&p=f&t=qxkyYWkYPUXaJ9Gg-0)
- [Scribe Design Hub](https://www.figma.com/files/808763229014323054/project/7007200?fuid=808767909425642877)
- [Deployed docs](https://scribe-design-system-docs.vercel.app/)

## Running Locally

Install dependencies:

```sh
npm install
```

Start the docs app:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Preview a production build:

```sh
npm run preview
```

Useful content scripts:

```sh
npm run scaffold:components
npm run refresh:component-content
npm run audit:icons
```

## How Documentation Works

Documentation is split between markdown content and React-rendered demos:

- `content/` contains documentation prose and frontmatter. It is the Obsidian-compatible vault.
- `src/routes/` connects markdown pages and demo registries to app routes.
- `src/components/scribe/` contains source-backed Scribe component ports.
- `src/components/docs/demos/` contains the page demos that render those ports with fixture data.
- `src/data/component-figma-links.ts` maps component slugs to Figma nodes for `Open in Figma` links.

Markdown drives page title, description, overview copy, section prose, table of contents, and code notes. React handles live demos, Storybook iframe previews, token visuals, and source-backed component examples.

## Obsidian Vault

Open `content/` as an Obsidian vault when editing docs prose. Cursor or another editor also works because the vault is plain markdown.

The vault includes:

- Component documentation in `content/components/`.
- Foundation pages in `content/foundations/`.
- The Overview page frontmatter in `content/getting-started/`.
- Component authoring rules in `content/COMPONENT-PAGE-PATTERN.md`.
- Agent/source-truth guidelines in `content/AGENTS.md`.
- Page templates in `content/_templates/`.

For vault-specific details, read [content/README.md](content/README.md).

## Live Design Guidance Skill

The `scribe-design-guidance` Codex skill is the design-decision layer for Scribe UI work. After one local installation, Codex can apply it automatically to normal requests that create, change, review, or propose Scribe interfaces. It retrieves the latest pushed guidance from this repository's `main` branch for component choice, typography, semantic color, spacing, and accessibility decisions; it never recommends documentation ports or imports.

Install it from a clone of this repository:

```sh
node skills/scribe-design-guidance/scripts/install-skill.mjs
```

The installation lives in the designer's `~/.codex/skills` directory, not in a Scribe checkout. Public repositories require no GitHub authentication; private repositories can use GitHub CLI authentication or `SCRIBE_DESIGN_GUIDANCE_TOKEN`. The skill also retries public reads without a locally configured token when that token is rejected, then caches the last successful revision for offline fallback.

Designers can work normally in a Scribe checkout. For requests that clearly concern Scribe UI, Codex can load the skill implicitly; for vague requests or a deterministic check, invoke `$scribe-design-guidance` explicitly. Update [content/AI-DESIGN-GUIDE.md](content/AI-DESIGN-GUIDE.md) and the referenced vault pages, then push to `main`; designers do not need to reinstall the skill.

## Creating Or Updating Component Pages

Before creating or editing component documentation, read:

- [content/README.md](content/README.md)
- [content/AGENTS.md](content/AGENTS.md)
- [content/COMPONENT-PAGE-PATTERN.md](content/COMPONENT-PAGE-PATTERN.md)
- [content/_templates/component-page.md](content/_templates/component-page.md)

Use the bespoke page pattern for curated, source-truth component pages. Use the hybrid Storybook pattern for pages that are primarily generated from Storybook and enriched with vault prose.

When promoting an existing Storybook page into a curated component page, keep the existing route, pin the component under the curated `Components` sidebar group, and preserve the Storybook preview under `Overview` as a reference.

## Project Structure

```txt
content/                         Obsidian vault and docs prose
content/components/              Component markdown pages
content/foundations/             Foundation markdown pages
src/components/scribe/           Source-backed Scribe component ports
src/components/docs/demos/        Curated component demo registries
src/components/docs/             Docs shell, sidebar, search, preview helpers
src/data/component-figma-links.ts Figma node registry for component pages
src/routes/                      TanStack route files
public/                          Static assets and overview thumbnails
scripts/                         Content scaffolding and audit utilities
```

## Quality Checks

Run the production build before committing documentation or demo changes:

```sh
npm run build
```

Use focused browser checks for visual changes. For source-truth component pages, compare against production Scribe source and live Scribe behavior rather than patching visual drift with screenshot-only CSS.
