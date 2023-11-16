import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";
import { ProductsPage, loader as productsLoader } from "./ProductsPage";
import { ProductPage, loader as productLoader } from "./ProductPage";

export const router = (client: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      Component: ProductsPage,
      loader: productsLoader(client),
    },
    {
      path: "/:productId",
      Component: ProductPage,
      loader: ({ params }) => productLoader(client)(params.productId!),
    },
  ]);
