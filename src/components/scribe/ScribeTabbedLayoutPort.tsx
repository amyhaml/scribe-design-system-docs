import { useEffect, useRef, useState, type ReactNode, type SyntheticEvent } from "react";

export type ScribeTabItemPort = {
  content: ReactNode;
  label: ReactNode;
  name?: string;
  isDisabled?: boolean;
  isHidden?: boolean;
  onClick?: () => void;
  missingFieldsCount?: number;
  missingFieldsCountBackgroundColor?: string;
  missingFieldsCountTextColor?: string;
};

export type ScribeRightButtonPort = {
  id: string;
  label: string;
  onClick: () => void;
};

export type ScribeTabbedLayoutPortProps = {
  activeTab?: number;
  backgroundColor?: string;
  canChangeTabs?: boolean;
  className?: string;
  isActiveTabEnabled?: boolean;
  onChange?: (event: SyntheticEvent, newValue?: number) => void;
  onCollapse?: () => void;
  rightButtons?: ScribeRightButtonPort[];
  tabs: ScribeTabItemPort[];
  testId?: string;
  uniqueId?: string;
  unmountOnHide?: boolean;
};

const DEFAULT_UNIQUE_ID = "scribe-tabs";

function getTabId(index: number, uniqueId: string) {
  return `${uniqueId}-tab-${index}`;
}

function getTabPanelId(index: number, uniqueId: string) {
  return `${uniqueId}-tabpanel-${index}`;
}

function getKey(prefix: string, tab: ScribeTabItemPort) {
  return `${prefix}-${tab.name ?? String(tab.label)}`;
}

/**
 * Source-truth port of:
 * - Scribe/src/components/shared/TabbedLayout/index.tsx
 * - Scribe/src/components/shared/TabbedLayout/TabPanel.tsx
 *
 * Docs-only difference: MUI Tabs/Tab are represented with equivalent button markup because
 * this docs repo does not install @mui/material.
 */
export function ScribeTabbedLayoutPort({
  activeTab = 0,
  backgroundColor,
  canChangeTabs = true,
  className = "",
  isActiveTabEnabled = false,
  onChange,
  onCollapse,
  rightButtons,
  tabs,
  testId = "tab-layout-container",
  uniqueId: defaultUniqueId = DEFAULT_UNIQUE_ID,
  unmountOnHide = true,
}: ScribeTabbedLayoutPortProps) {
  const [tabValue, setTabValue] = useState(activeTab);
  const uniqueId = defaultUniqueId;
  const timeoutRef = useRef<number | undefined>();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    onChange?.(event, newValue);
    if (canChangeTabs) {
      setTabValue(newValue);
    }
  };

  useEffect(
    () => () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  useEffect(() => {
    if (isActiveTabEnabled && activeTab !== tabValue) {
      setTabValue(activeTab);
    }
  }, [activeTab, isActiveTabEnabled, tabValue]);

  if (isActiveTabEnabled && activeTab !== tabValue) {
    return undefined;
  }

  const hasRightElements = Boolean(onCollapse || (rightButtons && rightButtons.length > 0));

  return (
    <div className="scribe-tabbed-layout-port" data-testid={testId}>
      <div
        className={`scribe-tabbed-layout-port-tabs-container tabs-collapse-container ${
          hasRightElements ? "hasCollapse" : ""
        }`}
        style={{ backgroundColor }}
      >
        {onCollapse ? (
          <button
            aria-label="Close"
            className="scribe-tabbed-layout-port-collapse-button"
            data-for="collapse-button-tooltip"
            data-place="left"
            data-tip="Close"
            onClick={onCollapse}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="icon"
              fill="none"
              height="1.375rem"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="1.375rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="13 17 18 12 13 7" />
              <polyline points="6 17 11 12 6 7" />
            </svg>
          </button>
        ) : null}
        {hasRightElements ? (
          <div className="scribe-tabbed-layout-port-right-buttons" data-testid="right-buttons-container">
            {rightButtons?.map((button, index) => (
              <button
                key={button.id}
                className="scribe-tabbed-layout-port-right-button"
                data-testid={`right-button-${index}`}
                onClick={button.onClick}
                type="button"
              >
                {button.label}
              </button>
            ))}
          </div>
        ) : null}
        <div
          aria-label="Tabs"
          className={`scribe-tabbed-layout-port-tabs ${className}`}
          role="tablist"
        >
          {tabs.map((tab, index) => {
            const isSelected = tabValue === index;
            return (
              <button
                key={getKey("tab", tab)}
                aria-controls={getTabPanelId(index, uniqueId)}
                aria-selected={isSelected}
                className="scribe-tabbed-layout-port-tab MuiButtonBase-root MuiTab-root"
                data-selected={isSelected ? "true" : "false"}
                data-testid={`tab-${index}`}
                disabled={tab.isDisabled}
                hidden={tab.isHidden}
                id={getTabId(index, uniqueId)}
                onClick={(event) => {
                  tab.onClick?.();
                  handleChange(event, index);
                }}
                role="tab"
                tabIndex={0}
                type="button"
              >
                <span>{tab.label}</span>
                {tab.missingFieldsCount && tab.missingFieldsCount > 0 ? (
                  <span
                    className="scribe-tabbed-layout-port-badge"
                    data-testid={`tab-badge-${index}`}
                    style={{
                      backgroundColor: tab.missingFieldsCountBackgroundColor
                        ? `var(--${tab.missingFieldsCountBackgroundColor})`
                        : undefined,
                      color: tab.missingFieldsCountTextColor
                        ? `var(--${tab.missingFieldsCountTextColor})`
                        : undefined,
                    }}
                  >
                    {tab.missingFieldsCount}
                  </span>
                ) : null}
              </button>
            );
          })}
          <span className="scribe-tabbed-layout-port-indicator tab-indicator" />
        </div>
      </div>
      {tabs.map((tab, index) => {
        const isActive = tabValue === index;
        const shouldRender = unmountOnHide ? isActive : true;
        return (
          <div
            aria-labelledby={getTabId(index, uniqueId)}
            className="scribe-tabbed-layout-port-panel"
            hidden={!isActive}
            id={getTabPanelId(index, uniqueId)}
            key={getKey("tabpanel", tab)}
            role="tabpanel"
          >
            {shouldRender ? tab.content : null}
          </div>
        );
      })}
    </div>
  );
}
