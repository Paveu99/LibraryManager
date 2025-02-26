import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const libraryCode = page.getByTestId('library_card_code').getByRole('textbox');
    const password = page.getByTestId('password').getByRole('textbox');
    const loginUserBtn = page.getByTestId('login_user');
    const logButton = page.getByTestId('log-btn');

    await logButton.click();
    await libraryCode.fill('28309248');
    await password.fill('TESTPASSWORD');
    await loginUserBtn.click();
    await expect(page).toHaveURL('/');

    await page.getByTestId('user_navigation').click();
    await page.getByTestId('rentals_navigation').click();
});

test.describe('Return', () => {

    test('rentals button navigates to /user/rentals', async ({ page }) => {
        await expect(page).toHaveURL('/user/rentals');
    });

    test('returning', async ({ page }) => {
        const rentId = '102';

        await page.getByTestId(`return-button-${rentId}`).click();

        await page.getByTestId(`return-yes`).click();

        await expect(page.getByTestId(`return-confirmation`)).toBeVisible();
    });
})

