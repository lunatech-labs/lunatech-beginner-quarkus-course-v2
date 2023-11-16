## Exercise - Scaling Up with Reducer and Context

1. Extract State Logic into a Reducer.
   - Create a file `states/ProductState.tsx`
   - Create a type `ProductAction` that define possible actions, ie `Add` , `Edit` and `Delete`
   - Add a `Reducer<Product[], ProductAction>` and write the reducer logic
2. Create the context.
   - create a `Context<Dispatch<ProductAction>>` and `Context<Product[]>`
3. Put state and dispatch into context.
   - Create a component `App`, in which you:
        - Initialise the state and dispatch using `useReducer`
        - Provide them to the entire tree
4. Use context.
   - In `ProductList` read `products` from the context using `useContext`
   - In `ProductComponent` and `AddProduct` read the `dispatch` function from `context` and call it
