import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductList } from "~/components/ProductList";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductList />
    </QueryClientProvider>
  );
};
