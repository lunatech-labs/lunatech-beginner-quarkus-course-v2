import {
  QueryClient,
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AsyncAction } from "~/services";
import { toAsyncAction } from "./reactQueryUtils";

export function useAction<TData, TError, TVariables, TContext>(
  options: (
    client: QueryClient,
  ) => UseMutationOptions<TData, TError, TVariables, TContext>,
): AsyncAction<TVariables, TData, TError> {
  const queryClient = useQueryClient();
  const result = useMutation(options(queryClient), queryClient);
  return toAsyncAction<TData, TError, TVariables, TContext>(result);
}
