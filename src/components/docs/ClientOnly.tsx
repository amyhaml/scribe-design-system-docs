import { useEffect, useState, type ReactNode } from "react";

/** Renders children only after mount so SSR + first client paint match (avoids hydration mismatches). */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) return fallback;
  return children;
}
