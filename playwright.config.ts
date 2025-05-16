import {
    defineConfig,
    devices,
    PlaywrightTestConfig
} from "@playwright/test";
import { env } from "process";

// "CI" environment variable can be used to activate
// specific settings for CI environments.
const envCI = !!process.env.CI

// the test browser is not opened in headless mode
const headless = env.HEADLESS === "true" || envCI;

// gpu is disabled for Chromium in headless mode 
// to ensure stability and performance 
// in environments where gpu acceleration is not supported
const chromiumLaunchOptions = {
    args: headless
        ? ["--headless", "--disable-gpu"]
        : []
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
    testDir: "./src/test/end-to-end",
    outputDir: "./target/end-to-end/results",

    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: envCI,
    /* Retry on CI only */
    retries: envCI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: envCI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        [
            "html",
            {
                outputFolder: "./target/end-to-end/reports/html",
                open: envCI ? "never" : "on-failure"
            }
        ]
    ],

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: "http://localhost:9090",

        /**
         * See https://playwright.dev/docs/trace-viewer
         * ci: Collect trace when retrying the failed test.
         * local: Collect trace for all tests.
         */
        trace: envCI ? "on-first-retry": "on"
    },

    projects: [
        {
            name: "Desktop Chrome",
            use: {
                ...devices["Desktop Chrome"],
                headless: headless,
                launchOptions: chromiumLaunchOptions,
            }
        },
        {
            name: "Mobile Chrome",
            use: {
                ...devices["Galaxy S9+"],
                headless: headless,
                launchOptions: chromiumLaunchOptions
            }
        }
    ],

};


export default defineConfig(config);
