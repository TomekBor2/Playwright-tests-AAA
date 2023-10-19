import { test, expect } from "@playwright/test";
import { describe } from "node:test";

describe("Stepper fields validation", () => {
  const name = "Tomasz";
  const tooLongName = "sdfjsdifjsdijsdfoaskoafsdfsfdfdfdfd";
  const specCharsName = "!;123";
  const wrongMailFormat = "tomek.pl";
  const correctEmail = "tomek@gmail.com";
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Stepper" }).click();
  });

  test("Empty name field validation", async ({ page }) => {
    //arrange

    //act
    await page.getByLabel("Name *").click();
    await page.getByLabel("Name *").blur();

    //assert
    expect(page.getByText("This field is required")).toBeVisible(); //!!!!!!!!!!!!
  });

  //!Wg treści zadania pola steppera powinny być walidowane pod kątem długości i znaków specjalnych.
  //!Treści oczekiwanych komunikatów błędów zostały przeze mnie wymyślone.

  test("Special chars in name field validation", async ({ page }) => {
    //arrange

    //act
    await page
      .locator("div")
      .filter({ hasText: /^Name \*$/ })
      .nth(2)
      .click();
    await page.getByPlaceholder("Last name, First name").fill(specCharsName);

    //assert
    await expect(
      page.getByText("Special characters not allowed")
    ).toBeVisible();
  });

  test("Too long name validation", async ({ page }) => {
    //arrange

    //act
    await page
      .locator("div")
      .filter({ hasText: /^Name \*$/ })
      .nth(2)
      .click();
    await page.getByPlaceholder("Last name, First name").fill(tooLongName);

    //assert
    await expect(page.getByText("Too long name")).toBeVisible();
  });

  test("Empty email field validation", async ({ page }) => {
    //arrange

    //act
    await page
      .locator("div")
      .filter({ hasText: /^Name \*$/ })
      .nth(2)
      .click();
    await page.getByPlaceholder("Last name, First name").click();
    await page.getByPlaceholder("Last name, First name").blur();

    //assert
    await expect(page.getByText("This field is required")).toBeVisible();
  });

  test("Wrong email format validation", async ({ page }) => {
    //arrange

    //act
    await page
      .locator("div")
      .filter({ hasText: /^Name \*$/ })
      .nth(2)
      .click();
    await page.getByPlaceholder("Last name, First name").fill(name);
    // await page.getByRole("button", { name: "Next" }).click();
    await page.locator("#cdk-step-content-0-0 > form > div > button").click();
    await page.getByLabel("Address *").fill(wrongMailFormat);

    //assert
    await expect(page.getByText("Invalid email format")).toBeVisible();
  });

  test("Check if submitted form contains correct data", async ({ page }) => {
    //arrange

    //act
    await page
      .locator("div")
      .filter({ hasText: /^Name \*$/ })
      .nth(2)
      .click();
    await page.getByPlaceholder("Last name, First name").fill(name);
    await page.locator("#cdk-step-content-0-0 > form > div > button").click();
    await page.getByLabel("Address *").fill(correctEmail);
    await page
      .locator(
        "xpath=/html/body/app-root/app-stepper/div/mat-stepper/div[2]/div[2]/form/div/button[2]"
      )
      .click();

    //assert
    await expect(page.getByText("You are now done!")).toBeVisible();
    await expect(page.getByText(`Name: ${name}`)).toBeVisible();
    await expect(page.getByText(`Address: ${correctEmail}`)).toBeVisible();
  });

  test("Check if 'reset' button returns user to 'Name' field", async ({
    page,
  }) => {
    //arrange

    //act
    await page
      .locator("div")
      .filter({ hasText: /^Name \*$/ })
      .nth(2)
      .click();
    await page.getByPlaceholder("Last name, First name").fill(name);
    await page.locator("#cdk-step-content-0-0 > form > div > button").click();
    await page.getByLabel("Address *").fill(correctEmail);
    await page
      .locator(
        "xpath=/html/body/app-root/app-stepper/div/mat-stepper/div[2]/div[2]/form/div/button[2]"
      )
      .click();
    await page.getByRole("button", { name: "Reset" }).click();

    //assert
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Name \*$/ })
        .nth(2)
    ).toBeVisible();
  });

  test("Blank spaces trimming test", async ({ page }) => {
    //arrange
    const blankSpacesName = "  Tomek   ";
    const blankSpacesEmail = "  tomek@gmail.com ";

    await page.getByLabel("Name *").click();
    await page.getByPlaceholder("Last name, First name").fill(blankSpacesName);
    await page.locator("#cdk-step-content-0-0 > form > div > button").click();
    await page
      .locator("div")
      .filter({ hasText: /^Address \*$/ })
      .nth(2)
      .click();
    await page
      .getByPlaceholder("Ex. 1 Main St, New York, NY")
      .fill(blankSpacesEmail);
    await page.getByRole("button", { name: "Next" }).click();

    //assert
    await expect(page.getByText(`Name: Tomek`)).toBeVisible();
    await expect(page.getByText("Address: tomek@gmail.com")).toBeVisible();
  });
});
