import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "../test-utils";
import { ProductList } from "~/components/ProductList";

describe("ProductComponent", () => {
  const products = [
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 19.99 },
  ];

  it("renders product list with correct titles and Fab button", () => {
    render(<ProductList products={products} onClick={() => {}} />);

    expect(screen.getByText("Product list")).toBeInTheDocument();

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`${product.price}€`)).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
  });

  it("triggers onClick when a product card is clicked", () => {
    const onClickMock = vi.fn();
    render(<ProductList products={products} onClick={onClickMock} />);

    fireEvent.click(screen.getByText("Product 1"));
    expect(onClickMock).toHaveBeenCalledWith(products[0]);

    fireEvent.click(screen.getByText("Product 2"));
    expect(onClickMock).toHaveBeenCalledWith(products[1]);
  });

  it("opens AddProductDialog when Fab button is clicked", () => {
    render(<ProductList products={products} onClick={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: "+" }));

    expect(screen.getByText("Add a product")).toBeInTheDocument();
  });

  it("handles the state correctly when a product is added", () => {
    const { rerender } = render(
      <ProductList products={products} onClick={() => {}} />,
    );

    rerender(
      <ProductList
        products={[...products, { id: 3, name: "New Product", price: 29.99 }]}
        onClick={() => {}}
      />,
    );

    expect(screen.getByText("New Product")).toBeInTheDocument();
  });
});
