import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router";
import { ProductServiceContext } from "~/services/productService";
import { productService } from "~/services/productServiceReactQuery";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductServiceContext.Provider value={productService}>
        <RouterProvider router={router} />
      </ProductServiceContext.Provider>
    </QueryClientProvider>
  );
};
