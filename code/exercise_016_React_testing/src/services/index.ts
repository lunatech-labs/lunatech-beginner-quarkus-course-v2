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

const defaultResult = {
  isPending: false,
  isSuccess: false,
  isFailure: false,
  error: undefined,
} as const;
export const AsyncResult = {
  pending: <T, E = Error>(): AsyncResult<T, E> => ({
    type: "Pending",
    ...defaultResult,
    isPending: true,
  }),
  success: <T, E = Error>(data: T): AsyncResult<T, E> => ({
    type: "Success",
    ...defaultResult,
    isSuccess: true,
    data,
  }),
  failure: <T, E>(error: E): AsyncResult<T, E> => ({
    type: "Failure",
    ...defaultResult,
    isFailure: true,
    error,
  }),
} as const;

export interface ActionOption<T, P, E> {
  onSuccess?: (data: T, variables: P) => void;
  onFailure?: (error: E, variables: P) => void;
}
export type Action<P, T, E> = (
  params: P,
  options?: ActionOption<T, P, E>,
) => void;
export type AsyncAction<P, T = void, E = Error> = {
  action: Action<P, T, E>;
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

const defaultAction = { ...defaultResult, isIdle: false } as const;
export const AsyncAction = {
  idle: <P, T, E>(action: Action<P, T, E>): AsyncAction<P, T, E> => ({
    type: "Idle",
    ...defaultAction,
    isIdle: true,
    action,
  }),
  pending: <P, T, E>(action: Action<P, T, E>): AsyncAction<P, T, E> => ({
    type: "Pending",
    ...defaultAction,
    isPending: true,
    action,
  }),
  success: <P, T, E>(
    action: Action<P, T, E>,
    data: T,
  ): AsyncAction<P, T, E> => ({
    type: "Success",
    ...defaultAction,
    isSuccess: true,
    data,
    action,
  }),
  failure: <P, T, E>(
    action: Action<P, T, E>,
    error: E,
  ): AsyncAction<P, T, E> => ({
    type: "Failure",
    ...defaultAction,
    isFailure: true,
    error,
    action,
  }),
} as const;
