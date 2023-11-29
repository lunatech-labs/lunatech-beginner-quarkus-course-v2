import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RenderHookOptions,
  RenderOptions,
  render,
  renderHook,
} from "@testing-library/react";
import { FC, PropsWithChildren } from "react";
import { AsyncResult, AsyncAction } from "~/services";
import {
  ProductService,
  ProductServiceContext,
} from "~/services/productService";

const dummyProductService: ProductService = {
  useProductGet: () => AsyncResult.pending(),
  useProductList: () => AsyncResult.pending(),
  useProductCreate: () => AsyncAction.idle(() => {}),
  useProductUpdate: () => AsyncAction.idle(() => {}),
  useProductDelete: () => AsyncAction.idle(() => {}),
};

const ProvidersWrapper = (productService?: Partial<ProductService>) =>
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <ProductServiceContext.Provider
        value={{ ...dummyProductService, ...productService }}
      >
        {children}
      </ProductServiceContext.Provider>
    );
  };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const ProvidersHookWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries"> & {
    productService?: Partial<ProductService>;
  },
) {
  return render(ui, {
    wrapper: ProvidersWrapper(options?.productService),
    ...options,
  });
}
function customRenderHook<Props, Result>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props>,
) {
  return renderHook(render, {
    wrapper: ProvidersHookWrapper,
    ...options,
  });
}

export * from "@testing-library/react";

export { customRender as render };
export { customRenderHook as renderHook };
