/*
 * Copyright (C) con terra GmbH
 */
import { expect, Locator, Page } from "@playwright/test";
/**
 * Waits until the div with the class "map__loading-info" is not loading anymore.
 */
export async function waitForMap(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(() => {
        const loadingInfo = document.querySelector(".map__loading-info");
        if (!loadingInfo) {
            return false;
        }
        return !loadingInfo.classList.contains("map__loading-info--is-loading");
    });
}

/**
 * Playwrights 'toHaveScreenshot' matcher auto waits
 * for two identical consecutive screenshots and
 * compares them to the expected screenshot.
 * This is not always ideal, as the map might still be rendering.
 *
 * This function compares screenshots using
 * a custom timeout and intervals.
 */
export async function expectToMatchScreenshot(
    element: Page | Locator,
    screenshotName: string,
    options = { timeout: 20000, intervals: [1000, 1000, 2000, 5000] }
): Promise<void> {
    // The timeout might be moved to options files in the future.
    await expect(async () => {
        await expect(element).toHaveScreenshot(screenshotName);
    }).toPass({
        ... options
    });
}

