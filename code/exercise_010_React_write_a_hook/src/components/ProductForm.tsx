import { ChangeEvent, FC } from "react";
import type { PartialProduct } from "~/models/Product";

interface Props {
  product: PartialProduct;
  onChange: (p: PartialProduct) => void;
}

export const ProductForm: FC<Props> = ({ product, onChange }) => {
  const handleUpdate =
    (key: keyof PartialProduct) => (event: ChangeEvent<HTMLInputElement>) =>
      onChange({ ...product, [key]: event.target.value });

  return (
    <>
      <input
        placeholder="Name"
        value={product.name ?? ""}
        onChange={handleUpdate("name")}
      />
      <span> - </span>
      <input
        type="number"
        placeholder="Price"
        value={product.price ?? ""}
        onChange={handleUpdate("price")}
      />
    </>
  );
};
