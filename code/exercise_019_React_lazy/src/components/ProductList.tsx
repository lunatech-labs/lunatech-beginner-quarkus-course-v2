import { Product } from "~/models/Product";
import { FC, useState } from "react";
import { Container, Fab, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { AddProductDialog } from "./AddProductDialog";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  onClick: (p: Product) => void;
}

export const ProductList: FC<Props> = ({ products, onClick }) => {
  const [addingProduct, setAddingProduct] = useState(false);
  return (
    <Container>
      <Typography variant="h2">Product list</Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid key={product.id}>
            <ProductCard product={product} onClick={() => onClick(product)} />
          </Grid>
        ))}
      </Grid>
      <Fab
        sx={(theme) => ({
          position: "absolute",
          bottom: theme.spacing(2),
          right: theme.spacing(2),
        })}
        onClick={() => setAddingProduct(true)}
        color="primary"
      >
        +
      </Fab>
      <AddProductDialog
        open={addingProduct}
        close={() => setAddingProduct(false)}
      />
    </Container>
  );
};
