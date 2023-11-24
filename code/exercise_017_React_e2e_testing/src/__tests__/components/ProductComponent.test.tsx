import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "../test-utils";
import { ProductComponent } from "~/components/ProductComponent";

describe("ProductComponent", () => {
  const product = { id: 1, name: "Test Product", price: 10.99 };

  it("renders product details", () => {
    render(<ProductComponent product={product} />);

    expect(screen.getByText("Test Product")).toBeDefined();
    expect(screen.getByText("10.99€")).toBeDefined();
  });

  it("opens edit dialog when 'Edit' button is clicked", () => {
    render(<ProductComponent product={product} />);

    expect(screen.queryByText("Update product")).toBeNull();

    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByText("Update product")).toBeDefined();
  });
});
