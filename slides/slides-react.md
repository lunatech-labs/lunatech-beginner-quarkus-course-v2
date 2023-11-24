---
theme: gaia
marp: true
class:
    - lead
---

# React

---

## Part I - Fundamentals

---

### Intro
> React is a JavaScript library for building user interfaces.
Its purpose is to facilitate the creation of complex UIs by composing small "components".

---

### Virtual DOM (VDOM)

---

#### DOM

> The Document Object Model (DOM) is a programming API for HTML and XML documents.
It allows programs to create and build documents, navigate their structure, and add, modify, or delete elements and content.

---

#### VDOM

> The virtual DOM (VDOM) is a programming concept where a “virtual” representation of a UI is kept in memory.
It enables the declarative API of React: You tell React what state you want the UI to be in, and it makes sure the DOM matches that state.

@see reconciliation.

---

### Components

>A component is a part of the ui that can be composed, reused, or easily reorganized.
Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

`Component: Props -> React.Element`

---

#### Exercise

`Break your UI into components`

--- 

#### Class Components ***@deprecated***

A class that extends `React.Component` and implements a render method

```tsx
class HelloWorld extends React.Component {
  render() {
    return <div>Hello World!</div>;
  }
}
```

---

#### Functional Components
A javascript function that return a React element
```tsx
const HelloWorld = () => <h1>Hello World!</h1>;
```

---

#### JSX (*JavaScript XML*)
> JSX is an XML-like syntax extension to JavaScript.
JSX code will be transpiled by a preprocessor into react elements.

```jsx
<h1 className="center">Hello World!</h1>;
```

```jsx
React.createElement("h1", { className:"center" }, "Hello World!");
```

---

#### Rendering Components
> React app usually have a root DOM node where it will be rendered.
Bellow the root node is the element with the id `root`.

```jsx
ReactDOM
  .createRoot(document.getElementById("root"))
  .render(<HelloWorld />)
```

---

#### Exercise
`Your first component`

---

### Props

> React components use props to communicate with each other. 
Every parent component can pass some information to its child components by giving them props.
Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including objects, arrays, and functions.

---

#### Reading Props

```jsx
const Hello = ({ name }) => <h1>Hello {name}!</h1>;
```

--- 

#### Passing Props

```jsx
<Hello name="World" />
```

---

#### Predefined Props

Some props are predifined, for example `src`, `alt`, `width`, and `height` are some of the props you can pass to an `<img>` tag.


```jsx
<img src="logo.png" alt="Logo" width={64} height={64} />
```

---

#### Special Props - `children`
> `chidlren` prop lets other components pass arbitrary children to a component.


```tsx
const Container = ({ children }) => <div>{children}</div>

<Container>
  Hello
</Container>
```

--- 

#### Exercise
`Passing props`

---

#### Special Props - `key`
> `key` is a string or a number that uniquely identifies each items among others in that array. It helps React identify which item has been moved, added, or removed.

```jsx
const ProductList = ({products}) => 
  products.map(({ id, name }) => <li key={id}>{name}</li>);
```

--- 

#### Exercise
`Rendering lists`

---

#### Special Props - `ref`
> Refs provide a way to access DOM elements managed by React.
It can be needed to focus a node, scroll to it, or measure its size and position.

⚠️ Refs are an escape hatch. You should only use them when you have to “step outside React”

```tsx
const MyComponent = () => {
  const myRef = useRef(null);
  return <input ref={myRef} />;
}
```

---

### State

> In React, data that changes over time is called state. You can add state to any component, and update it as needed.

---

#### State - useState your first **hook**

> Hooks are special functions that start with ***use***. They let you “hook into” React features like state.

You can add state to a component with a useState Hook

```tsx
import { useState } from "React";

const [counter, setCounter] = useState(0);
```

--- 

#### Exercise
`A stateful component`

--- 

#### Exercise
`Adding some types`

---

#### Rendering update

There are two reasons for a component to render:

- It’s the component’s initial render.
- The component’s (or one of its ancestors’) state has been updated.

---

#### State as a snapshot 

> React state behaves more like a snapshot. Setting it does not change the state variable you already have, but instead triggers a re-render. This can be surprising at first!

```tsx
console.log(count);  // 0
setCount(count + 1); // Request a re-render with 1
console.log(count);  // Still 0!
```

--- 

#### State as a snapshot

```tsx
const Counter = () => {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+2</button>
    </>
  )
}
```

--- 

#### State as a snapshot

```tsx
const Counter = () => {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+2</button>
    </>
  )
}
```

---

#### Principles for structuring state 

---

##### Group related state

> If two state variables always change together, it may make sense to unify them into a single state variable.

```tsx
const [x, setX] = useState(0);
const [y, setY] = useState(0);
```
vs 
```tsx
const [position, setPosition] = useState({ x: 0, y: 0 });
```

---

##### Avoid contradictions in state 

> When the state is structured in a way that several pieces of state may contradict and “disagree” with each other, you leave room for mistakes.

```tsx
const [isSending, setIsSending] = useState(false);
const [isSent, setIsSent] = useState(false);
// `isSending` and `isSent` can be true at the same time
```
vs
```tsx
type Status = 'waiting' | 'sending' | 'sent'
const [status, setStatus] = useState<Status>('waiting');
```

---

##### Avoid redundant state 

> If you can calculate some information from variables during rendering, you should not put that information into a state.

```tsx
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState('');
```
vs
```tsx
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fullName = firstName + ' ' + lastName;
```

---

##### Avoid duplication in state. 
> When the same data is duplicated between multiple state variables, it is difficult to keep them in sync. Reduce duplication when you can.

##### Avoid deeply nested state. 
> Deeply hierarchical state is not very convenient to update. When possible, prefer to structure state in a flat way.

---

#### State - The Data Flows Down

> React uses one-way data flow, passing data down the component hierarchy from parent to child component. It may not be immediately clear which component should own what state.

---

#### Control the component

> Sometimes, we want the state of two components to change together.

##### Lifting state up

1. Remove state from both of them
2. Move it to their closest common parent
3. Pass it down to them via props.

---

#### [Un]Controlled components 

A Controlled Component is one that takes its current value through props and notifies changes through callbacks like onChange. 

A Uncontrolled Component is one that stores its own state internally, and you query the DOM using a ref to find its current value when you need it. This is a bit more like traditional HTML.

---

#### Exercise 

`Editing, Inserting`

---

## Part II - ??? // TODO find name

---

### Hooks

> Hooks let you use different React features from your components. You can either use the built-in Hooks or combine them to build your own.

---

#### Common Hooks

- State Hooks 
  - `useState` state you can update directly.
  - `useReducer` state with the update logic inside a reducer function.
- Context Hooks
  - `useContext` reads and subscribes to a context.
- Effect Hooks
  - `useEffect` connects a component to an external system.
- Performance Hooks
  - `useCallback` lets you cache a function definition before passing it down to an optimized component.
  - `useMemo` lets you cache the result of an expensive calculation

---

##### Extracting State Logic into a Reducer - `useReducer`

> The reducer is a function that receives the state and the action to be performed as parameters and must return a new version of the state.

```tsx
function counterReducer(state: number, action: "increment" | "decrement") {
  switch (action) {
    case "increment": return state + 1;
    case "decrement": return state - 1;
  }
}
const [count, dispatch] = useReducer(counterReducer, 0);
```
---

##### Passing Data Deeply with Context - `useContext`

> Passing props can become verbose and inconvenient if you have to pass them through many components in the middle. Context lets the parent component make some information available to any component in the tree below it.

```tsx
const CounterContext = createContext({ count: 0 });

<CounterContext.Provider value={{ count: 1 }}>
  <CounterComponent />
</CounterContext.Provider>

const CounterComponent = () => {
  const counter = useContext(CounterContext);
  return <div>Count: {counter.count}</div>;
};
```

---

#### Exercise 

`Reducer and Context`

---

##### Effect - `useEffect`

> Effects let you specify side effects that are caused by rendering, rather than by a particular event, so  that you can synchronize your component with some system outside of React.

---

##### How to write an Effect 

###### 1. Declare an Effect

```tsx
useEffect(() => {
  /* 1. Your effect */

  return /* 2. Add cleanup if needed */
}, [/* 3. Specify the dependencies */])
```

---

###### 2. Add cleanup if needed

> The cleanup function allows us to tidy up our code before our component unmounts. Some example of cleanup function:

  - Cleaning up a subscription
  - Canceling a fetch request
  - Reseting an animation

---

###### 3. Specify the dependencies

- If you don’t specify it, the effect runs after every render
- If it’s empty `[]`, it runs only after the initial render
- If an array with the dependencies is passed, it runs after the initial render and also if any of the dependencies changes
  - Notice that it must contain the list of values used in the effect. 

---

##### Effects vs Events 

- Event handlers run in response to specific interactions 
- Effects run whenever synchronization is needed 

---

#### Exercise 

`Add effects`

---

### Performance Hooks - `useMemo`

It helps optimize performance by caching the result of the operation and returning the cached result on subsequent renders if the dependencies have not changed.

```tsx
  const memoizedValue = useMemo(() => 
    return fibonacci(n);
  }, [n]);
```

---

### Performance Hooks - `useCallback`

// TODO When to use...

```tsx
  const submit = useCallback((productRequest) => 
    return productService.edit(productId, productRequest);
  }, [productId]);
```

---

##### Custom Hooks

---

#### Exercise 

`useFetch`

---

## Part III - Ecosystem

---

### Api calls

> We saw how to fetch data in React using the `useState` and `useEffect` hooks or with our custom `useFetch` hook. We also saw how to manage our state using `useReducer`. 
We will now use a library that handles all the tricky parts of fetching, synchronizing and updating server state.

--- 

#### Exercise

`React query`

---

### Router

> Routes are a way to organize your React application into different pages.
There are several React routing libraries available:
- React Router
- Reach router
- TanStack Router 

---

#### Exercise

`Add routes`

---

### Styling
// TODO 

> There are many ways to style a React application
- CSS-in-CSS (e.g. CSS, Sass, CSS Modules, or CSS Modules with Sass)
- CSS-in-JS (e.g. Styled Components, Emotion)
- Utility-First-CSS (e.g. Tailwind CSS)

--- 
#### CSS
--- 
#### CSS-in-JS
--- 
#### Utility-First-CSS
--- 
#### Component library
---

#### Exercise

`Add a component library`

---

### Forms

---

### Validating data

---

#### Exercise 
`form & validation`

---
### Testing
#### Jest
#### React testing library

---

#### Exercise

`Unit tests`

---

#### Playwright

---

#### Exercise

`End to end tests`

---
?
### Framework
### SSR
### SSG

--- 
## Part IV 
## Built-in React Components and API

---

### Fragment

> `<Fragment>`, often used via `<>...</>` syntax, lets you group elements without a wrapper node.

```tsx
<>
  <OneChild />
  <AnotherChild />
</>
```

--- 

### Profiler

---

### StrictMode

> Strict Mode is a tool in React for highlighting potential problems in an application. By wrapping a component tree with StrictMode, React will activate additional checks and warnings for its descendants.

```tsx
<StrictMode>
  <App />
</StrictMode>
```
---

#### Exercise 
`<StrictMode>`

---

### lazy

> `lazy` lets you defer loading component’s code until it is rendered for the first time.

```tsx
const ProductPage = lazy(() => import('~/pages/ProductPage.tsx'));
```

--- 

### Suspense

> Suspense is a component that lets you specify the fallback content to display while waiting for a component to load. 
It is used in conjunction with:
- Data fetching with Suspense-enabled frameworks like Relay and Next.js
- Lazy-loading component code with `lazy`
- Reading the value of a `Promise` with the `use` (🧪) hook

---

### Exercise 
`<Suspense> lazy </Suspense>`

---

### forwardRef

---

### memo

---

### startTransition

// TODO change
> useTransition hook allows you to mark certain updates as transitions so they can be deprioritized, allowing other, more urgent updates to be processed first. This ensures that the UI remains responsive during updates that might take some time.

---

### Portals

> Portals lets you render components outside the current React tree hierarchy.
Most common use cases are when the child components need to visually break out of the parent container, eg for Modal, Tooltip ...

```tsx
const Modal = (props) => {
  ...
  return (
    createPortal(
        {portalContent}, // Some JSX
        document.body // DOM node where it'll be rendered
      )}
  )
}
```

---


<!-- TODO??: 
--- 
## Part V - ...
---
### Error Boundaries
---
### Render Props
### Higher Order Components
-->
