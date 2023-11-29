## Exercise - Dependency inversion

When using `useEffect` and our custom hook `useFetch` we had were depent

### ProductService

We are providing the interface for the `ProductService` in `services/productService.ts`.

### ProductServiceReactQuery

Write an implementation `ProductService` using `reactQuery`.

- Create a file `services/productServiceReactQuery.ts`
- Implement `useProductList` using `useQuery`
  - we provided some utils in `utils/reactQueryUtils` to transform reactQuery types to our defined types.
  - you can also find a `service/fetchService` that contains the some method for `fetch`.
- Implement the rest using `useMutation`.
  - Take care updating data on mutation success.

### Passing the service in the context

- In `App` component you can inject the created service using `ProductServiceContext`
- In the different `Product*` components remove reference to `reactQuery`.
  - Get a `productService` using the `useProductService` hook.
