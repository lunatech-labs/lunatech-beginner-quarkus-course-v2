import { Context, createContext, useContext } from "react";
import { ProductService } from "~/services/productService";

export const ProductServiceContext: Context<ProductService> = createContext(
  {} as ProductService
);

export function useProductService() {
  return useContext(ProductServiceContext);
}
