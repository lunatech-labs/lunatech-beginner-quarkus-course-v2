## Exercise - Custom hook

Create a custom hook `useFetch` that given a function returning a `Promise<T>` returns an `AsyncResult<T>`.

- Create a file `src/hooks/useFetch.ts`.
- Extract code from `App` component (useState + useEffect) in a new hook called `useFetch`.
- Parameterized the hook so it takes a function `() => Promise<T>` as parameter.
- In `App` call it
  ```tsx
  const state = useFetch(productService.getAll);
  ```
- Add the abort signal in parameter `(signal: AbortSignal) => Promise<T>`, and pass it to `productService.getAll`.
  - You should have an issue with the browser calling `/products` on every render, it's because calling: \
    `useFetch(signal => productService.getAll({signal}))`\
     will create a new function on every render and will update the dependencies of the `useEffect` hook.\
     To fix it you can wrap the function using the `useCallback` hook:
    ```tsx
    const getAll = useCallback(
      (signal: AbortSignal) => productService.getAll({ signal }),
      [],
    );
    const state = useFetch(getAll);
    ```
