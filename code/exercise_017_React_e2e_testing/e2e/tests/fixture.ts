import { test } from "@playwright/test";

type PageData = {
  constants: {
    product: {
      name: string;
      price: string;
    };
  };
};
const fixture = test.extend<PageData>({
  constants: (_, use, testInfo) => {
    return use({
      product: {
        name: `Product Name ${testInfo.testId}`,
        price: "12.99",
      },
    });
  },
});

export { fixture as test };
