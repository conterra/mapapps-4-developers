/*
 * Copyright (C) con terra GmbH
 */
import { Page } from "@playwright/test";
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
