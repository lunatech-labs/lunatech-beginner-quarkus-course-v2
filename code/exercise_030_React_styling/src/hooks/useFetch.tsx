import { useQuery } from "@tanstack/react-query";
import { AsyncResult } from "~/services";
import { toAsyncResult } from "./reactQueryUtils";

export function useFetch<T>(url: string): AsyncResult<T> {
  const result = useQuery({
    queryKey: [url],
    queryFn: () =>
      fetch(url, {
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json()),
  });

  return toAsyncResult(result);
}
