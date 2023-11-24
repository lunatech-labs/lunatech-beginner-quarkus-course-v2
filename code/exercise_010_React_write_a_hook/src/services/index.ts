export type AsyncResult<T, E = Error> =
  | {
      type: "Pending";
      isPending: true;
      isSuccess: false;
      isFailure: false;
      error: undefined;
    }
  | {
      type: "Success";
      isPending: false;
      isSuccess: true;
      isFailure: false;
      data: T;
      error: undefined;
    }
  | {
      type: "Failure";
      isPending: false;
      isSuccess: false;
      isFailure: true;
      error: E;
    };

export const AsyncResult = {
  pending: <T, E = Error>(): AsyncResult<T, E> => ({
    type: "Pending",
    isPending: true,
    isSuccess: false,
    isFailure: false,
    error: undefined,
  }),
  success: <T, E = Error>(data: T): AsyncResult<T, E> => ({
    type: "Success",
    isPending: false,
    isSuccess: true,
    isFailure: false,
    data,
    error: undefined,
  }),
  failure: <T, E>(error: E): AsyncResult<T, E> => ({
    type: "Failure",
    isPending: false,
    isSuccess: false,
    isFailure: true,
    error,
  }),
} as const;
