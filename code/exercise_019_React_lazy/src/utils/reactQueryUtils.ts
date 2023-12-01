import {
  MutateOptions,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { Action, ActionOption, AsyncAction, AsyncResult } from "~/services";

export const toAsyncResult = <TData, TError>(
  res: UseQueryResult<TData, TError>,
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

const toMutateOptions = <TData, TError, TVariables, TContext>({
  onSuccess,
  onFailure,
}: ActionOption<TData, TVariables, TError>): MutateOptions<
  TData,
  TError,
  TVariables,
  TContext
> => ({
  onSuccess: onSuccess && ((data, variables) => onSuccess(data, variables)),
  onError: onFailure && ((error, variables) => onFailure(error, variables)),
});
export const toAsyncAction = <TData, TError, TVariables, TContext>(
  res: UseMutationResult<TData, TError, TVariables, TContext>,
): AsyncAction<TVariables, TData, TError> => {
  const action: Action<TVariables, TData, TError> = (v, opt) =>
    res.mutate(v, opt && toMutateOptions(opt));

  switch (res.status) {
    case "idle":
      return AsyncAction.idle(action);
    case "pending":
      return AsyncAction.pending(action);
    case "success":
      return AsyncAction.success(action, res.data);
    case "error":
      return AsyncAction.failure(action, res.error);
  }
};
