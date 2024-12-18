import {
    defineConfig,
    devices
} from "@playwright/test";
import { env } from "process";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const baseURL = "http://localhost:9090";
const isCI = !!env.CI;
const headless = isCI;

export default defineConfig({
    testDir: "./src/test/end-to-end",
    outputDir: "./target/e2e-tests-results",

    /* Removes operating system from default */
    snapshotPathTemplate:
        "{testDir}/{testFileName}-snapshots/{arg}-{projectName}{ext}",

    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Retry on CI only */
    retries: isCI ? 1 : 0,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: isCI,
    /* Opt out of parallel tests on CI. */
    workers: isCI ? 1 : 2,

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry"
    },

    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        [
            "html",
            { outputFolder: "./target/e2e-tests-reports", open: isCI ? "never": "always" }
        ]
    ],

    expect: {
        toHaveScreenshot: {
            maxDiffPixelRatio: 0.01,
            threshold: 0.01
        }
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "Desktop Chrome",
            use: {
                ...devices["Desktop Chrome"],
                headless,
                launchOptions: {
                    // enable WEBGL for headless tests
                    args: headless
                        ? ["--headless", "--use-angle=gl"]
                        : []
                }
            }
        }
    ],
    /* Run your local dev server before starting the tests */
    webServer: {
        command: "mvn compile -Denv=dev -Pinclude-mapapps-deps",
        url: baseURL,
        reuseExistingServer: !isCI
    }
});
