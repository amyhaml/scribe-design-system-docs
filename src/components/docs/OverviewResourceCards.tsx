const GITHUB_REPO_URL = "https://github.com/Media-Platforms/scribe";
const FIGMA_HUB_URL =
  "https://www.figma.com/files/808763229014323054/project/7007200?fuid=808767909425642877";
const FIGMA_COMPONENT_LIBRARY_URL =
  "https://www.figma.com/design/j9rEb1JK8RdH7bs1Q74qJK/Scribe-Component-Library?node-id=0-1&p=f&t=qxkyYWkYPUXaJ9Gg-0";

type OverviewResourceCard = {
  description: string;
  href: string;
  image?: string;
  title: string;
  visual: "github" | "image";
};

const resourceCards: OverviewResourceCard[] = [
  {
    description: "Library of reusable Scribe components for designers",
    href: FIGMA_COMPONENT_LIBRARY_URL,
    image: "/overview/component-library-cover.png",
    title: "Figma Component Library",
    visual: "image",
  },
  {
    description: "Figma hub with design files and workflows related to Scribe",
    href: FIGMA_HUB_URL,
    image: "/overview/scribe-hub.png",
    title: "Design Figma Files",
    visual: "image",
  },
  {
    description: "Scribe github repository",
    href: GITHUB_REPO_URL,
    title: "Scribe Repo",
    visual: "github",
  },
];

function GitHubCardVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#111111] text-white">
      <div className="flex flex-col items-center gap-4">
        <svg className="h-16 w-16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.59 2 12.253c0 4.532 2.865 8.374 6.839 9.731.5.095.682-.222.682-.494 0-.244-.009-1.055-.014-1.915-2.782.62-3.369-1.217-3.369-1.217-.455-1.185-1.11-1.5-1.11-1.5-.908-.637.069-.624.069-.624 1.004.072 1.532 1.057 1.532 1.057.892 1.568 2.34 1.115 2.91.853.091-.663.35-1.115.636-1.372-2.221-.259-4.556-1.139-4.556-5.067 0-1.119.39-2.034 1.03-2.751-.103-.26-.446-1.302.098-2.713 0 0 .84-.276 2.75 1.051A9.423 9.423 0 0 1 12 6.946a9.42 9.42 0 0 1 2.504.346c1.91-1.327 2.748-1.05 2.748-1.05.546 1.41.203 2.452.1 2.712.64.717 1.028 1.632 1.028 2.751 0 3.938-2.338 4.805-4.566 5.059.359.317.679.943.679 1.901 0 1.372-.013 2.478-.013 2.815 0 .274.18.594.688.493C19.138 20.613 22 16.773 22 12.253 22 6.59 17.523 2 12 2Z"
          />
        </svg>
        <span className="text-sm font-semibold tracking-tight">Media-Platforms / scribe</span>
      </div>
    </div>
  );
}

function ResourceCardVisual({ card }: { card: OverviewResourceCard }) {
  if (card.visual === "github") {
    return <GitHubCardVisual />;
  }

  return <img src={card.image} alt="" className="h-full w-full object-cover" loading="lazy" />;
}

export function OverviewResourceCards() {
  return (
    <section aria-label="Scribe resources" className="space-y-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        RESOURCES
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {resourceCards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-2xl border bg-background shadow-sm transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={card.title}
          >
            <div className="aspect-[16/7] overflow-hidden border-b bg-muted/40">
              <ResourceCardVisual card={card} />
            </div>
            <div className="space-y-3 p-5">
              <div>
                <h2 className="text-base font-semibold text-foreground">{card.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
