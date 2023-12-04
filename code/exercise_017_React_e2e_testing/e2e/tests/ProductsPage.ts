import type { Page, Locator, TestInfo, BrowserContext } from "@playwright/test";

export class ProductsPage {
  private readonly addProductButton: Locator;
  private readonly addProductDialogButton: Locator;
  private readonly cancelButton: Locator;

  constructor(
    public readonly page: Page,
    public readonly context: BrowserContext,
    public readonly testInfo: TestInfo,
  ) {
    this.addProductButton = this.page.getByRole("button", { name: "Add" });
    this.addProductDialogButton = this.page.getByRole("button", { name: "+" });
    this.cancelButton = this.page.getByRole("button", { name: "Cancel" });
  }

  async openAddProductDialog() {
    await this.addProductDialogButton.click();
  }
  async openEditProductDialog({ name }: { name: string }) {
    await this.productButton("Edit", name).click();
  }
  async deleteProduct({ name }: { name: string }) {
    await this.productButton("Delete", name).click();
  }
  async cancel() {
    await this.cancelButton.click();
  }

  async addProduct({ name, price }: { name: string; price: string }) {
    await this.openAddProductDialog();
    await this.page.getByLabel("Name").fill(name);
    await this.page.getByLabel("Price").fill(price);
    await this.addProductButton.click();
  }

  product({ name }: { name: string }) {
    return this.page.locator(`div:has(> button:has-text("${name}"))`);
  }

  async clean() {
    const deleteButtons = this.productButton("Delete", this.testInfo.testId);
    for (const _ of await deleteButtons.all())
      await deleteButtons.first().click();
  }

  private productButton(name: string, productName: string) {
    return this.page.locator(
      `button:text("${name}"):near(:text("${productName}"))`,
    );
  }
}
