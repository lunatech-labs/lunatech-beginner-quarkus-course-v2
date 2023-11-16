import { useEffect, useState } from "react";
import { AsyncResult } from "~/services";

export function useFetch<T>(fetch: () => Promise<T>): AsyncResult<T> {
  const [state, setState] = useState<AsyncResult<T>>({ type: "Loading" });

  useEffect(() => {
    setState({ type: "Loading" });

    fetch()
      .then((data) => {
        setState({ type: "Success", data });
      })
      .catch((error) => {
        setState({ type: "Failure", error });
      });
  }, [fetch]);

  return state;
}
