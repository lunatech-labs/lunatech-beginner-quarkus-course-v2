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
  const [validationError, setValidationError] = useState<string>();

  const handleAdd = () => {
    const validated = validateProduct(product);
    if (validated.type === "invalid") {
      setValidationError(validated.msg);
    } else {
      setValidationError(undefined);
      onAdd(validated.data);
    }
  };

  return (
    <div>
      <button onClick={handleAdd}>✅</button>
      <ProductForm product={product} onChange={setProduct} />
      {validationError && <div>{validationError}</div>}
    </div>
  );
};
