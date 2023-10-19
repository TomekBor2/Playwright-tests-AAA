import { test, expect } from "@playwright/test";

test.describe("Welcome screen headers navigation and incorrect URL test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Header navigation", async ({ page }) => {
    // arrange

    //act
    await page.getByRole("link", { name: "Form" }).click();
    await page.getByRole("link", { name: "Stepper" }).click();
    const twitterPromise = page.waitForEvent("popup");
    await page.getByLabel("Angular on twitter").click();
    const twitterPage = await twitterPromise;
    const youTubePromise = page.waitForEvent("popup");
    await page.getByLabel("Angular on YouTube").click();
    const youTubePage = await youTubePromise;
    await youTubePage.getByRole("button", { name: "Accept all" }).click();

    //assert
    await expect(twitterPage).toHaveURL("https://twitter.com/angular");
    await expect(youTubePage).toHaveURL("https://www.youtube.com/angular");
  });
});

test("Redirection to welcome screen after providing incorrect URL ", async ({
  page,
}) => {
  //arrange
  const wrongURL = "https://angular-qa-recruitment-app.netlify.app/aaa";

  //act
  await page.goto(wrongURL);

  //assert
  await expect(page).toHaveURL(
    "https://angular-qa-recruitment-app.netlify.app/"
  );
});
