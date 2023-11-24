import { Input } from "./form/Input";

export const ProductForm = () => (
  <>
    <Input label="Name" name="name" />
    <Input label="Price" name="price" type="number" />
  </>
);
