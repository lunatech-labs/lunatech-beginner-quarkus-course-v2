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

### Adding features

1. Product editing: Allow users to edit the information about a product.
    - Add an edit button next to the delete button, that change the component to an edit mode.
    - In edit mode the button should be a valid button, when clicked the product should be updated.
    - It should be forbidden to remove a field.
    - Where did you put the ***isEditing*** state information? Is ProductComponent a controlled or uncontrolled component?
2. Product adding: Allows users to add new products to the list.
    - Is it possible to reuse the same component for both functionalities?