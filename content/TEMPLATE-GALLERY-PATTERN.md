# Template gallery pattern

Canonical authoring guide for entries in the `/templates` gallery. Use this guide for page-template previews such as Content Listing, Feed Page, and Image Management. This is separate from component documentation pages.

Copy the annotated scaffold from [`_templates/template-gallery-entry.md`](_templates/template-gallery-entry.md) before adding or revising a template.

## What a template entry includes

Every standard template requires three matching pieces:

1. A reader-facing Markdown section in [`templates.md`](templates.md).
2. A runtime registry entry in [`src/data/templates.ts`](../src/data/templates.ts).
3. An approved local preview image in `public/templates/`.

`templates.md` owns the Templates page headline/dek and template `title`/`description` copy. Each template uses a normal `## Title {#id}` heading followed by its description so it is clear and editable in Obsidian. The registry owns categories, preview assets, and Scribe/Figma destinations. The site validates an exact one-to-one ID match at build time, so do not add a template to only one location.

Required entry data:

| Field | Requirement |
| --- | --- |
| `id` | Lowercase kebab-case identifier used for the asset name and `?preview=` URL. |
| `category` | One of the supported categories below. |
| `preview.url` | Live Scribe feature destination for **Open in Scribe**. |
| `preview.image` | Local visual snapshot at `/templates/<id>-preview.png`. |
| `figmaUrl` | Approved Figma frame/design destination for **Open in Figma**. |

Required vault copy in `content/templates.md`:

| Field | Requirement |
| --- | --- |
| `title` | Reader-facing Templates page headline. |
| `description` | Reader-facing Templates page dek. |
| `## Title {#id}` | Must exactly match a registry entry ID; heading text is the reader-facing template name. |
| Paragraph below heading | One concise reader-facing sentence explaining the workflow or page. |

Use `kind: "feature-url"` when the template represents a deployed Scribe feature. Do not recreate the Scribe page in the docs app.

## Categories

Current categories are:

- `Content`
- `Feeds`
- `Media`
- `Embeds`

Use an existing category whenever it fits. A new category requires both adding it to the `TemplateCategory` type and adding its reader-facing label to `TEMPLATE_CATEGORIES` in `src/data/templates.ts`; the shared page will then filter entries automatically.

## Preview assets

1. Export an approved Figma frame or provided snapshot.
2. Save it as `public/templates/<id>-preview.png`.
3. Preserve the source framing with page chrome visible at the top when possible.
4. Do not add card-specific text, overlays, or visual edits into the image. The Templates page supplies all interactive treatment.

The card uses a top-cropped thumbnail. The modal uses the same image in an `824px` top-cropped, centered preview canvas with `bg-muted/40` visible around unused space.

Raster snapshots must render at native resolution in the modal. Do not share `w-full` thumbnail sizing with modal images, and do not upscale smaller assets. An image may shrink only when needed to fit a narrow viewport.

## Inherited gallery behavior

Standard feature-url entries automatically receive:

- Category filtering under **All** and their assigned category.
- A clickable, keyboard-accessible preview surface with selectable overlay text.
- Independent **Preview**, **View Figma designs**, **Open in Scribe**, and **Open in Figma** controls.
- Direct modal navigation at `/templates?preview=<id>`.

Do not add template-specific card, modal, or filter styling for a normal entry. Reuse the existing shared gallery behavior. Propose route work only for a genuinely new preview source or interaction model.

## Authoring checklist

- [ ] Read `AGENTS.md` and this guide before changing the gallery.
- [ ] Copy `_templates/template-gallery-entry.md` and complete all required fields.
- [ ] Confirm the category is one of `Content`, `Feeds`, `Media`, or `Embeds`; update the registry category model only when adding a new family is necessary.
- [ ] Add `public/templates/<id>-preview.png` from the approved visual source.
- [ ] Add a matching `## Title {#id}` section and description to `content/templates.md` without changing shared route behavior.
- [ ] Register the matching runtime metadata in `src/data/templates.ts` without changing shared route behavior.
- [ ] Verify the card appears in **All** and its category.
- [ ] Verify card click, keyboard activation, and `/templates?preview=<id>` open the correct modal.
- [ ] Verify the Scribe and Figma actions open their intended destinations.
- [ ] Check desktop and mobile for contained previews and no document-level horizontal overflow.
