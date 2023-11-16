import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Product } from "~/models/Product";
import { productService } from "~/services/productService";
import { EditProducDialog } from "./EditProductDialog";

interface Props {
  product: Product;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [editing, setEditing] = useState(false);

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => productService.remove(product.id),
    onSuccess: () => {
      queryClient.setQueryData(["products"], (data: Product[]) =>
        data.filter(({ id }) => id !== product.id)
      );
    },
  });

  return (
    <Card variant="outlined">
      <CardActionArea onClick={console.log}>
        <CardMedia
          component="img"
          image={`https://fakeimg.pl/192x96/?text=${product.name}&font=lobster`}
        />
        <CardContent>
          <Typography>{product.name}</Typography>
          <Typography>{product.price}€</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          disabled={deleteMutation.isPending}
          onClick={() => setEditing(true)}
        >
          Edit
        </Button>
        <LoadingButton
          size="small"
          loading={deleteMutation.isPending}
          onClick={() => deleteMutation.mutate()}
        >
          Delete
        </LoadingButton>
      </CardActions>
      <EditProducDialog
        initialProduct={product}
        open={editing}
        close={() => setEditing(false)}
      />
    </Card>
  );
};
