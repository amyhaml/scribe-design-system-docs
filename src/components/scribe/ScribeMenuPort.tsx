import type { ReactNode } from "react";
import {
  ArrowUpCircle,
  BarChart2,
  CheckCircle,
  Code,
  Coffee,
  FileText,
  Hash,
  Image,
  Link as LinkIcon,
  List,
  Minus,
  Play,
  Repeat,
  Search,
  ShoppingCart,
} from "react-feather";

/**
 * Source-truth visual ports for Scribe menu docs.
 * Source files:
 * - Scribe/packages/toolkit/src/components/SlashCommandMenu/index.tsx
 * - Scribe/packages/toolkit/src/components/SlashCommandMenu/SlashCommandLabel.tsx
 * - Scribe/packages/toolkit/src/components/PopoverSelect/PopoverSelect.tsx
 * - Scribe/packages/toolkit/src/components/ActionMenu/index.tsx
 * - Scribe/src/components/shared/MoreOptionsMenu.tsx
 * - Scribe/packages/toolkit/src/components/Select/ReactSelectProps.ts
 */

export type ScribeMenuCommandPort = {
  enabled?: boolean;
  header?: string;
  icon?: ReactNode;
  isFocused?: boolean;
  name: string;
  type: "header" | "embed";
};

export type ScribePopoverMenuItemPort = {
  icon?: ReactNode;
  id: string;
  label: string;
};

export type ScribeDropdownMenuOptionPort = {
  isFocused?: boolean;
  label: string;
};

function ScribeSlashCommandLabel({
  icon,
  name,
}: {
  icon?: ReactNode;
  name: string;
}) {
  return (
    <div className="scribe-block-menu-command-label" data-testid="slash-command-button">
      {icon}
      <div className="scribe-block-menu-command-name">{name}</div>
    </div>
  );
}

export function ScribeBlockMenuPort({ commands }: { commands: ScribeMenuCommandPort[] }) {
  const enabledCommands = commands.filter((command) => command.enabled !== false);

  return (
    <div className="scribe-block-menu-port" data-testid="popover-select">
      <div className="scribe-block-menu-wrapper">
        <fieldset>
          <div className="scribe-block-menu-select">
            <div className="scribe-block-menu-select-wrapper">
              <div className="scribe-block-menu-search-control" data-focused="true">
                <div className="scribe-block-menu-value-container">
                  <input
                    aria-label="Search Embeds"
                    autoFocus
                    className="scribe-block-menu-input"
                    defaultValue=""
                    placeholder="Search Embeds"
                    readOnly
                    type="text"
                  />
                </div>
                <div className="scribe-block-menu-indicators">
                  <Search data-testid="search-icon" size={16} />
                </div>
              </div>
            </div>
            <div className="scribe-block-menu-list" role="listbox">
              {enabledCommands.map((command, index) => {
                if (command.type === "header") {
                  return (
                    <div
                      className="scribe-block-menu-header header"
                      key={`${command.header}-${index}`}
                      role="presentation"
                    >
                      {command.header}
                    </div>
                  );
                }

                return (
                  <div
                    className="scribe-block-menu-option"
                    data-focused={command.isFocused ? "true" : undefined}
                    key={`${command.name}-${index}`}
                    role="option"
                  >
                    <ScribeSlashCommandLabel icon={command.icon} name={command.name} />
                  </div>
                );
              })}
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export function ScribePopoverMenuPort({ items }: { items: ScribePopoverMenuItemPort[] }) {
  return (
    <div className="scribe-popover-menu-port" data-testid="action-menu">
      <div role="menu" aria-orientation="vertical" data-testid="action-menu-container">
        {items.map((item) => (
          <div className="scribe-popover-menu-item-wrapper" key={item.id} role="menuitem">
            <div className="scribe-popover-menu-title">
              {item.icon ? <span className="scribe-popover-menu-icon">{item.icon}</span> : null}
              <label>{item.label}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScribeDropdownMenuOption({ isFocused, label }: ScribeDropdownMenuOptionPort) {
  return (
    <div
      className="scribe-dropdown-menu-option-port"
      data-focused={isFocused ? "true" : undefined}
      role="option"
    >
      <span>{label}</span>
    </div>
  );
}

export function ScribeDropdownMenuPort({
  options,
}: {
  options: ScribeDropdownMenuOptionPort[];
}) {
  return (
    <div className="scribe-dropdown-menu-port" data-testid="popover-select">
      <fieldset>
        <div className="scribe-dropdown-menu-search-control">
          <span>Search</span>
          <Search size={16} />
        </div>
        <div className="scribe-dropdown-menu-list" role="listbox">
          {options.map((option) => (
            <ScribeDropdownMenuOption key={option.label} {...option} />
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export const SCRIBE_MENU_DEMO_COMMANDS: ScribeMenuCommandPort[] = [
  { header: "Single Embeds", name: "", type: "header" },
  { icon: <Hash />, name: "Social & External", type: "embed" },
  { icon: <Code />, name: "Celtra", type: "embed" },
  { icon: <Image />, name: "Image", type: "embed" },
  { icon: <Repeat />, name: "Loop", type: "embed" },
  { icon: <Play />, name: "Video", type: "embed" },
  { icon: <LinkIcon />, name: "Editorial Links", type: "embed" },
  { icon: <FileText />, name: "PDF Link", type: "embed" },
  { icon: <Minus />, name: "Line", type: "embed" },
  { icon: <ArrowUpCircle />, name: "Accordion", type: "embed" },
  { icon: <ShoppingCart />, name: "Product", type: "embed" },
  { icon: <ShoppingCart />, name: "Product Summary", type: "embed" },
  { icon: <Coffee />, isFocused: true, name: "Recipe", type: "embed" },
  { icon: <CheckCircle />, name: "Outgrow", type: "embed" },
  { icon: <BarChart2 />, name: "Poll", type: "embed" },
  { icon: <List />, name: "Key Points", type: "embed" },
  { header: "Galleries", name: "", type: "header" },
  { icon: <Image />, name: "Image slide", type: "embed" },
  { icon: <Hash />, name: "Social slide", type: "embed" },
  { icon: <ShoppingCart />, name: "Product slide", type: "embed" },
  { icon: <Play />, name: "Video slide", type: "embed" },
  { header: "Table of contents", name: "", type: "header" },
  { icon: <List />, name: "List", type: "embed" },
];
