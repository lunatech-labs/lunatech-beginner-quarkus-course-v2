import { useEffect, useState } from "react";
import { AsyncResult } from "~/services";

export function useFetch<T>(
  fetch: (signal: AbortSignal) => Promise<T>,
): AsyncResult<T> {
  const [state, setState] = useState<AsyncResult<T>>(AsyncResult.pending());

  useEffect(() => {
    const controller = new AbortController();
    setState(AsyncResult.pending());

    fetch(controller.signal)
      .then((data) => {
        setState(AsyncResult.success(data));
      })
      .catch((error) => {
        setState(AsyncResult.failure(error));
      });

    return () => controller.abort();
  }, [fetch]);

  return state;
}
