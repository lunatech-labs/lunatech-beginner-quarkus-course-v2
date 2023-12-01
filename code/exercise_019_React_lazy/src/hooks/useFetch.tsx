import { useQuery } from "@tanstack/react-query";
import { AsyncResult } from "~/services";
import { toAsyncResult } from "~/utils/reactQueryUtils";
import { fetchService } from "~/services/fetchService";

export function useFetch<T>(url: string): AsyncResult<T> {
  const result = useQuery({
    queryKey: [url],
    queryFn: () => fetchService.get(url).then((res) => res.json()),
  });

  return toAsyncResult(result);
}
