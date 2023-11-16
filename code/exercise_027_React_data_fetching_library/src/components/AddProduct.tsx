import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { PartialProduct, Product, validateProduct } from "~/models/Product";
import { productService } from "~/services/productService";
import { ProductForm } from "./ProductForm";

export const AddProduct: FC = () => {
  const [product, setProduct] = useState<PartialProduct>({});

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: () => {
      const validated = validateProduct(product);
      if (validated.type === "invalid") {
        return Promise.reject(validated.msg);
      } else {
        return productService.add(validated.data);
      }
    },
    onSuccess: (added) =>
      queryClient.setQueryData(["products"], (data: Product[]) => [
        ...data,
        added,
      ]),
  });

  return (
    <div>
      <button
        onClick={() => addMutation.mutate()}
        disabled={addMutation.isPending}
      >
        ✅
      </button>
      <ProductForm product={product} onChange={setProduct} />
      {addMutation.isError && <div>{addMutation.error.message}</div>}
    </div>
  );
};
