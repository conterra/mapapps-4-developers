import { test, expect, Page } from "@playwright/test";

test('expect widget can be used to zoom into the map', async ({ page }) => {
    await page.goto('/');

    // open camera widget
    const cameraTool = page.getByLabel('Camera');
    await cameraTool.click();

    // zoom in
    await zoom(page, 25);

    // wait for the map to update
    await page.waitForLoadState('networkidle');

    // compare the screenshot
    await expect(page).toHaveScreenshot();
});

async function zoom(page: Page, pixels: number) {
    const slider = page.locator('.v-slider__thumb').first();
    await slider.waitFor();

    const sliderPosition = await slider.boundingBox();
    if (sliderPosition === null) {
        throw new Error('Slider not found');
    }

    // move slider by pixels
    const y = sliderPosition.y + sliderPosition.height / 2;
    await page.mouse.move(sliderPosition.x + sliderPosition.width / 2, y);
    await page.mouse.down();
    await page.mouse.move(sliderPosition.x + pixels, y);
    await page.mouse.up();
}
