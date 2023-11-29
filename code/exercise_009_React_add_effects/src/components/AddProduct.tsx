import { FC, useContext, useState } from "react";
import { PartialProduct, Product, validateProduct } from "~/models/Product";
import { ProductDispatchContext } from "~/states/ProductState";
import { ProductForm } from "./ProductForm";
import { productService } from "~/services/productService";
import { AsyncResult } from "~/services";

export const AddProduct: FC = () => {
  const [product, setProduct] = useState<PartialProduct>({});
  const [validationError, setValidationError] = useState<string>();
  const [status, setStatus] = useState<AsyncResult<Product, string>>();
  const dispatch = useContext(ProductDispatchContext);

  const handleAdd = () => {
    const validated = validateProduct(product);
    if (validated.type === "invalid") {
      setValidationError(validated.msg);
    } else {
      setValidationError(undefined);
      setStatus(AsyncResult.pending());
      productService
        .add(validated.data)
        .then((product) => {
          setStatus(AsyncResult.success(product));
          dispatch({ type: "Add", product });
        })
        .catch(() => {
          setStatus(AsyncResult.failure("Error while submiting"));
        });
    }
  };

  const error = validationError ?? status?.error;

  return (
    <div>
      <button onClick={handleAdd} disabled={status?.isPending}>
        ✅
      </button>
      <ProductForm product={product} onChange={setProduct} />
      {error && <div>{error}</div>}
    </div>
  );
};
