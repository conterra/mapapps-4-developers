import { Locator, Page, expect, test } from "@playwright/test";
import { expectToMatchScreenshot, waitForMap } from "./common/testUtils";

// End-to-end test for the camera widget in the sample app
//
// - Test are based on the playwright test framework, see https://playwright.dev
// - All tests open the sample app and click the camera tool to open the camera widget
// - The tests check the visibility of the camera widget controls
// - One test uses screenshots and is disabled by default, see comments below
// - The SampleApp and the CameraWidget classes
//   below are used to encapsulate locators and operations.
//   This is a common pattern in Playwright tests.
//   see: https://playwright.dev/docs/pom

test('expect 2D widget shows zoom and rotation', async ({ page }) => {
    const sampleApp = new SampleApp(page);
    await sampleApp.goTo();
    await sampleApp.openCameraWidget();

    const cameraWidget = new CameraWidget(page);

    // 2D Controls are visible
    await expect(cameraWidget.zoomLabel).toBeVisible();
    await expect(cameraWidget.rotationLabel).toBeVisible();

    // 3D Controls are not visible
    await expect(cameraWidget.headingLabel).toBeHidden();
    await expect(cameraWidget.tiltLabel).toBeHidden();
});

test('expect 3D widget shows zoom, heading and tilt', async ({ page }) => {
    const sampleApp = new SampleApp(page);
    await sampleApp.goTo();
    await sampleApp.openCameraWidget();

    const cameraWidget = new CameraWidget(page);
    await cameraWidget.switchViewMode("3D");

    // 3D Controls are visible
    await expect(cameraWidget.zoomLabel).toBeVisible();
    await expect(cameraWidget.headingLabel).toBeVisible();
    await expect(cameraWidget.tiltLabel).toBeVisible();

    // 2D Controls are not visible
    await expect(cameraWidget.rotationLabel).toBeHidden();
});

// This test uses screenshots and is disabled by default
// - Remove '.skip' to enable it
// - When the test is run for the first time, the test will fail but a screenshot wil be taken
// - On subsequent test runs, the actual screenshot is compared with the screenshot from the first run
test.skip('expect map extent is correct when zoomed in', async ({ page }) => {
    const sampleApp = new SampleApp(page);
    await sampleApp.goTo();
    await sampleApp.openCameraWidget();

    const cameraWidget = new CameraWidget(page);
    await cameraWidget.zoomIn(25);
    await waitForMap(page);

    // We use a utility function here to make the screenshot comparison against the map more stable
    await expectToMatchScreenshot(page, "expect-map-extent-is-correct-when-zoomed-in.png");
});

/**
 * Encapsulates locators and operations related to the Sample App.
 */
class SampleApp {
    readonly cameraTool: Locator;
    constructor(private page: Page) {
        this.cameraTool = this.page.getByRole('button', { name: 'Camera' });
    }

    async goTo(): Promise<void> {
        await this.page.goto('/?lang=en');
    }

    async openCameraWidget(): Promise<void> {
        await this.cameraTool.click();
    }
}

/**
 * Encapsulates locators and operations related to the CameraWidget.
 */
class CameraWidget {
    readonly radioButton2D: Locator;
    readonly radioButton3D: Locator;

    readonly zoomLabel: Locator;
    readonly rotationLabel: Locator;

    readonly zoomSlider: Locator;
    readonly headingLabel: Locator;
    readonly tiltLabel: Locator;

    constructor(private page: Page) {
        const radioGroup = page.getByRole("radiogroup");
        this.radioButton2D = radioGroup.getByRole('radio', { name: '2D' }).locator('xpath=../div');
        this.radioButton3D = radioGroup.getByRole('radio', { name: '3D' }).locator('xpath=../div');

        this.zoomLabel = page.getByText("Zoom", { exact: true});
        this.zoomSlider = this.zoomLabel.locator('xpath=..').locator('.v-slider__thumb').first();

        this.rotationLabel = page.getByText("Rotation", { exact: true});
        this.headingLabel = page.getByText("Heading", { exact: true});
        this.tiltLabel = page.getByText("Tilt", { exact: true});
    }

    async zoomIn(pixels = 25): Promise<void> {
        await this.zoomSlider.waitFor();

        const sliderPosition = await this.zoomSlider.boundingBox();
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

    async switchViewMode(mode: "2D" | "3D"): Promise<void> {
        if (mode === "2D") {
            await this.radioButton2D.click();
        } else {
            await this.radioButton3D.click();
        }
    }
}
