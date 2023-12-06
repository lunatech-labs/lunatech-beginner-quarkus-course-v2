import { describe, expect, it, vi } from "vitest";
import { ProductService } from "~/services/productService";
import { productService } from "~/services/productServiceReactQuery";
import { renderHook, waitFor } from "../test-utils";
import { ProductRequest } from "~/models/Product";

const fetchMock = vi.fn<[], Promise<Response>>(() =>
  Promise.resolve(badRequest()),
);
global.fetch = fetchMock;

describe.each<ProductService>([productService])(
  "ProductService",
  (productService) => {
    const product: ProductRequest = { name: "name", price: 12 };

    describe("useProductList", () => {
      it("should be initialized to 'Pending'", () => {
        const hook = renderHook(productService.useProductList);
        expect(hook.result.current.type).toBe("Pending");
      });
      it("should be 'Failure' on error", async () => {
        fetchMock.mockReturnValueOnce(Promise.reject());
        const hook = renderHook(productService.useProductList);
        await waitFor(() => expect(hook.result.current.type).toBe("Failure"));
      });
      it("should be 'Failure' on server error", async () => {
        fetchMock.mockResolvedValueOnce(badRequest());
        const hook = renderHook(productService.useProductList);
        await waitFor(() => expect(hook.result.current.type).toBe("Failure"));
      });
      it("should be 'Success' once resolved", async () => {
        fetchMock.mockResolvedValueOnce(ok({}));
        const hook = renderHook(productService.useProductList);
        await waitFor(() => expect(hook.result.current.type).toBe("Success"));
      });
    });
    describe("useProductGet", () => {
      it("should be initialized to 'Pending'", () => {
        const hook = renderHook(productService.useProductGet);
        expect(hook.result.current.type).toBe("Pending");
      });
      it("should be 'Failure' on error", async () => {
        fetchMock.mockReturnValueOnce(Promise.reject());
        const hook = renderHook(productService.useProductGet);
        await waitFor(() => expect(hook.result.current.type).toBe("Failure"));
      });
      it("should be 'Failure' on server error", async () => {
        fetchMock.mockResolvedValueOnce(badRequest());
        const hook = renderHook(productService.useProductGet);
        await waitFor(() => expect(hook.result.current.type).toBe("Failure"));
      });
      it("should be 'Failure' if doesn't exists", async () => {
        fetchMock.mockResolvedValueOnce(notFound());
        const hook = renderHook(productService.useProductGet);
        await waitFor(() => expect(hook.result.current.type).toBe("Failure"));
      });
      it("should be 'Success' once resolved", async () => {
        fetchMock.mockResolvedValueOnce(ok({}));
        const hook = renderHook(productService.useProductGet);
        await waitFor(() => expect(hook.result.current.type).toBe("Success"));
      });
    });
    describe("useProductCreate", () => {
      it("should be initialized to 'Idle'", () => {
        const hook = renderHook(productService.useProductCreate);
        expect(hook.result.current.type).toBe("Idle");
      });
      it("should be 'Pending' once called", async () => {
        const hook = renderHook(productService.useProductCreate);
        hook.result.current.action(product);
        hook.rerender();
        await waitFor(() => expect(hook.result.current.type).toBe("Pending"));
      });
      it("should be 'Failure' on action error", async () => {
        fetchMock.mockReturnValueOnce(Promise.reject());
        const hook = renderHook(productService.useProductCreate);
        hook.result.current.action(product);
        await waitFor(() => expect(hook.result.current.type).toBe("Failure"));
      });
      it("should be 'Failure' on server error", async () => {
        fetchMock.mockResolvedValueOnce(badRequest());
        const hook = renderHook(productService.useProductCreate);
        hook.result.current.action(product);
        await waitFor(() => expect(hook.result.current.type).toBe("Failure"));
      });
      it("should be 'Success' once action is resolved", async () => {
        fetchMock.mockResolvedValueOnce(ok({}));
        const hook = renderHook(productService.useProductCreate);
        hook.result.current.action(product);
        await waitFor(() => expect(hook.result.current.type).toBe("Success"));
      });
    });
    describe("useProductDelete", () => {
      it("should be initialized to 'Idle'", () => {
        const hook = renderHook(productService.useProductDelete);
        expect(hook.result.current.type).toBe("Idle");
      });
      it("should be 'Pending' once called", async () => {
        const hook = renderHook(productService.useProductDelete);
        hook.result.current.action({ id: 0 });
        hook.rerender();
        await waitFor(() => expect(hook.result.current.type).toBe("Pending"));
      });
      it("should be 'Failure' on action error", async () => {
        fetchMock.mockReturnValueOnce(Promise.reject());
        const hook = renderHook(productService.useProductDelete);
        hook.result.current.action({ id: 0 });
        await waitFor(() => expect(hook.result.current.type).toBe("Failure"));
      });
      it("should be 'Failure' on server error", async () => {
        fetchMock.mockResolvedValueOnce(badRequest());
        const hook = renderHook(productService.useProductDelete);
        hook.result.current.action({ id: 0 });
        await waitFor(() => expect(hook.result.current.type).toBe("Failure"));
      });
      it("should be 'Success' once action is resolved", async () => {
        fetchMock.mockResolvedValueOnce(ok({}));
        const hook = renderHook(productService.useProductDelete);
        hook.result.current.action({ id: 0 });
        await waitFor(() => expect(hook.result.current.type).toBe("Success"));
      });
    });
    describe("useProductUpdate", () => {
      it("should be initialized to 'Idle'", () => {
        const hook = renderHook(productService.useProductUpdate);
        expect(hook.result.current.type).toBe("Idle");
      });
      it("should be 'Pending' once called", async () => {
        const hook = renderHook(productService.useProductUpdate);
        hook.result.current.action({ id: 0, product });
        hook.rerender();
        await waitFor(() => expect(hook.result.current.type).toBe("Pending"));
      });
      it("should be 'Failure' on action error", async () => {
        fetchMock.mockReturnValueOnce(Promise.reject());
        const hook = renderHook(productService.useProductUpdate);
        hook.result.current.action({ id: 0, product });
        await waitFor(() => expect(hook.result.current.type).toBe("Failure"));
      });
      it("should be 'Failure' on server error", async () => {
        fetchMock.mockResolvedValueOnce(badRequest());
        const hook = renderHook(productService.useProductUpdate);
        hook.result.current.action({ id: 0, product });
        await waitFor(() => expect(hook.result.current.type).toBe("Failure"));
      });
      it("should be 'Success' once action is resolved", async () => {
        fetchMock.mockResolvedValueOnce(ok({}));
        const hook = renderHook(productService.useProductUpdate);
        hook.result.current.action({ id: 0, product });
        await waitFor(() => expect(hook.result.current.type).toBe("Success"));
      });
    });
  },
);

function fetchResponse<T>(
  status: number,
  statusText: string,
  data?: T,
): Response {
  return {
    ok: status === 200,
    status,
    statusText,
    json: () => Promise.resolve(data),
  } as Response;
}
const ok = <T>(data: T) => fetchResponse(200, "Ok", data);
const badRequest = () => fetchResponse(400, "Bad Request");
const notFound = () => fetchResponse(404, "Not Found");
