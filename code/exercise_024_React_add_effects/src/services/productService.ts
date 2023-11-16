import { Product, ProductRequest } from "~/models/Product";

function getAll(): Promise<Product[]> {
  return fetch("/api/products").then((res) => res.json());
}

function add(product: ProductRequest): Promise<Product> {
  return fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((res) => res.json());
}

function update(id: number, product: ProductRequest): Promise<Product> {
  return fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((res) => res.json());
}

function remove(id: number): Promise<void> {
  return fetch(`/api/products/${id}`, {
    method: "DELETE",
  }).then(() => {});
}

export const productService = {
  getAll,
  add,
  update,
  remove,
};
