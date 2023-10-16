import { test, expect } from "@playwright/test";

test.describe("Form fields validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://angular-qa-recruitment-app.netlify.app/form");
  });
  test("Empty name field validation", async ({ page }) => {
    //arrange

    //act
    await page.goto("https://angular-qa-recruitment-app.netlify.app/");
    await page.getByRole("link", { name: "Form" }).click();
    await page.getByLabel("Name").fill("");

    //assert
    await expect(page.getByText("Name is required")).toBeVisible();
  });

  test.only("Special chars in name field validation", async ({ page }) => {
    //arrange

    //act
    await page.goto("https://angular-qa-recruitment-app.netlify.app/");
    await page.getByRole("link", { name: "Form" }).click();
    await page.getByLabel("Name").fill("123./!");

    //assert
    await expect(
      page.getByText("Special characters not allowed")
    ).toBeVisible();
  });
});
