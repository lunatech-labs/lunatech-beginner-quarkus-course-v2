import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { PartialProduct, Product, validateProduct } from "~/models/Product";
import { productService } from "~/services/productService";
import { ProductForm } from "./ProductForm";

interface Props {
  open: boolean;
  close: () => void;
}

export const AddProductDialog: FC<Props> = ({ open, close }) => {
  const [product, setProduct] = useState<PartialProduct>({});

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (product: PartialProduct) => {
      const validated = validateProduct(product);
      if (validated.type === "invalid") {
        return Promise.reject(new Error(validated.msg));
      } else {
        return productService.add(validated.data);
      }
    },
    onSuccess: (added) => {
      queryClient.setQueryData<Product[]>(["products"], (data) => [
        ...(data ?? []),
        added,
      ]);
      queryClient.setQueryData(["products", added.id], added);
      close();
    },
  });

  return (
    <Dialog open={open}>
      <DialogTitle>Add a product</DialogTitle>
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
          Add
        </LoadingButton>
        <Button color="error" onClick={close} disabled={mutation.isPending}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
