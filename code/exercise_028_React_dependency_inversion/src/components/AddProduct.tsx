import { FC, useState } from "react";
import { PartialProduct, validateProduct } from "~/models/Product";
import { ProductForm } from "./ProductForm";
import { useProductService } from "~/contexts/ProductServiceContext";

export const AddProduct: FC = () => {
  const [product, setProduct] = useState<PartialProduct>({});
  const [validationError, setValidationError] = useState<string>();
  const productService = useProductService();
  const addProduct = productService.useProductCreate();

  const handleAdd = () => {
    setValidationError(undefined);
    const validated = validateProduct(product);
    if (validated.type === "invalid") {
      setValidationError(validated.msg);
    } else {
      addProduct.action(validated.data);
    }
  };

  const error = validationError ?? addProduct.error?.message;
  return (
    <div>
      <button onClick={handleAdd} disabled={addProduct.isPending}>
        ✅
      </button>
      <ProductForm product={product} onChange={setProduct} />
      {error && <div>{error}</div>}
    </div>
  );
};
