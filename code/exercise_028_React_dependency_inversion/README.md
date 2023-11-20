## Exercise - React query

### Setup

We choose to use [React Query](https://tanstack.com/query) for this exercise:

```bash
npm install @tanstack/react-query
```

### Adding queries

1. Remove `useFetch` and replace it with [`useQuery`](https://tanstack.com/query/latest/docs/react/guides/queries)

### Adding mutation

1. In `ProductComponent` and `AddProduct` use the hook [`useQuery`](https://tanstack.com/query/latest/docs/react/guides/mutations) to handle *Creation*, *Addition* and *Deletion*