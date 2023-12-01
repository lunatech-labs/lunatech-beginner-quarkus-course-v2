## Exercise - Testing React components

Unit testing is an essential part of developing robust and maintainable React applications. It allows you to isolate and test individual components, ensuring that they function as expected and meet the desired requirements. In this exercise, you will learn how to unit test React components using [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).

### Setup

Install the necessary dependencies by running the following command:

```bash
npm install --save-dev vitest happy-dom @testing-library/react @testing-library/jest-dom
```

### Writing the first test

- Create a foler `src/__test__`.
- Inside the folder create a file `test-utils.tsx`, we will define a [custom render](https://testing-library.com/docs/react-testing-library/setup/#custom-render) to include the different providers.
  - Follow the setup for a [custom render](https://testing-library.com/docs/react-testing-library/setup/#custom-render)
- Write your first test, eg `__tests__/components/ProductCard.test.tsx`
  - You can check that the ProductCard correctly render the product details.
    ```tsx
    it("renders product details", () => {
      render(<ProductCard product={mockProduct} onClick={() => {}} />);

      expect(screen.getByText("Product Name")).toBeDefined();
      expect(screen.getByText("9.99€")).toBeDefined();
    });
    ```
- Add other tests, eg when user click on `Edit`, `Delete` ...
- Run the tests by running `npm test`

### Testing hooks

- Update `test-utils.tsx` to export a custom `renderHook` function.
- /// TODO

### Additional Testing Scenarios

- Test the behavior of the `ProductList` when different/no products are provided, when a product is added, ....
- Test the behavior of the `ProductComponent` when editing a product, ....
- Test the behavior of the `Form` component when submiting with/without error, when there is default values ....
- ...