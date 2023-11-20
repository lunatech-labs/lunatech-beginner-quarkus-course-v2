import { FC, useState } from "react";
import { PartialProduct, Product, validateProduct } from "~/models/Product";
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
import { useProductService } from "~/contexts/ProductServiceContext";

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
  const [validationError, setValidationError] = useState<string>();
  const productService = useProductService();
  const editMutation = productService.useProductUpdate();

  const handleEdit = () => {
    setValidationError(undefined);
    const validated = validateProduct(product);
    if (validated.type === "invalid") {
      setValidationError(validated.msg);
    } else {
      editMutation
        .action({ id: initialProduct.id, product: validated.data })
        .then(close);
    }
  };

  const error = validationError ?? editMutation.error?.message;

  return (
    <Dialog open={open}>
      <DialogTitle>Update product</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <ProductForm product={product} onChange={setProduct} />
          {error && <Alert color="error">{error}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton loading={editMutation.isPending} onClick={handleEdit}>
          Save
        </LoadingButton>
        <Button color="error" onClick={close} disabled={editMutation.isPending}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
