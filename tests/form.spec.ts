import { test, expect } from "@playwright/test";

test.describe("Form fields validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://angular-qa-recruitment-app.netlify.app/");
    await page.getByRole("link", { name: "Form" }).click();
  });

  test("Empty name field validation", async ({ page }) => {
    //arrange

    //act
    await page.getByLabel("Name").fill("");

    //assert
    await expect(page.getByText("Name is required")).toBeVisible();
  });

  test("Special chars in name field validation", async ({ page }) => {
    //arrange
    const specCharsName = "123./!";

    //act
    await page.getByLabel("Name").fill(specCharsName);

    //assert
    await expect(
      page.getByText("Special characters not allowed")
    ).toBeVisible();
  });

  test("Too long name validation", async ({ page }) => {
    //arrange
    const tooLongName = "sdfjsdifjsdijsdfoaskoafsdfsfdfdfdfd";

    //act
    await page.getByLabel("Name").fill(tooLongName);

    //assert
    await expect(page.getByText("Too long name")).toBeVisible();
  });

  test("Special chars in Alter Ego field validation", async ({ page }) => {
    //arrange
    const specCharsAlterEgo = "123./!";

    //act
    await page.getByLabel("Alter Ego").fill(specCharsAlterEgo);

    //assert
    await expect(
      page.getByText("Special characters not allowed")
    ).toBeVisible();
  });

  test("Too long Alter Ego validation", async ({ page }) => {
    //arrange
    const tooLongAlterEgo = "sdfjsdifjsdijsdfoaskoafsdfsfdfdfdfd";

    //act
    await page.getByLabel("Alter Ego").fill(tooLongAlterEgo);

    //assert
    await expect(page.getByText("Too long Alter Ego")).toBeVisible();
  });

  test("Check if  clicking 'New hero' clears form fields", async ({
    page,
  }) => {
    //arrange
    const name = "Tomek";
    const alterEgo = "Tomo";

    //act
    await page.getByLabel("Name").fill(name);
    await page.getByLabel("Alter Ego").fill(alterEgo);
    await page.getByLabel("Hero Power").selectOption("Super Flexible");
    await page.getByRole("button", { name: "New Hero" }).click();

    //assert
    await expect(page.getByLabel("Name")).toHaveText("");
    await expect(page.getByLabel("Alter Ego")).toHaveText("");
    await expect(
      page.locator(".form-control ng-untouched ng-pristine ng-invalid")
    ).toBeVisible();
  });
});
