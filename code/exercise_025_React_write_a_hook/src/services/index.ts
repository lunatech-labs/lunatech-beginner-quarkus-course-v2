export type AsyncResult<T, E = unknown> =
  | { type: "Loading" }
  | { type: "Success"; data: T }
  | { type: "Failure"; error: E };
