export type Validate<T> =
  | { type: "valid"; data: T }
  | { type: "invalid"; msg: string };
