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

export type AsyncAction<P, T = void, E = Error> = {
  action: (params: P) => Promise<T>;
} & (
  | {
      type: "Idle";
      isPending: false;
      isSuccess: false;
      isFailure: false;
      isIdle: true;
      error: undefined;
    }
  | (AsyncResult<T, E> & { isIdle: false })
);

export const AsyncAction = {
  idle: <P, T, E>(action: (params: P) => Promise<T>): AsyncAction<P, T, E> => ({
    type: "Idle",
    isPending: false,
    isSuccess: false,
    isFailure: false,
    isIdle: true,
    action,
    error: undefined,
  }),
  pending: <P, T, E>(
    action: (params: P) => Promise<T>
  ): AsyncAction<P, T, E> => ({
    type: "Pending",
    isPending: true,
    isSuccess: false,
    isFailure: false,
    isIdle: false,
    action,
    error: undefined,
  }),
  success: <P, T, E>(
    action: (params: P) => Promise<T>,
    data: T
  ): AsyncAction<P, T, E> => ({
    type: "Success",
    isPending: false,
    isSuccess: true,
    isFailure: false,
    isIdle: false,
    data,
    action,
    error: undefined,
  }),
  failure: <P, T, E>(
    action: (params: P) => Promise<T>,
    error: E
  ): AsyncAction<P, T, E> => ({
    type: "Failure",
    isPending: false,
    isSuccess: false,
    isFailure: true,
    isIdle: false,
    error,
    action,
  }),
};
