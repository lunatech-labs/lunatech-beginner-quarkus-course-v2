import { useReducer } from "react";
import { ProductList } from "~/components/ProductList";
import {
  ProductContext,
  ProductDispatchContext,
  ProductReducer,
} from "~/states/ProductState";

export const App = () => {
  const [products, productReducer] = useReducer(ProductReducer, []);

  // Fetch products using `productService`

  return (
    <ProductContext.Provider value={products}>
      <ProductDispatchContext.Provider value={productReducer}>
        <ProductList />
      </ProductDispatchContext.Provider>
    </ProductContext.Provider>
  );
};
