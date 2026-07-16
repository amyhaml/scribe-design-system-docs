export type TemplateCategory = "Content";

export type DocsTemplate = {
  id: string;
  title: string;
  category: TemplateCategory;
  description: string;
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

export const DOCS_TEMPLATES: DocsTemplate[] = [
  {
    id: "content-listing",
    title: "Content Listing",
    category: "Content",
    description: "Browse and manage content with search, filters, sorting, and listing cards.",
    preview: {
      kind: "feature-url",
      url: "https://scribe.kubefeature.hearstapps.net/creation/content",
      image: "/templates/content-listing-preview.png",
    },
    figmaUrl:
      "https://www.figma.com/design/jPGONCgk0YXnxIsI6mRT5f/Content-Editor---Embeds?node-id=15768-30871&p=f&t=CvOZdMKKQcWR2XiG-0",
  },
];

export const TEMPLATE_CATEGORIES: Array<"All" | TemplateCategory> = ["All", "Content"];
