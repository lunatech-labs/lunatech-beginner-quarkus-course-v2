import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router";
import { ProductServiceContext } from "~/services/productService";
import { productService } from "~/services/productServiceReactQuery";
import { CssBaseline } from "@mui/material";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductServiceContext.Provider value={productService}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ProductServiceContext.Provider>
    </QueryClientProvider>
  );
};
