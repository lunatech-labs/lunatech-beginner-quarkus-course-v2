import { FC, useContext, useState } from "react";
import { PartialProduct, validateProduct } from "~/models/Product";
import { ProductDispatchContext } from "~/states/ProductState";
import { ProductForm } from "./ProductForm";

export const AddProduct: FC = () => {
  const [product, setProduct] = useState<PartialProduct>({});
  const [error, setError] = useState<string>();
  const dispatch = useContext(ProductDispatchContext);

  const handleAdd = () => {
    const validated = validateProduct(product);
    if (validated.type === "invalid") {
      setError(validated.msg);
    } else {
      setError(undefined);
      dispatch({ type: "Add", product: validated.data });
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
