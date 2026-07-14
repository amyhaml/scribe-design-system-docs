import { ScribeBaseStatusBar, type ScribeBaseStatusBarProps } from "./ScribeBaseStatusBar";

/**
 * Port of `Scribe/src/components/shared/StatusBar/PublishedStatusBar.tsx`.
 */
export function ScribePublishedStatusBar(props: Omit<ScribeBaseStatusBarProps, "className">) {
  return <ScribeBaseStatusBar {...props} className="scribe-status-bar--published" />;
}
