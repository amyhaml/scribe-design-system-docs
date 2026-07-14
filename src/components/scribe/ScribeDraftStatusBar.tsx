import { ScribeBaseStatusBar, type ScribeBaseStatusBarProps } from "./ScribeBaseStatusBar";

/**
 * Port of `Scribe/src/components/shared/StatusBar/DraftStatusBar.tsx`.
 */
export function ScribeDraftStatusBar(props: Omit<ScribeBaseStatusBarProps, "className">) {
  return <ScribeBaseStatusBar {...props} className="scribe-status-bar--draft" />;
}
