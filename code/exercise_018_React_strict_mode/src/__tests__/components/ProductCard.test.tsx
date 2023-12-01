import { describe, expect, it, vi } from "vitest";
import { ProductCard } from "~/components/ProductCard";
import { fireEvent, render, screen } from "../test-utils";
import { AsyncAction } from "~/services";

describe("ProductCard", () => {
  const product = { id: 1, name: "Test Product", price: 10.99 };

  it("renders product details", () => {
    render(<ProductCard product={product} onClick={() => {}} />);

    expect(screen.getByText("Test Product")).toBeDefined();
    expect(screen.getByText("10.99€")).toBeDefined();
  });

  it("triggers onClick when clicked", () => {
    const onClickMock = vi.fn();
    render(<ProductCard product={product} onClick={onClickMock} />);

    fireEvent.click(screen.getByText("Test Product"));

    expect(onClickMock).toHaveBeenCalled();
  });

  it("opens edit dialog when 'Edit' button is clicked", () => {
    render(<ProductCard product={product} onClick={() => {}} />);

    expect(screen.queryByText("Update product")).toBeNull();

    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByText("Update product")).toBeDefined();
  });

  it("call deletes product when 'Delete' button is clicked", () => {
    const deleteMutationMock: AsyncAction<{ id: number }> = AsyncAction.idle(
      vi.fn(),
    );

    render(<ProductCard product={product} onClick={() => {}} />, {
      productService: {
        useProductDelete: vi.fn(() => deleteMutationMock),
      },
    });

    fireEvent.click(screen.getByText("Delete"));

    expect(deleteMutationMock.action).toHaveBeenCalledWith({ id: 1 });
  });

  it("cannot delete while deleting", () => {
    const deleteMutationMock: AsyncAction<{ id: number }> = AsyncAction.pending(
      vi.fn(),
    );

    render(<ProductCard product={product} onClick={() => {}} />, {
      productService: {
        useProductDelete: vi.fn(() => deleteMutationMock),
      },
    });

    expect(screen.getByText("Delete")).toBeDisabled();
  });
});
