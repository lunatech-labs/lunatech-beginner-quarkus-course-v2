import { Validate } from ".";

export interface Product {
  id: number;
  name: string;
  price: number;
}
export type ProductRequest = Omit<Product, "id">;
export type PartialProduct = Partial<ProductRequest>;

export const validateProduct: (
  p: PartialProduct,
) => Validate<ProductRequest> = (p) => {
  if (!p.name) {
    return { type: "invalid", msg: "Missing field `name`" };
  } else if (p.name.length <= 0) {
    return { type: "invalid", msg: "Field `name` cannot be empty" };
  } else if (!p.price) {
    return { type: "invalid", msg: "Missing field `price`" };
  } else if (p.price <= 0) {
    return { type: "invalid", msg: "Field `price` should be > 0" };
  } else {
    const product = { name: p.name, price: p.price };
    return { type: "valid", data: product };
  }
};
