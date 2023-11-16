import { useState } from "react";
import { Product } from "~/models/Product";
import { AddProduct } from "./AddProduct";
import { ProductComponent } from "./ProductComponent";

const nextId = (function () {
  let id = 1;
  return () => id++;
})();

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: nextId(), name: "BELRAJ", price: 50.0 },
    { id: nextId(), name: "TLIN", price: 75.0 },
    { id: nextId(), name: "JARVFALARNA", price: 10.0 },
    { id: nextId(), name: "MJANEN", price: 30.0 },
  ]);

  return (
    <div>
      <h1>Product list:</h1>
      {products.map(({ id, name, price }) => (
        <ProductComponent
          key={id}
          name={name}
          price={price}
          removeItem={() => setProducts(products.filter((p) => p.id !== id))}
          updateProduct={(updated) =>
            setProducts(
              products.map((p) => (p.id === id ? { id, ...updated } : p))
            )
          }
        />
      ))}
      <h1>Add a product:</h1>
      <AddProduct
        onAdd={(p) => setProducts([...products, { id: nextId(), ...p }])}
      />
    </div>
  );
};
