import { ProductList } from "~/components/ProductList";
import { useProductService } from "~/services/productService";

export const ProductsPage = () => {
  const productService = useProductService();
  const products = productService.useProductList();

  switch (products.type) {
    case "Pending":
      return <>Loading ...</>;
    case "Failure":
      return <>Failed: {products.error.message}</>;
    case "Success":
      return <ProductList products={products.data} />;
  }
};
