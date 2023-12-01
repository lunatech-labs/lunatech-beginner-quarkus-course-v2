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
  constants: {
    product: {
      name: "",
      price: "",
    },
  },
});

export { fixture as test };
