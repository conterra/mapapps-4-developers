import {
    defineConfig,
    devices,
    PlaywrightTestConfig
} from "@playwright/test";
import { env } from "process";

const isCI = env.CI === "true";
const headless = env.HEADLESS === "true" || isCI;

const options = {
    baseURL: "http://localhost:9090",
    isCI,
    headless: env.HEADLESS === "true" || isCI,
    mavenFlags: "--batch-mode --no-transfer-progress",
    chromiumLaunchOptions: {
        // headless mode is used in CI environments
        args: headless
            ? ["--headless", "--disable-gpu"]
            : []
    }
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
    testDir: "./src/test/end-to-end",
    outputDir: "./target/e2e-tests-results",

    /* Removes operating system from default */
    snapshotPathTemplate:
        "{testDir}/snapshots/{testFileName}-snapshots/{arg}-{projectName}{ext}",

    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: options.isCI,
    /* Number of workers */
    workers: 1,

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: options.baseURL,

        /**
         * See https://playwright.dev/docs/trace-viewer
         * ci: Collect trace when retrying the failed test.
         * local: Collect trace for all tests.
         */
        trace: options.isCI ? "on-first-retry": "on"
    },

    /* Retry on CI only */
    retries: options.isCI ? 1 : 0,

    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        [
            "html",
            { outputFolder: "./target/e2e-tests-reports", open: options.isCI ? "never": "always" }
        ],
        [
            "junit",
            { outputFile: "./target/e2e-tests-results/results.xml" }
        ]
    ],

    expect: {
        toHaveScreenshot: {
            maxDiffPixelRatio: 0.1,
            threshold: 0.05
        },
        // increased timeout (default is 5000)
        // pro: less flaky tests, less need to wait for network state
        // con: longer test duration where assertions are failing, which is true during development
        timeout: 30000
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "Desktop Chrome",
            use: {
                ...devices["Desktop Chrome"],
                headless: options.headless,
                launchOptions: options.chromiumLaunchOptions,
                viewport: { width: 1366, height: 768 }
            }
        },
        {
            name: "Galaxy Tab",
            use: {
                ...devices["Galaxy Tab S4 landscape"],
                headless: options.headless,
                launchOptions: options.chromiumLaunchOptions
            }
        }
    ],

    timeout: options.isCI ? 120000 : 30000,

    /* Run your local dev server before starting the tests */
    webServer: {
        // eslint-disable-next-line max-len
        command: `mvn ${options.mavenFlags} initialize && mvn ${options.mavenFlags} compile -Denv=dev -P include-mapapps-deps`,
        url: options.baseURL,
        reuseExistingServer: !isCI
    }
};


export default defineConfig(config);
