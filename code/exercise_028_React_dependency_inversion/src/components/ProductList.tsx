import { useProductService } from "~/services/productService";
import { AddProduct } from "./AddProduct";
import { ProductComponent } from "./ProductComponent";

export const ProductList = () => {
  const productService = useProductService();
  const products = productService.useProductList();

  switch (products.type) {
    case "Pending":
      return <>Loading ...</>;
    case "Failure":
      return <>Failed to fetch products: {products.error.message}</>;
    case "Success":
      return (
        <div>
          <h1>Product list:</h1>
          {products.data.map((product) => (
            <ProductComponent key={product.id} product={product} />
          ))}
          <h1>Add a product:</h1>
          <AddProduct />
        </div>
      );
  }
};
