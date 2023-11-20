import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { PartialProduct, Product, validateProduct } from "~/models/Product";
import { productService } from "~/services/productService";
import { ProductForm } from "./ProductForm";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface Props {
  initialProduct: Product;
  open: boolean;
  close: () => void;
}

export const EditProducDialog: FC<Props> = ({
  initialProduct,
  open,
  close,
}) => {
  const [product, setProduct] = useState<PartialProduct>(initialProduct);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (toValidate: PartialProduct) => {
      const validated = validateProduct(toValidate);
      if (validated.type === "invalid") {
        return Promise.reject(validated.msg);
      } else {
        return productService
          .update(initialProduct.id, validated.data)
          .then(() => validated.data);
      }
    },
    onSuccess: (editedProduct) => {
      queryClient.setQueryData(["products"], (data: Product[]) =>
        data.map((o) =>
          o.id === initialProduct.id
            ? { id: initialProduct.id, ...editedProduct }
            : o
        )
      );
      queryClient.setQueryData(["products", initialProduct.id], {
        id: initialProduct.id,
        ...editedProduct,
      });
      close();
    },
  });

  return (
    <Dialog open={open}>
      <DialogTitle>Update product</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <ProductForm product={product} onChange={setProduct} />
          {mutation.isError && (
            <Alert color="error">{mutation.error.message}</Alert>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={mutation.isPending}
          onClick={() => mutation.mutate(product)}
        >
          Save
        </LoadingButton>
        <Button color="error" onClick={close} disabled={mutation.isPending}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
