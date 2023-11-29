## Exercise - Adding a state

Implement a state to manage the list of products and enable product deletion.

- Import the `useState` hook from React.
- Initialize the `products` state using `useState()` within the `ProductList` component.
- Update the `products` state when a product is removed using the `removeItem` function.
- Pass the `removeItem` function to each `Product` component as a prop.
- Add a delete button in the `Product` component.
- Handle the `onClick` event of the button to invoke the `removeItem` prop.
