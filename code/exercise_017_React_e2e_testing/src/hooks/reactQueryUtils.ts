import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { AsyncAction, AsyncResult } from "~/services";

export const toAsyncResult = <TData, TError>(
  res: UseQueryResult<TData, TError>
): AsyncResult<TData, TError> => {
  switch (res.status) {
    case "pending":
      return AsyncResult.pending();
    case "success":
      return AsyncResult.success(res.data);
    case "error":
      return AsyncResult.failure(res.error);
  }
};

export const toAsyncAction = <TData, TError, TVariables, TContext>(
  res: UseMutationResult<TData, TError, TVariables, TContext>
): AsyncAction<TVariables, TData, TError> => {
  switch (res.status) {
    case "idle":
      return AsyncAction.idle(res.mutateAsync);
    case "pending":
      return AsyncAction.pending(res.mutateAsync);
    case "success":
      return AsyncAction.success(res.mutateAsync, res.data);
    case "error":
      return AsyncAction.failure(res.mutateAsync, res.error);
  }
};
