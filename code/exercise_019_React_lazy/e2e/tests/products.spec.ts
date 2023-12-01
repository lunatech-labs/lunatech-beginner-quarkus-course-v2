import { test as baseTest, expect } from "@playwright/test";
import { ProductsPage } from "./ProductsPage";

const test = baseTest.extend<{ productsPage: ProductsPage }>({
  productsPage: async ({ page }, use) => {
    // Set up the fixture.
    const productsPage = new ProductsPage(page);

    // Use the fixture value in the test.
    await use(productsPage);

    // Clean up the fixture.
    await productsPage.removeAll();
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

    await expect(
      page.getByRole("button", { name: "Name 12.44€" }),
    ).toBeVisible();
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
    page,
  }) => {
    await productsPage.addProduct({ name: "Name", price: "12.44" });
    const deleteButton = page.getByRole("button", { name: "Delete" });
    await deleteButton.click();
    await expect(deleteButton).not.toBeInViewport();
  });
});

test.describe("Editing Product", () => {
  test("should open edit dialog", async ({ productsPage, page }) => {
    await productsPage.addProduct({ name: "Name", price: "12.44" });
    const editButton = page.getByRole("button", { name: "Edit" });
    await editButton.click();
    await expect(page.getByText("Update product")).toBeVisible();
  });
  test("should close edit dialog on cancel", async ({ productsPage, page }) => {
    await productsPage.addProduct({ name: "Name", price: "12.44" });
    const editButton = page.getByRole("button", { name: "Edit" });
    await editButton.click();
    await expect(page.getByText("Update product")).toBeVisible();
    const cancelButton = page.getByRole("button", { name: "Cancel" });
    await cancelButton.click();
    await expect(page.getByText("Update product")).not.toBeVisible();
  });
});
