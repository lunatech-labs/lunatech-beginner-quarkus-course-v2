import { useQuery } from "@tanstack/react-query";
import { productService } from "~/services/productService";
import { AddProduct } from "./AddProduct";
import { ProductComponent } from "./ProductComponent";

export const ProductList = () => {
  const products = useQuery({
    queryKey: ["products"],
    queryFn: productService.getAll,
  });

  if (products.isPending) {
    return <>Loading ...</>;
  } else if (products.isError) {
    return <>Failed to fetch products: {products.error.message}</>;
  } else {
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
