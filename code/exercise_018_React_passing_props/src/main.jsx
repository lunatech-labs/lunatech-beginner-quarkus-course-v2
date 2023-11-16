import ReactDOM from "react-dom/client";

const Product = () => (
  <div>
    <span>Show the product name</span>
    <span> - </span>
    <span>Show the product price</span>
  </div>
);

const ProductList = () => {
  return (
    <div>
      <h1>Product list:</h1>
      <Product />
      <Product />
      <Product />
      <Product />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<ProductList />);
