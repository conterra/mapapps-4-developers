/*
 * Copyright (C) con terra GmbH
 */
import { expect, Frame, Locator, Page } from "@playwright/test";

/**
 * Waits until the map is loaded.
 *
 * If the map is located in an iframe, a selector like '#mapapps_container' can be passed
 * to the function to wait for the map in the iframe.
 */
export async function waitForMap(page: Page, 
    options: { iframeSelector?: string, timeout?: number  } = {}): Promise<void> {

    const { iframeSelector, timeout } = options;

    let mapContainer: Page | Frame = page;
    if (iframeSelector) {
        const frameHandle = await page.waitForSelector(iframeSelector);
        const frame = await frameHandle.contentFrame();
        if (!frame) {
            throw new Error(`Iframe ${iframeSelector} not found`);
        }
        mapContainer = frame;
    }

    await mapContainer.waitForLoadState('networkidle');

    const waitOptions: { timeout?: number; } = {};
    if (timeout != null) {
        waitOptions['timeout'] = timeout;
    }

    await mapContainer.waitForFunction(() => {
        // this code is executed in the context of the browser
        const loadingIndicator = document.querySelector(".map__loading-info");
        return loadingIndicator
            && !loadingIndicator.classList.contains("map__loading-info--is-loading");
    }, waitOptions);
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