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
  | { type: "Editing"; product: PartialProduct }
  | { type: "Viewing" };

export const ProductComponent: FC<Props> = ({ product }) => {
  const [editing, setEditing] = useState<EditStatus>({ type: "Viewing" });
  const [status, setStatus] = useState<AsyncResult<any, string>>();
  const dispatch = useContext(ProductDispatchContext);

  const edit = (product: PartialProduct) =>
    setEditing({ type: "Editing", product });

  const handleDelete = () => {
    setStatus({ type: "Loading" });
    productService
      .remove(product.id)
      .then(() => dispatch({ type: "Delete", id: product.id }))
      .catch(() =>
        setStatus({ type: "Failure", error: "Failed to delete product" })
      );
  };

  const handleUpdate = (toValidate: PartialProduct) => {
    setStatus({ type: "Loading" });
    const validated = validateProduct(toValidate);
    if (validated.type === "invalid") {
      setStatus({ type: "Failure", error: validated.msg });
    } else {
      productService
        .update(product.id, validated.data)
        .then(() => {
          setStatus({ type: "Success", data: {} });
          setEditing({ type: "Viewing" });
          dispatch({ type: "Edit", id: product.id, product: validated.data });
        })
        .catch(() =>
          setStatus({ type: "Failure", error: "Failed to edit product" })
        );
    }
  };

  const pending = status?.type === "Loading";

  if (editing.type === "Editing") {
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
        {status?.type === "Failure" && <div>{status.error}</div>}
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
