import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { WatchPage } from '../pages/WatchPage';

test.describe('Video interactions', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('kaleem', '12345678');
  });

  test('like button toggles correctly on a single click @smoke', async ({ page }) => {
    const watchPage = new WatchPage(page);
    await watchPage.goto('6aa1e2537691d6bb4a471240');

    const count = await page.locator('button[aria-pressed]').count();
    console.log('Matching like buttons found:', count);

    const initialState = await watchPage.isLiked();
    console.log('Initial liked state:', initialState);

    await watchPage.toggleLike();
    await page.waitForTimeout(1000);

    const newState = await watchPage.isLiked();
    console.log('New liked state:', newState);

    expect(newState).toBe(!initialState);
  });

  test('user can post a comment and comment count increases @smoke', async ({ page }) => {
    const watchPage = new WatchPage(page);
    await watchPage.goto('6aa1e2537691d6bb4a471240');

    const before = await watchPage.getCommentCount();
    await watchPage.postComment('Automated test comment');
    const after = await watchPage.getCommentCount();

    expect(after).toBe(before + 1);
  });

  test('rapid repeated clicks on like button do not cause count to desync @regression', async ({ page }) => {
    test.fail(); // Known issue — see VID-2 in Jira. Remove this line once the underlying bug is fixed.

    const watchPage = new WatchPage(page);
    await watchPage.goto('6aa1e2537691d6bb4a471240');

    const startingCount = await watchPage.getLikeCount();
    const startingState = await watchPage.isLiked();

    // Fire multiple rapid clicks without waiting between them
    await Promise.all([
      watchPage.likeButton.click(),
      watchPage.likeButton.click(),
      watchPage.likeButton.click(),
    ]);

    // give the app a moment to settle after the burst
    await page.waitForTimeout(2000);

    const finalState = await watchPage.isLiked();
    const finalCount = await watchPage.getLikeCount();

    // A toggle clicked 3 times (odd number) should end in the OPPOSITE state
    const expectedState = startingState ? false : true;

    console.log('Starting:', startingCount, startingState);
    console.log('Final:', finalCount, finalState);

    expect(finalState).toBe(expectedState);
    // count should only have moved by exactly 1 from where it started,
    // not by 3 (one per click) — proving the toggle isn't double-counting
    expect(Math.abs(finalCount - startingCount)).toBe(1);
  });
});