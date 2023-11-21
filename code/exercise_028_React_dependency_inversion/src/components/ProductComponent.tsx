import { FC, useState } from "react";
import { PartialProduct, Product, validateProduct } from "~/models/Product";
import { ProductForm } from "./ProductForm";
import { useProductService } from "~/services/productService";

interface Props {
  product: Product;
}

type EditStatus =
  | { type: "Editing"; product: PartialProduct }
  | { type: "Viewing" };

export const ProductComponent: FC<Props> = ({ product }) => {
  const productService = useProductService();
  const deleteMutation = productService.useProductDelete();
  const editMutation = productService.useProductUpdate();
  const [validationError, setValidationError] = useState<string>();
  const [editing, setEditing] = useState<EditStatus>({ type: "Viewing" });

  const handleEdit = (toValidate: PartialProduct) => {
    setValidationError(undefined);
    const validated = validateProduct(toValidate);
    if (validated.type === "invalid") {
      setValidationError(validated.msg);
    } else {
      editMutation
        .action({ id: product.id, product: validated.data })
        .then(() => setEditing({ type: "Viewing" }));
    }
  };

  const edit = (product: PartialProduct) =>
    setEditing({ type: "Editing", product });

  const isDeleting = deleteMutation.isPending;
  const isEditing = editMutation.isPending;

  const error = validationError ?? editMutation.error?.message;

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
          onClick={() => handleEdit(editing.product)}
        >
          ✅
        </button>
        <ProductForm product={editing.product} onChange={edit} />
        {error && <div>{error}</div>}
      </div>
    );
  } else {
    return (
      <div>
        <button
          disabled={isDeleting}
          onClick={() => deleteMutation.action({ id: product.id })}
        >
          ❌
        </button>
        <button disabled={isDeleting} onClick={() => edit(product)}>
          ✏️
        </button>
        <span>
          {product.name} - {product.price}
        </span>
        {deleteMutation.isFailure && <div>{deleteMutation.error.message}</div>}
      </div>
    );
  }
};
