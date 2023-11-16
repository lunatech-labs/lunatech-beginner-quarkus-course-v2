import { FC, useContext, useState } from "react";
import { PartialProduct, Product, validateProduct } from "~/models/Product";
import { ProductForm } from "./ProductForm";
import { ProductDispatchContext } from "~/states/ProductState";

interface Props {
  product: Product;
}

type EditStatus =
  | { type: "Editing"; product: PartialProduct; error?: string }
  | { type: "Viewing" };

export const ProductComponent: FC<Props> = ({ product }) => {
  const [editing, setEditing] = useState<EditStatus>({ type: "Viewing" });
  const dispatch = useContext(ProductDispatchContext);

  const edit = (product: PartialProduct) =>
    setEditing({ type: "Editing", product });

  const handleDelete = () => dispatch({ type: "Delete", id: product.id });
  const handleUpdate = (toValidate: PartialProduct) => {
    const validated = validateProduct(toValidate);
    if (validated.type === "invalid") {
      setEditing({ type: "Editing", product, error: validated.msg });
    } else {
      setEditing({ type: "Viewing" });
      dispatch({ type: "Edit", id: product.id, product: validated.data });
    }
  };

  if (editing.type === "Editing") {
    return (
      <div>
        <button onClick={() => setEditing({ type: "Viewing" })}>❌</button>
        <button onClick={() => handleUpdate(editing.product)}>✅</button>
        <ProductForm product={editing.product} onChange={edit} />
        {editing.error && <div>{editing.error}</div>}
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={handleDelete}>❌</button>
        <button onClick={() => edit(product)}>✏️</button>
        <span>
          {product.name} - {product.price}
        </span>
      </div>
    );
  }
};
