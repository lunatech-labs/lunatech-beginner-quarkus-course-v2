import { Container } from "@mui/material";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Product } from "~/models/Product";
import { productService } from "~/services/productService";

export const loader =
  (queryClient: QueryClient) => async (productId: string) => {
    const query = productQuery(productId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const productQuery = (productId: string) => ({
  queryKey: ["products", productId],
  queryFn: () => productService.get(productId),
});

export const ProductPage = () => {
  const params = useParams();
  const productId = params.productId as string;
  const { data: product } = useSuspenseQuery<Product>(productQuery(productId));

  return <Container>{product.name}</Container>;
};
