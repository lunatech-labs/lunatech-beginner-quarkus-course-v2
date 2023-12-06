import { Product, ProductRequest } from "~/models/Product";
import { ApiError } from "./ApiError";

function getAll(options?: Pick<RequestInit, "signal">): Promise<Product[]> {
  return fetch("/api/products", options).then(
    handleResponse<Product[]>((res) => res.json()),
  );
}

function add(product: ProductRequest): Promise<Product> {
  return fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then(handleResponse<Product>((res) => res.json()));
}

function update(id: number, product: ProductRequest): Promise<void> {
  return fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then(handleResponse(() => {}));
}

function remove(id: number): Promise<void> {
  return fetch(`/api/products/${id}`, {
    method: "DELETE",
  }).then(handleResponse(() => {}));
}

const handleResponse =
  <T>(
    onSuccess: (res: Response) => T | Promise<T>,
    onError?: (res: Response) => Promise<T>,
  ) =>
  (res: Response) => {
    if (res.ok) {
      return onSuccess(res);
    } else if (onError) {
      return onError(res);
    } else {
      return Promise.reject<T>(new ApiError(res.statusText, res.status));
    }
  };

export const productService = {
  getAll,
  add,
  update,
  remove,
};
