import { test, expect } from "@playwright/test";

test.only("Successful related cards routing", async ({ page }) => {
  //arrange
  const baseURL = "https://angular-qa-recruitment-app.netlify.app/";

  //act
  await page.goto(baseURL);

  const page1Promise = page.waitForEvent("popup");

  await page.getByRole("link", { name: "Learn Angular" }).click();
  const page1 = await page1Promise;
  const page2Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "CLI Documentation" }).click();
  const page2 = await page2Promise;
  const page3Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Angular Blog" }).click();
  const page3 = await page3Promise;
  const page4Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Angular DevTools" }).click();
  const page4 = await page4Promise;

  //assert
  await expect(page.locator("span _ngcontent-rcf-c24")).toHaveText(
    "Recruitment app is running!"
  );
});
