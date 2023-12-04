## Exercise - React query

### Setup

We choose to use [React Query](https://tanstack.com/query) for this exercise:

```bash
npm install @tanstack/react-query
```

### Adding queries

React query while manage the asynchronous state.

- Remove `useFetch` and `useReducer`
- The `App` component now only provide the `QueryClient`
  ```tsx
  export const App = () => (
    <QueryClientProvider client={queryClient}>
      <ProductList />
    </QueryClientProvider>
  );
  ```
- In `ProductList` fetch the products using the hook [`useQuery`](https://tanstack.com/query/latest/docs/react/guides/queries)

### Adding mutation

- In `ProductComponent` and `AddProduct` use the hook [`useMutation`](https://tanstack.com/query/latest/docs/react/guides/mutations) to handle _Creation_, _Addition_ and _Deletion_
- In the `onSuccess` option update the existing query using `setQueryData` on the `QueryClient` ([see doc](https://tanstack.com/query/latest/docs/react/guides/updates-from-mutation-responses))
