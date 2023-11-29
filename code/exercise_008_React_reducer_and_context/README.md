## Exercise - Scaling Up with Reducer and Context

### Extract State Logic into a Reducer.

- Create a file `states/ProductState.tsx`
- Create a type `ProductAction` that define possible actions, ie `Add` , `Edit` and `Delete`
- Add a `Reducer<Product[], ProductAction>` and write the reducer logic based on the action type.
- create a `Context<Dispatch<ProductAction>>` and `Context<Product[]>`

### Put state and dispatch into context.

- Create a component `App`, in the `src` folder in which you:
  - Initialise the state and dispatch using `useReducer`
  - Provide them to the entire tree.

### Use the context.

- In `ProductList` get `products` from the context using `useContext` (and remove the usage of `useState`)
  - Remove also the props `removeItem`, `updateProduct` and `onAdd`, they will be handled by the `dispatch` method.
- In `ProductComponent` and `AddProduct` get the `dispatch` function from the `context` and call the appropriate action.
