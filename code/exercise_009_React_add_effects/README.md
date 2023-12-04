## Exercise - Connecting to an api

### Running the backend

// TODO define what to do eg: `jbang scripting/productapp.java`

### Connecting to the api

You can find a service `productService` in `services/productService.ts` where we definded the differents methods to interact with the backend.

We also added a type representing an async result `AsyncResult<T, Error>`, we will use it to represent the status of our fetch and actions.

#### Fetch products

- In the `App` component, add a state representing the fetching of the product, `useState<AsyncResult<Product[]>>` initialized to `pending`.
- Using `useEffect` and the `productService`, get the list of products and update it in the state.
  - Dependecies of the `useEffect` should contain the state update function.
  - The cleanup function should abort the fetch. Create an `AbortController`, and pass in the options of `productService.getAll` the `signal: controller.signal`.
  - You can now set the return the cleanup function (`() => controller.abort()`)
- Render correctly the different status of the state: `Pending`, `Failure` and `Success`.

#### Update products

- In `ProductComponent` and `AddProduct` add also a state `useState<AsyncResult<Product[]>>` this time unitialized.
- Call the right method of `productService` to handle _Creation_, _Addition_ and _Deletion_.
- Reflect the state of the async action in the state.
- Disable buttons when action is in pending.
