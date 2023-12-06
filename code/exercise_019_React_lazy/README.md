## Exercise - lazy

Code Splitting with lazy.

- Run the command `npm run build` and check the ouput.
    <details>
    <summary>Output</summary>
      
    ```tsx
    dist/index.html                  0.25 kB │ gzip:   0.19 kB
    dist/assets/index-blEtjepM.js  507.94 kB │ gzip: 157.19 kB
    ```
    </details>

- In `router` replace `ProductsPage` and `ProductPage`, by a lazy reprensentation.
- Wrap them with `<Suspense>` and set the `fallback` to `<CircularProgress />`.
- Run the app and navigate to a page. You will see that the component is fetched.
- Re-run the command `npm run build` and check the ouput.
    <details>
    <summary>Output</summary>
      
    ```tsx
    dist/index.html                              0.24 kB │ gzip:  0.18 kB
    dist/assets/ProductPage-5rL8c5Y_.js          0.96 kB │ gzip:  0.54 kB
    dist/assets/ProductsPage--_MOH_jp.js        15.12 kB │ gzip:  5.13 kB
    dist/assets/EditProductDialog-N9asOsyE.js  200.16 kB │ gzip: 57.65 kB
    dist/assets/index-slGYeOOS.js              293.52 kB │ gzip: 97.19 kB    
    ```
    </details>

The combination of Lazy Loading and Suspense leads to optimizations in the application bundle.
