import { createFileRoute } from "@tanstack/react-router";

import { STORYBOOK_UPSTREAM_BASE } from "@/lib/storybook";

// Same-origin proxy for Scribe's Storybook so we can embed it in iframes.
// Upstream sends X-Frame-Options: SAMEORIGIN, which blocks cross-origin
// framing. By proxying through our own domain, the iframe is same-origin.
//
// The iframe.html uses relative asset paths (./sb-common-assets/...), so
// when accessed at /api/sb/iframe.html the asset URLs resolve correctly
// under /api/sb/sb-common-assets/... and get forwarded too.
export const Route = createFileRoute("/api/sb/$")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const splat = (params as { _splat?: string })._splat ?? "";
        const url = new URL(request.url);
        const target = `${STORYBOOK_UPSTREAM_BASE}/${splat}${url.search}`;

        // Request uncompressed bytes. Node's fetch transparently gunzips responses but can
        // still expose the *compressed* Content-Length; forwarding that alongside the
        // decompressed stream truncates JS in the browser → SyntaxError / blank Storybook.
        const upstream = await fetch(target, {
          headers: {
            "user-agent": "scribe-docs-proxy",
            "accept-encoding": "identity",
          },
        });

        const headers = new Headers();
        // Copy a safe subset of headers; strip framing/CSP restrictions.
        const passthrough = [
          "content-type",
          "content-length",
          "cache-control",
          "etag",
          "last-modified",
        ];
        for (const key of passthrough) {
          const value = upstream.headers.get(key);
          if (value) headers.set(key, value);
        }

        return new Response(upstream.body, {
          status: upstream.status,
          headers,
        });
      },
    },
  },
});
