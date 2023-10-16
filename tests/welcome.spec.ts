import { test, expect } from "@playwright/test";

test("Successful related cards routing", async ({ page }) => {
  //arrange
  const baseURL = "https://angular-qa-recruitment-app.netlify.app/";

  //act
  await page.goto(baseURL);

  const learnPagePromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Learn Angular" }).click();
  const learnPage = await learnPagePromise;
  const CLIPagePromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "CLI Documentation" }).click();
  const CLIPage = await CLIPagePromise;
  const blogPagePromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Angular Blog" }).click();
  const blogPage = await blogPagePromise;
  const devToolsPagePromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Angular DevTools" }).click();
  const devToolsPage = await devToolsPagePromise;
  await page.goto(baseURL);

  //assert
  await expect(learnPage).toHaveURL("https://angular.io/tutorial");
  await expect(CLIPage).toHaveURL("https://angular.io/cli");
  await expect(blogPage).toHaveURL("https://blog.angular.io/");
  await expect(devToolsPage).toHaveURL("https://angular.io/guide/devtools");
});

test.describe("Dynamic terminal prompts test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://angular-qa-recruitment-app.netlify.app/");
  });

  test("New component test", async ({ page }) => {
    //arrange
    //act
    await page.getByRole("button", { name: "New Component" }).click();

    //assert
    await expect(page.locator(".terminal")).toHaveText(
      "ng generate component xyz"
    );
  });

  test("Angular Material test", async ({ page }) => {
    //arrange
    //act
    await page.getByRole("button", { name: "Angular Material" }).click();

    //assert
    await expect(page.locator(".terminal")).toHaveText(
      "ng add @angular/material"
    );
  });

  test("Add PWA Support test", async ({ page }) => {
    //arrange
    //act
    await page.getByRole("button", { name: "Add PWA Support" }).click();

    //assert
    await expect(page.locator(".terminal")).toHaveText("ng add @angular/pwa");
  });

  test("Add Dependency test", async ({ page }) => {
    //arrange
    //act
    await page.getByRole("button", { name: "Add Dependency" }).click();

    //assert
    await expect(page.locator(".terminal")).toHaveText("ng add _____");
  });

  test("Run and Watch test", async ({ page }) => {
    //arrange
    //act
    await page.getByRole("button", { name: "Run and Watch Tests" }).click();

    //assert
    await expect(page.locator(".terminal")).toHaveText("ng test");
  });

  test("Build for Production test", async ({ page }) => {
    //arrange
    //act
    await page.getByRole("button", { name: "Build for Production" }).click();

    //assert
    await expect(page.locator(".terminal")).toHaveText("ng build");
  });
});

test("Bottom icons redirection test", async ({ page }) => {
  //arrange
  const baseURL = "https://angular-qa-recruitment-app.netlify.app/";

  //act
  await page.goto(baseURL);
  const animationsPagePromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Animations" }).click();
  const animationsPage = await animationsPagePromise;
  const CLIPagePromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Angular CLI Logo" }).click();
  const CLIPage = await CLIPagePromise;
  const meetupPagePromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Meetup Logo" }).click();
  const meetupPage = await meetupPagePromise;
  const discordPagePromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Discord Logo" }).click();
  const discordPage = await discordPagePromise;

  //assert
  await expect(animationsPage).toHaveURL("https://angular.io/guide/animations");
  await expect(CLIPage).toHaveURL("https://angular.io/cli");
  await expect(meetupPage).toHaveURL(
    "https://www.meetup.com/find/?keywords=angular"
  );
  await expect(discordPage).toHaveURL("https://discord.com/invite/angular");
});

test.only("Github repo redirection test", async ({ page }) => {
  //arrange
  const baseURL = "https://angular-qa-recruitment-app.netlify.app/";

  //act
  await page.goto(baseURL);
  const githubPagePromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Give our repo a star. Star" }).click();
  const githubPage = await githubPagePromise;

  //assert
  await expect(githubPage).toHaveURL("https://github.com/angular/angular");
});
