## Exercise - React router

### Setup

We choose to use [React Router](https://reactrouter.com/en/main) for this exercise:

```bash
npm install react-router-dom
```

### Adding routes

1. Create a folder `src/pages` and create a file for each route of the page
    - `src/pages/ProductsPage.tsx`
    - `src/pages/ProductPage.tsx`
2. Create a file `src/pages/router.tsx` and use `createBrowserRouter` to define the routes.
3. Replace all the `App` compononent logic to use `RouterProvider`
4. Use the `loader` attribute of the routes to provide data to the pages. ([see example](https://tanstack.com/query/latest/docs/react/examples/react/react-router))