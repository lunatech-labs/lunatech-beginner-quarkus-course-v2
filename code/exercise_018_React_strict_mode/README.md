## Exercise - Strict Mode

### Using Strict Mode

- Simply wrap your `<App />` with `<StrictMode>` in `main.tsx`.
- Run the application and check in the console if there are some errors.

### Note

Strict Mode enables the following checks in development:

- Your components will re-render an extra time to find bugs caused by impure rendering.
- Your components will re-run Effects an extra time to find bugs caused by missing Effect cleanup.
- Your components will be checked for usage of deprecated APIs.

All of these checks are **development-only** and do not impact the production build.

**It's recommended to wrap the entire app in Strict Mode.**
