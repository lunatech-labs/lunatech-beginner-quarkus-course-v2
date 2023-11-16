import { Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AddProductDialog } from "~/components/AddProductDialog";
import { ProductCard } from "~/components/ProductCard";
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
  const [addingProduct, setAddingProduct] = useState(false);

  return (
    <Container>
      <Typography variant="h2">Product list</Typography>
      <Grid container spacing={2}>
        {products.data.map((product) => (
          <Grid key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Button onClick={() => setAddingProduct(true)}>Add a product</Button>
      <AddProductDialog
        open={addingProduct}
        close={() => setAddingProduct(false)}
      />
    </Container>
  );
};
