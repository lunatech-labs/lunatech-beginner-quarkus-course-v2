## Exercise - Form & Validation

### Setup

We choose to use [React hook form](https://react-hook-form.com/) and [zod](https://zod.dev/) for this exercise:

```bash
npm install react-hook-form zod @hookform/resolvers
```

### Differents Forms

In the exercice 6, we have added a controlled form component `ProductForm`.
An optional exercise would be to make it uncontrolled,

<details>
  <summary>
    Solution for an uncontrolled `ProductForm`
  </summary>

```tsx
// ProductForm.tsx
interface Props {
  defaultValues?: PartialProduct;
}

export const ProductForm: FC<Props> = ({ defaultValues }) => (
  <>
    <input placeholder="Name" defaultValue={defaultValues?.name} />
    <input type="number" defaultValue={defaultValues?.name} />
  </>
);

// ProductComponent.tsx
export const ProductComponent: FC<Props> = () => {
  const handleUpdate = (event) => {
    const name = event.target.elements.name.value;
    const price = event.target.elements.price.value;
    const validated = validateProduct({ name, price });
  };
  return (
    <>
      <form onSubmit={handleUpdate}>
        <button type="submit">✅</button>
        <ProductForm defaultValues={editing.product} />
      </form>
    </>
  );
};
```

</details>  
<br />

- Let(s) use _React hook form_ to manage our form state.
- In both `*ProductDialog` initialize the form using [`useForm`](https://react-hook-form.com/get-started)
- There are multiple way of using react hook form

  - <details>
    <summary>using the register function</summary>

    ```tsx
    const { register, handleSubmit } = useForm();
    return (
      <form onSubmit={handleSubmit(console.log)}>
        <input {...register("name")} />
        <input type="number" {...register("price")} />
        <input type="submit" />
      </form>
    );
    ```

    </details>

  - <details>
      <summary>using the `Controller` component</summary>

    ```tsx
    const { control, handleSubmit } = useForm()
    return (
      <form onSubmit={handleSubmit(console.log)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => <input type="number" {...field} />}
        />
        <input type="submit" />
      </form>
    ```

    </details>

- Create a new component `Input` in `src/components/form/Input.tsx`
- Implement it using [`Controlller`](https://react-hook-form.com/docs/usecontroller/controller) and `useFormContext`, and with the render prop using mui `TextField`.
  - Using Controller, we can not apply undefined to defaultValue or defaultValues at useForm.
- In `ProductForm` replace usage of `TextField` with the newly created `Input`.
- Use the `handleSubmit` from `useForm` get the form values.

### Adding validation

We change our hand made validation to a zod validation:

- In `Product.ts` add a `productSchema: ZodType<ProductRequest>`.
- Implement it using `z.object` ([see the doc](https://zod.dev/)).
  - Add Attributes: `name`, must be a non-empty string, and `price`, must be a positive number.
- Pass it to the `useForm` (using option `resolver: zodResolver(productSchema)`)

### Some cleaning

We don't want to have dependencies to _React hook form_ everywhere. Let's create a component `Form` that encapsulate the `useForm` hook.

- Create a file `components/form/Form.tsx`
- Add `Props<T, R>` wich accepts `defaultValues`, `validation` and a `onSubmit` function.
  <details>
      <summary>Solution for the expected Props</summary>

  ```tsx
  // Transform T fields to be required and accept string value.
  export type DirtyObject<T extends object> = {
    [P in keyof T]-?: Dirty<T[P]>;
  };
  export type Dirty<T> = T extends object ? DirtyObject<T> : T | string;

  interface Props<T extends object, R> {
    onSubmit: (t: T) => R | Promise<R>;
    validation?: ZodType<T>;
    defaultValue: DirtyObject<T>;
  }
  ```

  </details>

- Implement the component with `useForm` and `<FormProvider>`.
- Wrap the `children` in a `<form>` component and pass `onSubmit={handleSubmit}`.
  - You probably have some type errors on `defaultValues` and `handleSubmit` we will just ignore them using `// @ts-expect-error`
- In `AddProductDialiog` and `EditProductDialog`:
- Remove references to _React hook form_.
- Wrap `ProducForm` and submit buttons in the newly created `<Form>` component.
- Set the type of the buttons to submit and remove the onClicks.
- We could further abstract types for props, eg `resolver: (t: T) => Validate<T>`, but this requires a bit of work, and could be done later as an optional exercise.
