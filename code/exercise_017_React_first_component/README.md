## Exercise - First component


### Setup

- Install **Node**, eg using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- To scalfold the project, we chose to use [vite](https://vitejs.dev/guide/)
    ```shell
    npm create vite@latest hiquea --template react-ts
    ```

### Creating your first component

- Open `hiquea/src/main.jsx` (it's the main file, it is loaded in `hiquea/index.html:10`)
- Create a component named `HelloWorld`
- Render it in the element with the id `root`

### Running a dev server

```shell
npm install
npm run dev
```

Go to http://localhost:5173/, and check that your component is rendered

