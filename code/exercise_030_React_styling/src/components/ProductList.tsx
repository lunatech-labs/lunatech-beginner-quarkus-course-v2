import { Product } from "~/models/Product";
import { FC, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { AddProductDialog } from "./AddProductDialog";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
}

export const ProductList: FC<Props> = ({ products }) => {
  const [addingProduct, setAddingProduct] = useState(false);
  return (
    <Container>
      <Typography variant="h2">Product list</Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
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
