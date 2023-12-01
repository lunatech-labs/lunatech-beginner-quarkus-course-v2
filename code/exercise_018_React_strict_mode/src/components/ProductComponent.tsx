import { Product } from "~/models/Product";
import { FC, useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { EditProducDialog } from "./EditProductDialog";

interface Props {
  product: Product;
}

export const ProductComponent: FC<Props> = ({ product }) => {
  const [editing, setEditing] = useState(false);

  return (
    <Container>
      <Stack alignItems="start" spacing={2}>
        <Typography variant="h2">{product.name}</Typography>
        <img
          src={`https://fakeimg.pl/192x96/?text=${product.name}&font=lobster`}
          alt={product.name}
        />
        <Stack>
          <Typography variant="h6">Price</Typography>
          <Typography>{product.price}€</Typography>
        </Stack>
        <Button variant="outlined" onClick={() => setEditing(true)}>
          Edit
        </Button>
        <EditProducDialog
          initialProduct={product}
          open={editing}
          close={() => setEditing(false)}
        />
      </Stack>
    </Container>
  );
};
