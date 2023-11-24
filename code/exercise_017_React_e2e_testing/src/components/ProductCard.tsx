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
import { FC, useState } from "react";
import { Product } from "~/models/Product";
import { EditProducDialog } from "./EditProductDialog";
import { useProductService } from "~/services/productService";

interface Props {
  product: Product;
  onClick: () => void
}

export const ProductCard: FC<Props> = ({ product, onClick }) => {
  const [editing, setEditing] = useState(false);
  const productService = useProductService();
  const deleteMutation = productService.useProductDelete();

  return (
    <Card variant="outlined">
      <CardActionArea onClick={onClick}>
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
          onClick={() => deleteMutation.action({ id: product.id })}
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
