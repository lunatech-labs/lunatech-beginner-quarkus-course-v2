import { FC } from "react";
import { Product, ProductRequest, productSchema } from "~/models/Product";
import { ProductForm } from "./ProductForm";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useProductService } from "~/services/productService";
import { Form } from "./form/Form";

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
  const productService = useProductService();
  const { action, isPending } = productService.useProductUpdate();

  const handleEdit = (product: ProductRequest) =>
    action({ id: initialProduct.id, product }).then(close);

  return (
    <Dialog open={open}>
      <DialogTitle>Update product</DialogTitle>
      <Form
        validation={productSchema}
        onSubmit={handleEdit}
        defaultValue={initialProduct}
      >
        <DialogContent>
          <Stack spacing={2}>
            <ProductForm />
          </Stack>
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={isPending} type="submit">
            Save
          </LoadingButton>
          <Button color="error" onClick={close} disabled={isPending}>
            Cancel
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
