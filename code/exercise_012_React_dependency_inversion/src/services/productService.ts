import { Product, ProductRequest } from "~/models/Product";
import { AsyncAction, AsyncResult } from ".";
import { Context, createContext, useContext } from "react";

export interface ProductService {
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

export const ProductServiceContext: Context<ProductService> = createContext(
  {} as ProductService,
);

export const useProductService = () => useContext(ProductServiceContext);
