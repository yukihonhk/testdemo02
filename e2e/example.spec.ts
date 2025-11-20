import { test, expect } from '@playwright/test';

test.describe('Homepage UI Tests', () => {
  test('should load the homepage and match snapshot', async ({ page }) => {
    await page.goto('http://localhost:3000'); // Change URL if different
    await page.screenshot({ path: 'screenshots/homepage.png', fullPage: true });
    await expect(page).toHaveTitle(/testdemo02|Home/i);

    // Example: check for a navbar
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();

    // Example: check for a heading
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).not.toBeEmpty();

    // Additional element checks can be added here:
    // const button = page.locator('button#my-action');
    // await expect(button).toBeVisible();
  });

  // Add more test cases for other pages or flows below
  // test('should navigate to About page', async ({ page }) => {
  //   await page.goto('http://localhost:3000/about');
  //   await page.screenshot({ path: 'screenshots/about.png', fullPage: true });
  //   const aboutHeading = page.locator('h1');
  //   await expect(aboutHeading).toContainText('About');
  // });
});