import { FC, useState } from "react";
import {
  PartialProduct,
  ProductRequest,
  validateProduct
} from "~/models/Product";
import { ProductForm } from "./ProductForm";

interface Props {
  name: string;
  price: number;
  updateProduct: (p: ProductRequest) => void;
  removeItem: () => void;
}

type EditStatus =
  | { type: "Editing"; product: PartialProduct; error?: string }
  | { type: "Viewing" };

export const ProductComponent: FC<Props> = ({
  name,
  price,
  updateProduct,
  removeItem,
}) => {
  const [editing, setEditing] = useState<EditStatus>({ type: "Viewing" });

  const edit = (product: PartialProduct) =>
    setEditing({ type: "Editing", product });

  const handleUpdate = (product: PartialProduct) => {
    const validated = validateProduct(product);
    if (validated.type === "invalid") {
      setEditing({ type: "Editing", product, error: validated.msg });
    } else {
      setEditing({ type: "Viewing" });
      updateProduct(validated.data);
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
        <button onClick={removeItem}>❌</button>
        <button onClick={() => edit({ name, price })}>✏️</button>
        <span>
          {name} - {price}
        </span>
      </div>
    );
  }
};
