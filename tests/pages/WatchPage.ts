import { Page, Locator } from '@playwright/test';

export class WatchPage {
  readonly page: Page;
  readonly videoTitle: Locator;
  readonly likeButton: Locator;
  readonly subscribeButton: Locator;
  readonly commentInput: Locator;
  readonly commentSubmitButton: Locator;
  readonly commentsList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.videoTitle = page.locator('h1');
    this.likeButton = page.locator('button[aria-pressed]');
    this.subscribeButton = page.getByRole('button', { name: 'Subscribe' });
    this.commentInput = page.getByPlaceholder('Add a comment...');
    this.commentSubmitButton = page.getByRole('button', { name: 'Comment' });
    this.commentsList = page.locator('h2:has-text("Comments")');
  }

  async goto(videoId: string) {
    // Start listening BEFORE navigating, so we don't miss a fast response
    const commentsResponsePromise = this.page.waitForResponse(
      response => response.url().includes('comment') && response.request().method() === 'GET',
      { timeout: 15000 }
    ).catch(() => null); // don't crash if this specific pattern doesn't match — see note below

    await this.page.goto(`/watch/${videoId}`);
    await this.likeButton.waitFor({ state: 'visible' });

    await commentsResponsePromise;
    await this.commentsList.waitFor({ state: 'attached' });
  }

  async toggleLike() {
    const before = await this.likeButton.getAttribute('aria-pressed');
    await this.likeButton.click();
    await this.page.waitForFunction(
      ({ selector, previousValue }) => {
        const btn = document.querySelector(selector);
        return btn?.getAttribute('aria-pressed') !== previousValue;
      },
      { selector: 'button[aria-pressed]', previousValue: before }
    );
  }

  async isLiked(): Promise<boolean> {
    await this.likeButton.waitFor({ state: 'visible' });
    const state = await this.likeButton.getAttribute('aria-pressed');
    return state === 'true';
  }

  async getLikeCount(): Promise<number> {
    const text = await this.likeButton.textContent();
    return parseInt(text!.trim(), 10);
  }

  async postComment(text: string) {
    await this.commentInput.waitFor({ state: 'visible' });
    const before = await this.getCommentCount();

    const postResponsePromise = this.page.waitForResponse(
      response => response.url().includes('comment') && response.request().method() === 'POST',
      { timeout: 15000 }
    );

    await this.commentInput.fill(text);
    await this.commentSubmitButton.click({ noWaitAfter: true });

    await postResponsePromise;
    // give the UI a moment to re-render after the response arrives
    await this.page.waitForFunction(
      (previousCount) => {
        const heading = document.querySelector('h2');
        const match = heading?.textContent?.match(/\d+/);
        const current = match ? parseInt(match[0], 10) : 0;
        return current !== previousCount;
      },
      before,
      { timeout: 10000 }
    );
  }

  async getCommentCount(): Promise<number> {
    await this.commentsList.waitFor({ state: 'attached' });
    const text = await this.commentsList.textContent();
    const match = text!.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }
}