import { test, expect } from "@playwright/test";

test.describe("Form fields validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://angular-qa-recruitment-app.netlify.app/form");
  });
  test.only("Empty name field validation", async ({ page }) => {

    //arrange

    //act
    await page.goto("https://angular-qa-recruitment-app.netlify.app/");
    await page.getByRole("link", { name: "Form" }).click();
    await page.getByLabel("Name").fill("");
    await page.getByText("Name is required").click();

    //assert
    await expect(page.getByText("Name is required")).toHaveText(
      "Name is required"
    );
  });


  
});
