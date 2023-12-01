import { Header } from "~/components/Header";
import { ProductList } from "~/components/ProductList";
import { useProductService } from "~/services/productService";
import { useRouter } from "~/hooks/useRouter";

export const ProductsPage = () => {
  const { useProductList } = useProductService();
  const products = useProductList();

  const router = useRouter();
  switch (products.type) {
    case "Pending":
      return <>Loading ...</>;
    case "Failure":
      return <>Failed: {products.error.message}</>;
    case "Success":
      return (
        <>
          <Header />
          <ProductList
            products={products.data}
            onClick={(product) => router(`${product.id}`)}
          />
        </>
      );
  }
};

export default ProductsPage;
