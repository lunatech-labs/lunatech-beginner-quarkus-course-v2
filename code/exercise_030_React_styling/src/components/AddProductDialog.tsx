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
import { FC, useState } from "react";
import { PartialProduct, validateProduct } from "~/models/Product";
import { ProductForm } from "./ProductForm";
import { useProductService } from "~/contexts/ProductServiceContext";

interface Props {
  open: boolean;
  close: () => void;
}

export const AddProductDialog: FC<Props> = ({ open, close }) => {
  const [product, setProduct] = useState<PartialProduct>({});
  const [validationError, setValidationError] = useState<string>();
  const productService = useProductService();
  const addProduct = productService.useProductCreate();

  const handleAdd = () => {
    setValidationError(undefined);
    const validated = validateProduct(product);
    if (validated.type === "invalid") {
      setValidationError(validated.msg);
    } else {
      addProduct.action(validated.data).then(close);
    }
  };

  const error = validationError ?? addProduct.error?.message;

  return (
    <Dialog open={open}>
      <DialogTitle>Add a product</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <ProductForm product={product} onChange={setProduct} />
          {error && <Alert color="error">{error}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton loading={addProduct.isPending} onClick={handleAdd}>
          Add
        </LoadingButton>
        <Button color="error" onClick={close} disabled={addProduct.isFailure}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
