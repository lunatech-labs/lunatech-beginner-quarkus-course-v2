import ReactDOM from "react-dom/client";

import { FC, useState } from "react";

interface Props {
  /* Complete */
}

const Product /* Add type annotation */ = ({ name, price, removeItem }) => {
  return (
    <div>
      <button onClick={removeItem}>❌</button>
      <span>{name} - {price}</span>
    </div>
  );
};

interface Product {
  /* Complete */
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "BELRAJ", price: 50.0 },
    { id: 2, name: "TLIN", price: 75.0 },
    { id: 3, name: "JARVFALARNA", price: 10.0 },
    { id: 4, name: "MJANEN", price: 30.0 },
  ]);

  return (
    <div>
      <h1>Product list:</h1>
      {products.map(({ id, name, price }) => (
        <Product
          key={id}
          name={name}
          price={price}
          removeItem={() => setProducts(products.filter((p) => p.id !== id))}
        />
      ))}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<ProductList />);
