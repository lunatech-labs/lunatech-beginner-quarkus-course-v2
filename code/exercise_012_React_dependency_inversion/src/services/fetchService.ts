export const fetchService = {
  get: (url: string) =>
    fetch(url, {
      headers: { "Content-Type": "application/json" },
    }),
  post: <T>(url: string, data: T) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  put: <T>(url: string, data: T) =>
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  delete: (url: string) =>
    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }),
};
