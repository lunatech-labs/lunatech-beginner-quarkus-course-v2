import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductList } from "~/components/ProductList";
import { ProductServiceContext } from "./contexts/ProductServiceContext";
import { productService } from "./hooks/ProductServiceReactQuery";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductServiceContext.Provider value={productService}>
        <ProductList />
      </ProductServiceContext.Provider>
    </QueryClientProvider>
  );
};
