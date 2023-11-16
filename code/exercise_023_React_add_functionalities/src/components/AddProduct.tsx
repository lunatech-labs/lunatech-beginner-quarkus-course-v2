import { FC, useState } from "react";
import {
  PartialProduct,
  ProductRequest,
  validateProduct,
} from "~/models/Product";
import { ProductForm } from "./ProductForm";

interface Props {
  onAdd: (product: ProductRequest) => void;
}
export const AddProduct: FC<Props> = ({ onAdd }) => {
  const [product, setProduct] = useState<PartialProduct>({});
  const [error, setError] = useState<string>();

  const handleAdd = () => {
    const validated = validateProduct(product);
    if (validated.type === "invalid") {
      setError(validated.msg);
    } else {
      setError(undefined);
      onAdd(validated.data);
    }
  };

  return (
    <div>
      <button onClick={handleAdd}>✅</button>
      <ProductForm product={product} onChange={setProduct} />
      {error && <div>{error}</div>}
    </div>
  );
};
