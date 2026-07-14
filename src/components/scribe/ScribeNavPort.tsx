import { Bell, ChevronDown } from "react-feather";

export type ScribeNavPortProps = {
  activeListing?: string;
  tenantLabel?: string;
  userInitials?: string;
  workspaceLabel?: string;
};

/**
 * Source-truth port of:
 * - Scribe/src/components/Nav/index.tsx
 * - Scribe/src/components/Nav/NavHeader.tsx
 * - Scribe/src/components/Nav/NavActions.tsx
 * - Scribe/src/components/Nav/TenantSelectorComponent.tsx
 * - Scribe/src/components/Nav/styles.ts
 *
 * Docs-only differences: production auth/navigation/tenant stores are fixture props.
 */
export function ScribeNavPort({
  activeListing = "Home Page",
  tenantLabel = "Oprah Daily US",
  userInitials = "AH",
  workspaceLabel = "Feeds",
}: ScribeNavPortProps) {
  return (
    <nav className="scribe-nav-port-wrapper" aria-expanded="false" aria-label="Navigation">
      <div
        className="scribe-nav-port-nav-wrapper"
        data-testid="main-nav"
        data-open="false"
        data-panel-open="false"
      >
        <div
          className="scribe-nav-port-content-wrapper"
          data-testid="nav-content-wrapper"
          data-environment="feature"
        >
          <div className="scribe-nav-port-logo-wrapper">
            <img className="scribe-nav-port-logo" src="/logo-narrow.svg" alt="Scribe" width="28" height="27" />
            <img className="scribe-nav-port-logo-wide" src="/logo-wide.svg" alt="Scribe" width="80" height="20" />
          </div>
          <div className="scribe-nav-port-workspace-selector-wrapper">
            <button
              className="scribe-nav-port-workspace-selector"
              aria-label="Open navigation"
              data-testid="open-navigation"
              type="button"
            >
              <h1 className="scribe-nav-port-workspace" data-testid="page-header">
                {workspaceLabel}
              </h1>{" "}
              <ChevronDown size="17" aria-hidden />
            </button>
            {activeListing ? (
              <a className="scribe-nav-port-workspace-link-anchor" href="/">
                <h1 className="scribe-nav-port-workspace-link">{activeListing}</h1>
              </a>
            ) : null}
          </div>
          <button className="scribe-nav-port-tenant-selector" aria-label="Select site" type="button">
            <span>{tenantLabel}</span>
            <ChevronDown size="17" aria-hidden />
          </button>
          <button className="scribe-nav-port-notifications" aria-label="Notifications" type="button">
            <Bell size="19" aria-hidden />
          </button>
          <button
            className="scribe-nav-port-user-button"
            aria-label="User options"
            aria-haspopup="true"
            aria-expanded="false"
            data-testid="user-options"
            type="button"
          >
            <span className="scribe-nav-port-avatar">{userInitials}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
