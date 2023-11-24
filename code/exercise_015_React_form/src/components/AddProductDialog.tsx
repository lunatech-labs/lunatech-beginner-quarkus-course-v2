import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FC } from "react";
import { ProductRequest, productSchema } from "~/models/Product";
import { ProductForm } from "./ProductForm";
import { useProductService } from "~/services/productService";
import { Form } from "./form/Form";

interface Props {
  open: boolean;
  close: () => void;
}

export const AddProductDialog: FC<Props> = ({ open, close }) => {
  const productService = useProductService();
  const { action, isPending } = productService.useProductCreate();

  const handleAdd = (product: ProductRequest) => action(product).then(close);

  return (
    <Dialog open={open}>
      <DialogTitle>Add a product</DialogTitle>
      <Form validation={productSchema} onSubmit={handleAdd}>
        <DialogContent>
          <Stack spacing={2}>
            <ProductForm />
          </Stack>
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={isPending} type="submit">
            Add
          </LoadingButton>
          <Button color="error" onClick={close} disabled={isPending}>
            Cancel
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
