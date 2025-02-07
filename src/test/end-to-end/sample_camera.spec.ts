import { test, expect, Page, Locator } from "@playwright/test";
import { waitForMap } from "./common/testUtils";

/**
 * Test which uses the camera widget to zoom into the map.
 * It uses the page object model pattern, where interaction with the sample app and
 * the camera widget is encapsulated in separate page object classes.
 */
test('expect widget can be used to zoom into the map', async ({ page }) => {
    const sampleApp = new SampleApp(page);
    await sampleApp.goTo();

    await sampleApp.openCameraWidget();

    const cameraWidget = new CameraWidget(page);
    await cameraWidget.zoomIn(25);

    await waitForMap(page);

    await expect(page).toHaveScreenshot("expect-widget-can-be-used-to-zoom-into-the-map.png");
});


/**
 * Sample application page object.
 * Can be used to interact with the sample application.
 */
class SampleApp {
    readonly cameraTool: Locator;
    constructor(private page: Page) {
        this.cameraTool = this.page.getByRole('button', { name: 'Camera' });
    }

    async goTo() {
        await this.page.goto('/');
    }

    async openCameraWidget() {
        await this.cameraTool.click();
    }
}

/**
 * Camera widget page object.
 * Can be used with the camera widget.
 */
class CameraWidget {
    readonly slider: Locator;
    constructor(private page: Page) {
        this.slider = this.page.locator('.v-slider__thumb').first();
    }

    async zoomIn(pixels = 25) {
        await this.slider.waitFor();

        const sliderPosition = await this.slider.boundingBox();
        if (sliderPosition === null) {
            throw new Error('Slider not found');
        }

        // move slider by pixels
        const y = sliderPosition.y + sliderPosition.height / 2;
        await this.page.mouse.move(sliderPosition.x + sliderPosition.width / 2, y);
        await this.page.mouse.down();
        await this.page.mouse.move(sliderPosition.x + pixels, y);
        await this.page.mouse.up();
    }
}