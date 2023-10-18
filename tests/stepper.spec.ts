import { test, expect } from "@playwright/test";
import { describe } from "node:test";

describe("Stepper fields validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://angular-qa-recruitment-app.netlify.app/");
    await page.getByRole("link", { name: "Stepper" }).click();
  });

  test.only("Empty name field validation", async ({ page }) => {
    //arrange

    //act
    await page.getByLabel("Name *").click();
    await page.getByLabel("Name *").blur();

    //assert
    expect(page.getByText("This field is required")).toBeVisible();
  });
});
