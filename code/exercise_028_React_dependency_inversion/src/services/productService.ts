import { Product, ProductRequest } from "~/models/Product";
import { AsyncAction, AsyncResult } from ".";

export interface ProductService {
  useProductGet: (id: number) => AsyncResult<Product>;
  useProductList: () => AsyncResult<Product[]>;
  useProductCreate: () => AsyncAction<ProductRequest, Product>;
  useProductUpdate: () => AsyncAction<{ id: number; product: ProductRequest }>;
  useProductDelete: () => AsyncAction<{ id: number }>;
}

const products = "/api/products" as const;
const product = (id: number) => `${products}/${id}` as const;
export const ProductApi = {
  get: product,
  list: products,
  create: products,
  update: product,
  delete: product,
} as const;
