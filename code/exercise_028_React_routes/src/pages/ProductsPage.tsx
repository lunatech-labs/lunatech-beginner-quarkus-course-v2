import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { AddProduct } from "~/components/AddProduct";
import { ProductComponent } from "~/components/ProductComponent";
import { Product } from "~/models/Product";
import { productService } from "~/services/productService";

export const loader = (queryClient: QueryClient) => async () =>
  queryClient.getQueryData(productsQuery.queryKey) ??
  (await queryClient.fetchQuery(productsQuery));

export const productsQuery = {
  queryKey: ["products"],
  queryFn: productService.getAll,
};

export const ProductsPage = () => {
  const products = useSuspenseQuery<Product[]>(productsQuery);

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
};
