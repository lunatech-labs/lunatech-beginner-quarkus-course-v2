import { FC, PropsWithChildren, useEffect, useReducer, useState } from "react";
import {
  ProductContext,
  ProductDispatchContext,
  ProductReducer,
} from "~/states/ProductState";
import { ProductList } from "~/components/ProductList";
import { productService } from "~/services/productService";
import { AsyncResult } from "~/services";
import { Product } from "~/models/Product";

export const App = () => {
  const [state, setState] = useState<AsyncResult<Product[]>>(
    AsyncResult.pending(),
  );
  useEffect(() => {
    const controller = new AbortController();
    productService
      .getAll({ signal: controller.signal })
      .then((data) => setState(AsyncResult.success(data)))
      .catch((error) => setState(AsyncResult.failure(error)));
    return () => controller.abort();
  }, [setState]);

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
