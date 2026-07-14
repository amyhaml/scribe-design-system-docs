import { useLayoutEffect, useState } from "react";

/**
 * Reads a custom property from :root (e.g. "background" -> --background).
 * Re-reads when the root `class` or `style` changes so theme toggles stay in sync.
 *
 * Also re-reads after paint / window load: global CSS can land after the first
 * `useLayoutEffect` pass (SSR hydration, async style chunks, dev injection). A
 * MutationObserver on `html` alone does not fire when stylesheets finish loading.
 */
export function useRootCssVar(tokenName: string): string {
  const [value, setValue] = useState("");

  useLayoutEffect(() => {
    const root = document.documentElement;

    const read = () => {
      const v = getComputedStyle(root).getPropertyValue(`--${tokenName}`).trim();
      setValue(v || "—");
    };

    read();

    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["class", "style"] });

    let rafNested = 0;
    const rafOuter = requestAnimationFrame(() => {
      read();
      rafNested = requestAnimationFrame(read);
    });

    const onLoad = () => read();
    if (document.readyState === "complete") {
      queueMicrotask(read);
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("load", onLoad);
      cancelAnimationFrame(rafOuter);
      cancelAnimationFrame(rafNested);
    };
  }, [tokenName]);

  return value;
}
