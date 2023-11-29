import ReactDOM from "react-dom/client";

const Product = ({ name, price }) => (
  <div>
    <span>
      {name} - {price}
    </span>
  </div>
);

const ProductList = () => {
  return (
    <div>
      <h1>Product list:</h1>
      <Product name="BELRAJ" price={50.0} />
      <Product name="TLIN" price={75.0} />
      <Product name="JARVFALARNA" price={10.0} />
      <Product name="MJANEN" price={30.0} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<ProductList />);
