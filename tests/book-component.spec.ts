import { expect, test } from '@playwright/test';

test('book component is initiated correctly', async ({ page }) => {
	await page.goto('/');
    const leftPage = page.getByTestId('left-page');
    const rightPage = page.getByTestId('right-page');

	await expect(leftPage).toBeHidden();
    await expect(rightPage).toBeVisible();
});