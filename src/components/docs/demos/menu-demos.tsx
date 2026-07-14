import { Box } from "react-feather";

import {
  SCRIBE_MENU_DEMO_COMMANDS,
  ScribeBlockMenuPort,
  ScribeDropdownMenuPort,
  ScribePopoverMenuPort,
} from "@/components/scribe";
import { Badge } from "@/components/ui/badge";

function MenuDemoFrame({ children }: { children: React.ReactNode }) {
  return <div className="scribe-app-css-vars scribe-menu-demo-frame">{children}</div>;
}

const popoverItems = Array.from({ length: 6 }, (_, index) => ({
  icon: <Box />,
  id: `popover-item-${index}`,
  label: "Label",
}));

const dropdownOptions = [
  { isFocused: true, label: "Label" },
  { label: "Label" },
  { label: "Label" },
  { label: "Label" },
  { label: "Label" },
  { label: "Label" },
];

export const menuDemos = {
  "block-menu": (
    <MenuDemoFrame>
      <ScribeBlockMenuPort commands={SCRIBE_MENU_DEMO_COMMANDS} />
    </MenuDemoFrame>
  ),
  "popover-menu": (
    <MenuDemoFrame>
      <ScribePopoverMenuPort items={popoverItems} />
    </MenuDemoFrame>
  ),
  "dropdown-menu": (
    <MenuDemoFrame>
      <ScribeDropdownMenuPort options={dropdownOptions} />
    </MenuDemoFrame>
  ),
  code: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/SlashCommandMenu/*
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/ActionMenu/index.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/src/components/shared/MoreOptionsMenu.tsx
      </Badge>
      <Badge variant="outline" className="max-w-full whitespace-normal break-all font-mono text-xs">
        Scribe/packages/toolkit/src/components/PopoverSelect/PopoverSelect.tsx
      </Badge>
      <Badge variant="secondary" className="text-xs">
        Source-backed menu ports with fixture options
      </Badge>
    </div>
  ),
};
