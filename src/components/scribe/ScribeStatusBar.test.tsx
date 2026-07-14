import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  ScribeDraftStatusBar,
  ScribePublishedStatusBar,
  ScribeScheduledStatusBar,
} from "@/components/scribe";

describe("Scribe status bars", () => {
  it("renders draft status label", () => {
    render(
      <div className="scribe-app-css-vars">
        <ScribeDraftStatusBar statusText="DRAFT" />
      </div>,
    );
    expect(screen.getByText("DRAFT")).toBeInTheDocument();
  });

  it("renders scheduled banner text and reschedule control", () => {
    const onReschedule = vi.fn();
    render(
      <div className="scribe-app-css-vars">
        <ScribeScheduledStatusBar
          statusText="SCHEDULED"
          bannerText="This content will be published on Mar 24, 2026 at 9:00 AM"
          onReschedule={onReschedule}
        />
      </div>,
    );

    expect(screen.getByText("SCHEDULED")).toBeInTheDocument();
    expect(
      screen.getByText("This content will be published on Mar 24, 2026 at 9:00 AM"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reschedule" })).toBeInTheDocument();
  });

  it("renders published live banner", () => {
    render(
      <div className="scribe-app-css-vars">
        <ScribePublishedStatusBar
          statusText="LIVE"
          bannerText="Last published on Mar 20, 2026 at 2:30 PM"
        />
      </div>,
    );

    expect(screen.getByText("LIVE")).toBeInTheDocument();
    expect(screen.getByText("Last published on Mar 20, 2026 at 2:30 PM")).toBeInTheDocument();
  });
});
