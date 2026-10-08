import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameOrEmailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // No id/data-test attributes exist, so we target via the "name" HTML attribute
    this.usernameOrEmailInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(usernameOrEmail: string, password: string) {
  await this.usernameOrEmailInput.fill(usernameOrEmail);
  await this.passwordInput.fill(password);

  await this.signInButton.click({ noWaitAfter: true });

  // Now WE control the waiting explicitly, instead of Playwright guessing
  await this.page.waitForResponse(response =>
    response.url().includes('/login') && response.status() === 200
  );
  await this.page.waitForURL('https://vidtube-frontend-ochre.vercel.app/');
}
}