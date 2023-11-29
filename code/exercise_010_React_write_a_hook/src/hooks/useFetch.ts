import { useEffect, useState } from "react";
import { AsyncResult } from "~/services";

export function useFetch<T>(fetch: () => Promise<T>): AsyncResult<T> {
  const [state, setState] = useState<AsyncResult<T>>(AsyncResult.pending());

  useEffect(() => {
    setState(AsyncResult.pending());

    fetch()
      .then((data) => {
        setState(AsyncResult.success(data));
      })
      .catch((error) => {
        setState(AsyncResult.failure(error));
      });
  }, [fetch]);

  return state;
}
