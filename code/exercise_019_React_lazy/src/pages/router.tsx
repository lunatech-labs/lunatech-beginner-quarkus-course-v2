import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const ProductsPage = lazy(() => import("./ProductsPage"));
const ProductPage = lazy(() => import("./ProductPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProductsPage />
      </Suspense>
    ),
  },
  {
    path: "/:productId",
    element: (
      <Suspense fallback={<CircularProgress />}>
        <ProductPage />
      </Suspense>
    ),
  },
]);
