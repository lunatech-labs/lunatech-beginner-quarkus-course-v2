## Exercise - MUI

### Setup

We choose to use [Material UI](https://mui.com/material-ui/) for this exercise:

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/lab
```

### Integrate the design

- Create a `ProductCard` and use it in the `ProductList` to render each product.
- Use `Grid` to render them ([see doc](https://mui.com/material-ui/react-grid2/)).
- Create two dialog component, `AddProductDialog` and `EditProductDialog`.
- Use the component [`LoadingButton`](https://mui.com/material-ui/react-button/#loading-button) for the different action buttons.

### Going further

We have introduced a strong dependency on mui, we could add a layer of abstraction, by defining our own design system that wraps mui components. This has some avantages:

- It is easier to maintain in case of breaking changes. Updating a single wrapper component vs changing through all the application.
- Can simplify the component apis. Eg mui has a lot of props that aren't used much and can simply be ignored.

But this can be complex, and also have drawbacks:

- It is hard to make good abstraction.
- It has an initial effort of writing it, and it's additional code that will have to be maintained.
