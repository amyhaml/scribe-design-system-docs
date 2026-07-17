export type TemplateCategory = "Content" | "Feeds" | "Media" | "Embeds";

export type TemplateDefinition = {
  id: string;
  category: TemplateCategory;
  preview:
    | {
      kind: "feature-url";
      url: string;
      image?: string;
      }
    | {
        kind: "storybook";
        storyId: string;
      };
  figmaUrl?: string;
};

export const DOCS_TEMPLATES: TemplateDefinition[] = [
  {
    id: "content-listing",
    category: "Content",
    preview: {
      kind: "feature-url",
      url: "https://scribe.kubefeature.hearstapps.net/creation/content",
      image: "/templates/content-listing-preview.png",
    },
    figmaUrl:
      "https://www.figma.com/design/jPGONCgk0YXnxIsI6mRT5f/Content-Editor---Embeds?node-id=15768-30871&p=f&t=CvOZdMKKQcWR2XiG-0",
  },
  {
    id: "content-editor",
    category: "Content",
    preview: {
      kind: "feature-url",
      url: "https://scribe.kubefeature.hearstapps.net/creation/content",
      image: "/templates/content-editor-preview.png?v=20260717",
    },
    figmaUrl:
      "https://www.figma.com/design/jPGONCgk0YXnxIsI6mRT5f/Content-Editor---Embeds?node-id=15360-15208&t=CvOZdMKKQcWR2XiG-0",
  },
  {
    id: "content-header",
    category: "Content",
    preview: {
      kind: "feature-url",
      url: "https://scribe.kubefeature.hearstapps.net/creation/content",
      image: "/templates/content-header-preview.png?v=20260717",
    },
    figmaUrl:
      "https://www.figma.com/design/Nn8A7jKcWKOhZPvGcmJSvp/Content-Header?node-id=6346-83759&t=odWl1iagUVevvimQ-0",
  },
  {
    id: "feed-page",
    category: "Feeds",
    preview: {
      kind: "feature-url",
      url: "https://scribe.kubefeature.hearstapps.net/feeds/homepage",
      image: "/templates/feed-page-preview.png",
    },
    figmaUrl:
      "https://www.figma.com/design/cONTtQVVaSgAeJEG2tScfu/Feed-Pages?node-id=236-8215&p=f&t=N7KcvYfBx8odhzkd-0",
  },
  {
    id: "image-management",
    category: "Media",
    preview: {
      kind: "feature-url",
      url: "https://scribe.kubefeature.hearstapps.net/creation/images",
      image: "/templates/image-management-preview.png",
    },
    figmaUrl:
      "https://www.figma.com/design/cSVX0WKqoOb7rWQbt3v7Y4/Images?node-id=5852-6087&t=c1VvRX8Dfcn4nY95-0",
  },
  {
    id: "recipe",
    category: "Embeds",
    preview: {
      kind: "feature-url",
      url: "https://scribe.kubefeature.hearstapps.net/creation/content",
      image: "/templates/recipe-preview.png",
    },
    figmaUrl:
      "https://www.figma.com/design/jPGONCgk0YXnxIsI6mRT5f/Content-Editor---Embeds?node-id=11955-226&p=f&t=UyYOyCgHQIVyZhHy-0",
  },
];

export const TEMPLATE_CATEGORIES: Array<"All" | TemplateCategory> = [
  "All",
  "Content",
  "Feeds",
  "Media",
  "Embeds",
];
