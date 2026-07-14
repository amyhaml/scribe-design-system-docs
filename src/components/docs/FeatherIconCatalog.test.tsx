import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { FeatherIconCatalog } from "@/components/docs/FeatherIconCatalog";

function countLineText() {
  const el = screen.getByText((_, element) => {
    return element?.tagName === "P" && (element.textContent?.startsWith("Showing ") ?? false);
  });
  return el.textContent;
}

describe("FeatherIconCatalog", () => {
  it("renders search and full icon count", () => {
    render(<FeatherIconCatalog stroke={2} size={24} />);

    expect(screen.getByPlaceholderText("Search icons...")).toBeInTheDocument();
    expect(countLineText()).toBe("Showing 287 of 287.");
  });

  it("renders svg icons in the grid", () => {
    const { container } = render(<FeatherIconCatalog stroke={2} size={24} />);
    expect(container.querySelectorAll("svg").length).toBeGreaterThan(0);
  });

  it("filters icons by search query", async () => {
    const user = userEvent.setup();
    render(<FeatherIconCatalog stroke={2} size={24} />);

    await user.type(screen.getByPlaceholderText("Search icons..."), "activity");

    expect(countLineText()).toBe('Showing 1 of 287 matching “activity”.');
    expect(screen.getByText("activity")).toBeInTheDocument();
  });
});
