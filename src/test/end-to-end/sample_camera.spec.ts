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
    await expect(async () => {
        // As this visual comparison will take longer on ci, it is retried with different intervals
        await expect(page).toHaveScreenshot("expect-widget-can-be-used-to-zoom-into-the-map.png");
    }).toPass({
        // Probe, wait 1s, probe, wait 2s, probe, wait 10s, probe, wait 10s, probe
        // ... Defaults to [100, 250, 500, 1000].
        intervals: [1_000, 2_000, 5_000, 10_000],
        timeout: 60_000
    });
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
