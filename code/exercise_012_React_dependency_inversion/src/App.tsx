import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductList } from "~/components/ProductList";
import { ProductServiceContext } from "~/services/productService";
import { productService } from "./services/productServiceReactQuery";

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
