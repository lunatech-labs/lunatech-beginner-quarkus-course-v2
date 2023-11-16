import ReactDOM from "react-dom/client";

const Product = ({ name, price }) => (
  <div>
    <span>{name} - {price}</span>
  </div>
);

const ProductList = () => {
  const products = [
    { id: 1, name: "BELRAJ", price: 50.0 },
    { id: 2, name: "TLIN", price: 75.0 },
    { id: 3, name: "JARVFALARNA", price: 10.0 },
    { id: 4, name: "MJANEN", price: 30.0 },
  ];
  return (
    <div>
      <h1>Product list:</h1>
      {products.map(({ id, name }) => (
        <Product key={id} name={name} price={price} />
      ))}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<ProductList />);
