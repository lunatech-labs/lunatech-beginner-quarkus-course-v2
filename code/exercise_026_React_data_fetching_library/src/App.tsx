import { FC, PropsWithChildren, useReducer } from "react";
import {
  ProductContext,
  ProductDispatchContext,
  ProductReducer,
} from "~/states/ProductState";
import { ProductList } from "~/components/ProductList";
import { productService } from "~/services/productService";
import { useFetch } from "./hooks/useFetch";
import { Product } from "./models/Product";

export const App = () => {
  const initialProducts = useFetch(productService.getAll);

  switch (initialProducts.type) {
    case "Loading":
      return <>Loading ...</>;
    case "Failure":
      return <>Failed {JSON.stringify(initialProducts.error)}</>;
    case "Success":
      return (
        <ProductProvider initialProducts={initialProducts.data}>
          <ProductList />
        </ProductProvider>
      );
  }
};

const ProductProvider: FC<
  PropsWithChildren<{ initialProducts: Product[] }>
> = ({ initialProducts, children }) => {
  const [products, productReducer] = useReducer(
    ProductReducer,
    initialProducts
  );
  return (
    <ProductContext.Provider value={products}>
      <ProductDispatchContext.Provider value={productReducer}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductContext.Provider>
  );
};
