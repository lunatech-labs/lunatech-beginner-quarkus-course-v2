import { FC, useContext, useState } from "react";
import { PartialProduct, Product, validateProduct } from "~/models/Product";
import { ProductDispatchContext } from "~/states/ProductState";
import { ProductForm } from "./ProductForm";
import { productService } from "~/services/productService";
import { AsyncResult } from "~/services";

export const AddProduct: FC = () => {
  const [product, setProduct] = useState<PartialProduct>({});
  const [status, setStatus] = useState<AsyncResult<Product, string>>();
  const dispatch = useContext(ProductDispatchContext);

  const handleAdd = () => {
    setStatus({ type: "Loading" });
    const validated = validateProduct(product);
    if (validated.type === "invalid") {
      setStatus({ type: "Failure", error: validated.msg });
    } else {
      productService
        .add(validated.data)
        .then((product) => {
          setStatus({ type: "Success", data: product });
          dispatch({ type: "Add", products: [product] });
        })
        .catch(() =>
          setStatus({ type: "Failure", error: "Error while submiting" })
        );
    }
  };

  return (
    <div>
      <button onClick={handleAdd} disabled={status?.type === "Loading"}>
        ✅
      </button>
      <ProductForm product={product} onChange={setProduct} />
      {status?.type === "Failure" && <div>{status.error}</div>}
    </div>
  );
};
