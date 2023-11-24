import { ZodType, z } from "zod";

export interface Product {
  id: number;
  name: string;
  price: number;
}
export type ProductRequest = Omit<Product, "id">;
export type PartialProduct = Partial<ProductRequest>;

export const productSchema: ZodType<ProductRequest> = z.object({
  name: z.string().min(1),
  price: z.coerce.number().positive(),
});
