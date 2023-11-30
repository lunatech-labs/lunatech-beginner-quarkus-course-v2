import { ProductApi, ProductService } from "~/services/productService";
import { useFetch } from "~/hooks/useFetch";
import { useAction } from "~/hooks/useAction";
import { fetchService } from "~/services/fetchService";

const add =
  <T>(x: T) =>
  (xs?: T[]) => [...(xs ?? []), x];
const update =
  <Id, T extends { id: Id }>(x: T) =>
  (xs?: T[]) =>
    xs?.map((o) => (o.id === x.id ? x : o)) ?? [x];
const remove =
  <Id, T extends { id: Id }>(id: Id) =>
  (xs?: T[]) =>
    xs?.filter((o) => o.id !== id) ?? [];

export const productService: ProductService = {
  useProductList: () => useFetch(ProductApi.list),
  useProductCreate: () =>
    useAction((client) => ({
      mutationFn: (product) =>
        fetchService.post(ProductApi.create, product).then((res) => res.json()),
      onSuccess: (data) => {
        client.setQueryData([ProductApi.list], add(data));
      },
    })),
  useProductUpdate: () =>
    useAction((client) => ({
      mutationFn: ({ id, product }) =>
        fetchService.put(ProductApi.update(id), product).then(() => {}),
      onSuccess: (_, { id, product }) => {
        client.setQueryData([ProductApi.list], update({ id, ...product }));
      },
    })),
  useProductDelete: () =>
    useAction((client) => ({
      mutationFn: ({ id }) =>
        fetchService.delete(ProductApi.delete(id)).then(() => {}),
      onSuccess: (_, { id }) => {
        client.setQueryData([ProductApi.list], remove(id));
      },
    })),
};
