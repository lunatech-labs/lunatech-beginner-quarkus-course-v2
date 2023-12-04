import { expect } from "@playwright/test";
import { ProductsPage } from "./ProductsPage";
import { test as baseTest } from "./fixture";

const test = baseTest.extend<{ productsPage: ProductsPage }>({
  productsPage: async ({ page, context }, use, testInfo) => {
    const productsPage = new ProductsPage(page, context, testInfo);
    await use(productsPage);
    await productsPage.clean();
  },
});

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test.describe("Adding Product", () => {
  test("should allow me to add product", async ({ page, productsPage }) => {
    await productsPage.openAddProductDialog();

    await expect(page.getByText("Add a product")).toBeVisible();

    await page.getByLabel("Name").fill("Name");
    await page.getByLabel("Price").fill("12.44");

    await page.getByRole("button", { name: "Add" }).click();

    const productCard = productsPage.product({ name: "Name" });
    await expect(productCard).toBeVisible();
    await productCard.getByRole("button", { name: "Delete" }).click();
  });

  test("should close the dialog when a product is added", async ({
    productsPage,
    page,
  }) => {
    await productsPage.openAddProductDialog();
    await expect(page.getByText("Add a product")).toBeVisible();

    await page.getByLabel("Name").fill("Name");
    await page.getByLabel("Price").fill("12.44");
    await page.getByRole("button", { name: "Add" }).click();

    await expect(page.getByText("Add a product")).not.toBeVisible();
    const productCard = productsPage.product({ name: "Name" });
    await productCard.getByRole("button", { name: "Delete" }).click();
  });

  test("should close the dialog on cancel", async ({ productsPage, page }) => {
    await productsPage.openAddProductDialog();
    await expect(page.getByText("Add a product")).toBeVisible();

    await productsPage.cancel();

    await expect(page.getByText("Add a product")).not.toBeVisible();
  });
});

test.describe("Deleting Product", () => {
  test("should allow me to delete a product", async ({
    productsPage,
    constants,
  }) => {
    await productsPage.addProduct(constants.product);
    await productsPage.deleteProduct(constants.product);
    await expect(productsPage.product(constants.product)).not.toBeInViewport();
  });
});

test.describe("Editing Product", () => {
  test("should open edit dialog", async ({ productsPage, page, constants }) => {
    await productsPage.addProduct(constants.product);
    await productsPage.openEditProductDialog(constants.product);
    await expect(page.getByText("Update product")).toBeVisible();
  });

  test("should edit product info", async ({
    productsPage,
    page,
    constants,
  }) => {
    await productsPage.addProduct(constants.product);
    await productsPage.openEditProductDialog(constants.product);

    await page.getByLabel("Name").fill("EditedProduct");
    await page.getByLabel("Price").fill("0.99");

    await page.getByRole("button", { name: "Save" }).click();

    await expect(
      page.getByRole("button", { name: "EditedProduct 0.99€" }),
    ).toBeVisible();
  });

  test("should close edit dialog on cancel", async ({
    productsPage,
    page,
    constants,
  }) => {
    await productsPage.addProduct(constants.product);
    await productsPage.openEditProductDialog(constants.product);
    await expect(page.getByText("Update product")).toBeVisible();
    await productsPage.cancel();
    await expect(page.getByText("Update product")).not.toBeVisible();
  });
});
