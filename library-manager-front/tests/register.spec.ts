import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

test.describe('Register', () => {
    test('register button is visible', async ({ page }) => {

        const regButton = page.getByTestId('reg-btn');

        await expect(regButton).toBeVisible();
    });

    test('register button navigates to /register', async ({ page }) => {

        const regButton = page.getByTestId('reg-btn');

        await expect(regButton).toBeVisible();

        await regButton.click();

        await expect(page).toHaveURL('/register')
    });

    test('registering', async ({ page }) => {
        const firstName = page.getByTestId('first_name').getByRole('textbox');
        const lastName = page.getByTestId('lastName').getByRole('textbox');
        const email = page.getByTestId('email').getByRole('textbox');
        const password = page.getByTestId('password').getByRole('textbox');
        const registerUserBtn = page.getByTestId('register_user');
        const regButton = page.getByTestId('reg-btn');
        const copyBtn = page.getByTestId('copy_to_clipboard');

        await expect(regButton).toBeVisible();
        await regButton.click();
        await expect(page).toHaveURL('/register');

        await firstName.fill('TEST NAME');
        await lastName.fill('TEST LAST NAME');
        await email.fill('test@email.com');
        await password.fill('TESTPASSWORD');

        await expect(registerUserBtn).toBeEnabled();
        await registerUserBtn.click();

        await expect(copyBtn).toBeVisible();
    });
})

