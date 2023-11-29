## Exercise - Custom hook

Create a custom hook `useFetch` that given a function returning a `Promise<T>` returns an `AsyncResult<T>`.

- Create a file `src/hooks/useFetch.ts`.
- Extract code from `App` component (useState + useEffect) in a new hook called `useFetch`.
- Parameterized the hook so it takes a function `() => Promise<T>` as parameter.
- In `App` call it
  ```tsx
  const state = useFetch(productService.getAll);
  ```
