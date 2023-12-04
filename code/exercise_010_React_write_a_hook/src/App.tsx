import { FC, PropsWithChildren, useReducer } from "react";
import { ProductList } from "~/components/ProductList";
import { Product } from "~/models/Product";
import { productService } from "~/services/productService";
import {
  ProductContext,
  ProductDispatchContext,
  ProductReducer,
} from "~/states/ProductState";
import { useFetch } from "./hooks/useFetch";

export const App = () => {
  const state = useFetch((signal) => productService.getAll({ signal }));

  switch (state.type) {
    case "Pending":
      return <>Loading ...</>;
    case "Failure":
      return <>Failed {JSON.stringify(state.error)}</>;
    case "Success":
      return (
        <ProductProvider initialProducts={state.data}>
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
    initialProducts,
  );
  return (
    <ProductContext.Provider value={products}>
      <ProductDispatchContext.Provider value={productReducer}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductContext.Provider>
  );
};
