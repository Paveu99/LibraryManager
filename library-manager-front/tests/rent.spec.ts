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

    const books = page.getByTestId('books_navigation');
    await books.click();
});

test.describe('Rent', () => {

    test('books button navigates to /books', async ({ page }) => {
        await expect(page).toHaveURL('/books');
    });

    test('renting', async ({ page }) => {
        const bookId = '05e0297d-4475-4b1b-9eb7-3c7d84e16e1b';

        await page.getByTestId(`book-item-${bookId}`).click();

        await expect(page.getByTestId(`book-details-${bookId}`)).toBeVisible();

        await page.getByTestId(`rent-button-${bookId}`).click();

        await expect(page.getByTestId(`rent-button-confirmation`)).toBeVisible();

        await page.getByTestId(`rent-button-confirmation`).click();

        await expect(page.getByTestId(`confirmation-info`)).toBeVisible();
    });
})

