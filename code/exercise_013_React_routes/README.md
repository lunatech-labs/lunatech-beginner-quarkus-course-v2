## Exercise - React router

### Setup

We choose to use [React Router](https://reactrouter.com/en/main) for this exercise:

```bash
npm install react-router-dom
```

### Adding routes

- Create a folder `src/pages` and create a file for each route of the page
  - `src/pages/ProductsPage.tsx`
  - `src/pages/ProductPage.tsx`
- Create a file `src/pages/router.tsx` and use `createBrowserRouter` to define the routes.
- In the `App` compononent add `RouterProvider` with the `router` you created.
- Move loading logic from `ProductList` to `ProductsPage`
- For `ProductPage` you need to complete the new `ProductService` method `useProductGet`
  - Reminder: Don't forget to update mutations to update the `reactQuery` data.
