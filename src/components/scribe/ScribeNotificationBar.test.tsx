import { render, screen } from "@testing-library/react";
import { Lock } from "react-feather";
import { describe, expect, it } from "vitest";

import { ScribeNotificationBar } from "@/components/scribe/ScribeNotificationBar";
import { SCRIBE_TOOLBAR_STATUS } from "@/data/scribe-toolbar-status";

describe("ScribeNotificationBar", () => {
  it("renders message text", () => {
    render(
      <div className="scribe-app-css-vars">
        <ScribeNotificationBar
          message="Showing published content only"
          status={SCRIBE_TOOLBAR_STATUS.scheduled}
        />
      </div>,
    );

    expect(screen.getByText("Showing published content only")).toBeInTheDocument();
  });

  it("renders optional lock icon", () => {
    const { container } = render(
      <div className="scribe-app-css-vars">
        <ScribeNotificationBar
          message="This content is locked by Jane Smith"
          status={SCRIBE_TOOLBAR_STATUS.locked}
          Icon={Lock}
        />
      </div>,
    );

    expect(screen.getByText("This content is locked by Jane Smith")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeTruthy();
  });
});
