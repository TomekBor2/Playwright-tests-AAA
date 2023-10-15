import { test, expect } from "@playwright/test";

test("Header navigation", async ({ page }) => {
  // arrange
  const baseURL = "https://angular-qa-recruitment-app.netlify.app/";

  //act
  await page.goto(baseURL);
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
