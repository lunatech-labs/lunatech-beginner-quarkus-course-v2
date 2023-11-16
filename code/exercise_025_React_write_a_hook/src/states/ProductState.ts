import { Context, Dispatch, Reducer, createContext } from "react";
import { Product, ProductRequest } from "~/models/Product";

type ProductAction =
  | { type: "Add"; products: Product[] }
  | { type: "Delete"; id: Product["id"] }
  | { type: "Edit"; id: Product["id"]; product: ProductRequest };

export const ProductReducer: Reducer<Product[], ProductAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "Add":
      return [...state, ...action.products];
    case "Delete":
      return state.filter((o) => o.id !== action.id);
    case "Edit":
      return state.map((o) =>
        o.id === action.id ? { id: action.id, ...action.product } : o
      );
  }
};

const identity = <T>(t: T) => t;

export const ProductDispatchContext: Context<Dispatch<ProductAction>> =
  createContext<Dispatch<ProductAction>>(identity);

export const ProductContext: Context<Product[]> = createContext<Product[]>([]);
