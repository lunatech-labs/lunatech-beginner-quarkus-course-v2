import { FC, useContext, useState } from "react";
import { PartialProduct, Product, validateProduct } from "~/models/Product";
import { ProductForm } from "./ProductForm";
import { ProductDispatchContext } from "~/states/ProductState";
import { AsyncResult } from "~/services";
import { productService } from "~/services/productService";

interface Props {
  product: Product;
}

type EditStatus =
  | { type: "Editing"; product: PartialProduct; error?: string }
  | { type: "Viewing" };

export const ProductComponent: FC<Props> = ({ product }) => {
  const [editing, setEditing] = useState<EditStatus>({ type: "Viewing" });
  const [status, setStatus] = useState<AsyncResult<object, string>>();
  const dispatch = useContext(ProductDispatchContext);

  const edit = (product: PartialProduct) =>
    setEditing({ type: "Editing", product });

  const handleDelete = () => {
    setStatus(AsyncResult.pending());
    productService
      .remove(product.id)
      .then(() => dispatch({ type: "Delete", id: product.id }))
      .catch(() => setStatus(AsyncResult.failure("Failed to delete product")));
  };

  const handleUpdate = (toValidate: PartialProduct) => {
    const validated = validateProduct(toValidate);
    if (validated.type === "invalid") {
      setEditing({ type: "Editing", product, error: validated.msg });
    } else {
      setStatus(AsyncResult.pending());
      productService
        .update(product.id, validated.data)
        .then(() => {
          setStatus(AsyncResult.success({}));
          setEditing({ type: "Viewing" });
          dispatch({ type: "Edit", id: product.id, product: validated.data });
        })
        .catch(() => setStatus(AsyncResult.failure("Failed to edit product")));
    }
  };

  const pending = status?.isPending ?? false;

  if (editing.type === "Editing") {
    const error = editing.error ?? status?.error;
    return (
      <div>
        <button
          disabled={pending}
          onClick={() => setEditing({ type: "Viewing" })}
        >
          ❌
        </button>
        <button
          disabled={pending}
          onClick={() => handleUpdate(editing.product)}
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
        <button disabled={pending} onClick={handleDelete}>
          ❌
        </button>
        <button disabled={pending} onClick={() => edit(product)}>
          ✏️
        </button>
        <span>
          {product.name} - {product.price}
        </span>
        {status?.type === "Failure" && <div>{status.error}</div>}
      </div>
    );
  }
};
