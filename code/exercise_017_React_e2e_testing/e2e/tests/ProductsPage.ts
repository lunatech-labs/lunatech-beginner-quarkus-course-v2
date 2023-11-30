import type { Page, Locator } from "@playwright/test";

export class ProductsPage {
  private readonly addProductButton: Locator;
  private readonly addProductDialogButton: Locator;
  private readonly deleteButtons: Locator;
  private readonly cancelButton: Locator;

  constructor(public readonly page: Page) {
    this.addProductButton = this.page.getByRole("button", { name: "Add" });
    this.addProductDialogButton = this.page.getByRole("button", { name: "+" });
    this.cancelButton = this.page.getByRole("button", { name: "Cancel" });
    this.deleteButtons = this.page.getByRole("button", { name: "Delete" });
  }

  async openAddProductDialog() {
    await this.addProductDialogButton.click();
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

  async removeAll() {
    for (const _ of await this.deleteButtons.all())
      await this.deleteButtons.first().click();
  }
}
