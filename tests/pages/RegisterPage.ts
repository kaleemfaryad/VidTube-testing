import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullNameInput = page.locator('input[name="fullName"]');
    this.usernameInput = page.locator('input[name="username"]');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.confirmPasswordInput = page.locator('input[name="confirmPassword"]');
    this.createAccountButton = page.getByRole('button', { name: 'Create account' });
  }

  async goto() {
    await this.page.goto('/register');
  }

  async register(fullName: string, username: string, email: string, password: string, confirmPassword: string) {
    await this.fullNameInput.fill(fullName);
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.createAccountButton.click();
  }
}