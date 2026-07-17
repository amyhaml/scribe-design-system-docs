# Template gallery entry

Use with [`TEMPLATE-GALLERY-PATTERN.md`](../TEMPLATE-GALLERY-PATTERN.md). This scaffold records the source details needed before adding a normal `/templates` gallery entry.

## Entry details

- **ID:** `{lowercase-kebab-case-id}`
- **Category:** `{Content | Feeds | Media | Embeds}`
- **Live Scribe URL:** `{https://scribe.kubefeature.hearstapps.net/...}`
- **Figma URL:** `{Approved design/frame URL}`
- **Preview source:** `{Figma frame or provided snapshot}`
- **Preview asset:** `/templates/{id}-preview.png`

## Vault copy scaffold

Append this section to [`templates.md`](../templates.md):

```markdown
## {Reader-facing title} {#{id}}

{One concise sentence describing the workflow or page.}
```

## Runtime registry scaffold

```ts
{
  id: "{id}",
  category: "{Category}",
  preview: {
    kind: "feature-url",
    url: "{Live Scribe URL}",
    image: "/templates/{id}-preview.png",
  },
  figmaUrl: "{Figma URL}",
},
```

## Before marking complete

- [ ] The preview image is approved, locally stored, and named from the entry id.
- [ ] The image has not been edited to imitate gallery overlays or controls.
- [ ] `content/templates.md` has a matching `## Title {#id}` section with a non-empty description.
- [ ] `src/data/templates.ts` has the matching structural runtime metadata.
- [ ] The entry appears under **All** and the selected category.
- [ ] `/templates?preview={id}` opens the correct modal.
- [ ] **Open in Scribe** and **Open in Figma** open the intended links.
- [ ] The card and modal previews stay contained at desktop and mobile widths.
