import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('Login', () => {
    test('login button is visible', async ({ page }) => {

        const regButton = page.getByTestId('log-btn');

        await expect(regButton).toBeVisible();
    });

    test('login button navigates to /login', async ({ page }) => {

        const logButton = page.getByTestId('log-btn');

        await expect(logButton).toBeVisible();

        await logButton.click();

        await expect(page).toHaveURL('/login');
    });

    test('logging in', async ({ page }) => {
        const libraryCode = page.getByTestId('library_card_code').getByRole('textbox');
        const password = page.getByTestId('password').getByRole('textbox');
        const loginUserBtn = page.getByTestId('login_user');
        const logButton = page.getByTestId('log-btn');

        await expect(logButton).toBeVisible();
        await logButton.click();
        await expect(page).toHaveURL('/login');

        await libraryCode.fill('28309248');
        await password.fill('TESTPASSWORD');

        await expect(loginUserBtn).toBeEnabled();
        await loginUserBtn.click();

        await expect(page).toHaveURL('/');
    });
})

