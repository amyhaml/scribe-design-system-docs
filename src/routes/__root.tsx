import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import scribeProductFontCss from "../scribe-product-fonts.css?url";
import scribeTokenCss from "../scribe-tokens.css?raw";
import scribeAppVarScopeCss from "../styles/scribe-app-css-var-scope.css?raw";
import scribeToolkitButtonCss from "../styles/scribe-toolkit-button.css?raw";
import scribeAlertComponentsCss from "../styles/scribe-alert-components.css?raw";
import scribeTabbedLayoutCss from "../styles/scribe-tabbed-layout.css?raw";
import scribeAppBarCss from "../styles/scribe-app-bar.css?raw";
import scribeAssetBarCss from "../styles/scribe-asset-bar.css?raw";
import scribeCardCss from "../styles/scribe-card.css?raw";
import scribeCheckboxCss from "../styles/scribe-checkbox.css?raw";
import scribeRadioInputCss from "../styles/scribe-radio-input.css?raw";
import scribeToggleCss from "../styles/scribe-toggle.css?raw";
import scribeChipCss from "../styles/scribe-chip.css?raw";
import scribeDatepickerCss from "../styles/scribe-datepicker.css?raw";
import scribeDialogCss from "../styles/scribe-dialog.css?raw";
import scribeDropzoneCss from "../styles/scribe-dropzone.css?raw";
import scribeFieldCss from "../styles/scribe-field.css?raw";
import scribeFilterCss from "../styles/scribe-filter.css?raw";
import scribeMenuCss from "../styles/scribe-menu.css?raw";
import scribeSnackbarCss from "../styles/scribe-snackbar.css?raw";
import scribeSwitchCss from "../styles/scribe-switch.css?raw";
import scribeTableCss from "../styles/scribe-table.css?raw";
import scribeTooltipCss from "../styles/scribe-tooltip.css?raw";
import scribeTreeMenuCss from "../styles/scribe-tree-menu.css?raw";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppSidebar } from "@/components/docs/AppSidebar";
import { DocsGlobalNav } from "@/components/docs/DocsTopNav";
import { storybookIndexQuery, EMPTY_STORYBOOK_INDEX, type StorybookIndex } from "@/lib/storybook";
import { SidebarProvider } from "@/components/ui/sidebar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          That doc doesn't exist. Try the sidebar.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: async ({ context }) => {
    try {
      const storybookIndex = await context.queryClient.ensureQueryData(storybookIndexQuery);
      return { storybookIndex } as { storybookIndex: StorybookIndex };
    } catch (e) {
      console.error("[scribe-docs] Root Storybook prefetch failed", e);
      return { storybookIndex: EMPTY_STORYBOOK_INDEX };
    }
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Scribe Design System" },
      {
        name: "description",
        content:
          "Documentation for the Scribe design system — foundations, components, and usage guidelines.",
      },
      { name: "author", content: "Hearst" },
      { property: "og:title", content: "Scribe Design System" },
      { property: "og:description", content: "Documentation for the Scribe design system." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: scribeProductFontCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style data-scribe-tokens dangerouslySetInnerHTML={{ __html: scribeTokenCss }} />
        <style
          data-scribe-toolkit-button
          dangerouslySetInnerHTML={{
            __html: `${scribeAppVarScopeCss}\n${scribeToolkitButtonCss}\n${scribeAlertComponentsCss}\n${scribeTabbedLayoutCss}\n${scribeAppBarCss}\n${scribeAssetBarCss}\n${scribeCardCss}\n${scribeCheckboxCss}\n${scribeRadioInputCss}\n${scribeToggleCss}\n${scribeTableCss}\n${scribeTooltipCss}\n${scribeTreeMenuCss}\n${scribeChipCss}\n${scribeDatepickerCss}\n${scribeDialogCss}\n${scribeDropzoneCss}\n${scribeFieldCss}\n${scribeFilterCss}\n${scribeMenuCss}\n${scribeSnackbarCss}\n${scribeSwitchCss}`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { storybookIndex } = Route.useLoaderData();

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <DocsGlobalNav storybookIndex={storybookIndex} />
            <main className="min-w-0 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
