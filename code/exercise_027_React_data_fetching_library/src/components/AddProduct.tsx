import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import {
  PartialProduct,
  Product,
  ProductRequest,
  validateProduct,
} from "~/models/Product";
import { productService } from "~/services/productService";
import { ProductForm } from "./ProductForm";

export const AddProduct: FC = () => {
  const [validationError, setValidationError] = useState<string>();
  const [product, setProduct] = useState<PartialProduct>({});

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: (product: ProductRequest) => productService.add(product),
    onSuccess: (added) =>
      queryClient.setQueryData(["products"], (data: Product[]) => [
        ...data,
        added,
      ]),
  });

  const handleAdd = () => {
    setValidationError(undefined);
    const validated = validateProduct(product);
    if (validated.type === "invalid") {
      setValidationError(validated.msg);
    } else {
      addMutation.mutate(validated.data);
    }
  };

  const error = validationError ?? addMutation.error?.message;

  return (
    <div>
      <button onClick={handleAdd} disabled={addMutation.isPending}>
        ✅
      </button>
      <ProductForm product={product} onChange={setProduct} />
      {error && <div>{error}</div>}
    </div>
  );
};
