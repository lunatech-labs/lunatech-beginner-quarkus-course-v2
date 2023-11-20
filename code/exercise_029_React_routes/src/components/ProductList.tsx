import { AddProduct } from "./AddProduct";
import { ProductComponent } from "./ProductComponent";
import { Product } from "~/models/Product";
import { FC } from "react";

interface Props {
  products: Product[];
}

export const ProductList: FC<Props> = ({ products }) => (
  <div>
    <h1>Product list:</h1>
    {products.map((product) => (
      <ProductComponent key={product.id} product={product} />
    ))}
    <h1>Add a product:</h1>
    <AddProduct />
  </div>
);
