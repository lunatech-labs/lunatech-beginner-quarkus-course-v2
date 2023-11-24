import { createBrowserRouter } from "react-router-dom";
import { ProductsPage } from "./ProductsPage";
import { ProductPage } from "./ProductPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ProductsPage,
  },
  {
    path: "/:productId",
    Component: ProductPage,
  },
]);
