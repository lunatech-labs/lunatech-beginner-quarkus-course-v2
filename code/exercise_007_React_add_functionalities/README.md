## Exercise - Adding functionalities

### Separating the code

The current code is organized in a single file. To make it easier to maintain, we'll divide it into several files.

Here is a suggestion for the structure of the separated code:

```
src
├── components
│   ├── ProductComponent.tsx
│   └── ProductList.tsx
├── models
│   └── Product.ts
└── main.tsx
```

- Extract the different components and model in their separate files.
- Update the `main.tsx` to render `ProductList` component.

### Adding features

#### Edit Product

Allow users to edit the information about a product.

- Add an edit button next to the delete button, that change the component to an edit mode.
- In edit mode the button should be a valid button, when clicked the product should be updated.
- Where did you put the **_isEditing_** state information? Is ProductComponent a controlled or uncontrolled component?

#### Add product

Allows users to add new products to the list.

- Create a component `AddProduct`, that contain the form with the inputs for the `name` and the `price` and a button to add the product.
- Is it possible to reuse the same component for both functionalities, ie with a `ProductForm` component ?

#### Validate product

Add validation on user input to forbid passing empty fields or negative prices.

- Create a type representing the validation result `Validate`
  - It can be a `valid` with a result or `invalid` with an error.
- In `Product.ts` add a function `validateProduct: PartialProduct => Validate<ProductRequest>`
- Implement it to check that `name` or `price` fields are not missing, and are nonempty/negative

#### ProductForm

- Implement the `ProductForm` component so that it's a ***controlled*** component. It should accept props of type:
```tsx
interface Props {
  product: PartialProduct;
  onChange: (p: PartialProduct) => void;
}
```
- Use the component for product addition and edition.
