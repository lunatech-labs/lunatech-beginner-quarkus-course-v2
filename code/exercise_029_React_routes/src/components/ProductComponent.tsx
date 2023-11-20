import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import {
  PartialProduct,
  Product,
  validateProduct,
} from "~/models/Product";
import { productService } from "~/services/productService";
import { ProductForm } from "./ProductForm";

interface Props {
  product: Product;
}

type EditStatus =
  | { type: "Editing"; product: PartialProduct }
  | { type: "Viewing" };

export const ProductComponent: FC<Props> = ({ product }) => {
  const [editing, setEditing] = useState<EditStatus>({ type: "Viewing" });
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => productService.remove(product.id),
    onSuccess: () => {
      queryClient.setQueryData(["products"], (data: Product[]) =>
        data.filter(({ id }) => id !== product.id)
      );
    },
  });

  const editMutation = useMutation({
    mutationFn: (toValidate: PartialProduct) => {
      const validated = validateProduct(toValidate);
      if (validated.type === "invalid") {
        return Promise.reject(validated.msg);
      } else {
        return productService
          .update(product.id, validated.data)
          .then(() => validated.data);
      }
    },
    onSuccess: (editedProduct) => {
      queryClient.setQueryData(["products"], (data: Product[]) =>
        data.map((o) =>
          o.id === product.id ? { id: product.id, ...editedProduct } : o
        )
      );
      setEditing({ type: "Viewing" });
    },
  });

  const edit = (product: PartialProduct) =>
    setEditing({ type: "Editing", product });

  const isDeleting = deleteMutation.isPending;
  const isEditing = editMutation.isPending;

  if (editing.type === "Editing") {
    return (
      <div>
        <button
          disabled={isEditing}
          onClick={() => setEditing({ type: "Viewing" })}
        >
          ❌
        </button>
        <button
          disabled={isEditing}
          onClick={() => editMutation.mutate(editing.product)}
        >
          ✅
        </button>
        <ProductForm product={editing.product} onChange={edit} />
        {editMutation.isError && <div>{editMutation.error.message}</div>}
      </div>
    );
  } else {
    return (
      <div>
        <button disabled={isDeleting} onClick={() => deleteMutation.mutate()}>
          ❌
        </button>
        <button disabled={isDeleting} onClick={() => edit(product)}>
          ✏️
        </button>
        <span>
          {product.name} - {product.price}
        </span>
        {deleteMutation.isError && <div>{deleteMutation.error.message}</div>}
      </div>
    );
  }
};
