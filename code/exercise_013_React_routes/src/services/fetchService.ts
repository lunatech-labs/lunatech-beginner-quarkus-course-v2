import { ApiError } from "./ApiError";

export const fetchService = {
  get: (url: string) =>
    fetch(url, {
      headers: { "Content-Type": "application/json" },
    }).then(handleError),
  post: <T>(url: string, data: T) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleError),
  put: <T>(url: string, data: T) =>
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleError),
  delete: (url: string) =>
    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(handleError),
};

const handleError = (res: Response) => {
  if (res.ok) {
    return res;
  } else {
    return Promise.reject(new ApiError(res.statusText, res.status));
  }
};
