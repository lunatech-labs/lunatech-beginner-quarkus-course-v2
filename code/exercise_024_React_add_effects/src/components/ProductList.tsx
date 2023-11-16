import { useContext } from "react";
import { ProductContext } from "~/states/ProductState";
import { AddProduct } from "./AddProduct";
import { ProductComponent } from "./ProductComponent";

export const ProductList = () => {
  const products = useContext(ProductContext);
  return (
    <div>
      <h1>Product list:</h1>
      {products.map((product) => (
        <ProductComponent key={product.id} product={product} />
      ))}
      <h1>Add a product:</h1>
      <AddProduct />
    </div>
  );
};
