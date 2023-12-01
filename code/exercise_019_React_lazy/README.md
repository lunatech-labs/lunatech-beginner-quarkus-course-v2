## Exercise - lazy

Code Splitting with lazy.

- In `router` replace `ProductsPage` and `ProductPage`, by a lazy reprensentation.
- Wrap them with `<Suspense>` and set the `fallback` to `<CircularProgress />`.
- Run the app and navigate to a page. You will see that the component is fetched.