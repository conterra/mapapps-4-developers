/*
    Checks licenses of node dependencies against a list of allowed licenses.
    Fails with exit code != 0 and an error message if a disallowed license is encountered.
    The script should be executed from the project root directory after dependencies have been installed:

        $ tsx ./src/support/js/check-licenses.ts

    To run checks yourself (e.g. to update the allow list or to get details), install
    license-checker yourself and run it from the project root directory:

        $ npm install -g license-checker
        $ license-checker --summary # outputs list of used licenses
        $ license-checker --json    # outputs details

    See also https://www.npmjs.com/package/license-checker
*/

import { init as initChecker } from "license-checker";
import { cwd, exit} from "node:process";

// Licenses known to be OK.
const ACCEPTED_LICENSES = [
    "MIT",
    "ISC",
    "Apache-2.0",
    "Apache 2.0",
    "BSD-2-Clause",
    "BSD-3-Clause",
    "BSD",
    "CC0-1.0",
    "CC-BY-3.0",
    "CC-BY-4.0",
    "Python-2.0",
    "Unlicense" // Note: not unlicenseD (https://opensource.org/licenses/unlicense)
];

// Packages with licenses that are not recognized properly by license-checker.
// These must be checked manually.
const SKIP_PACKAGES = [
    "event-stream@3.0.20", // MIT License not recognized
    "taffydb@2.6.2" // BSD-1-Clause License in source code
];

initChecker(
    {
        start: cwd(),
        onlyAllow: ACCEPTED_LICENSES.join(";"),
        excludePackages: SKIP_PACKAGES.join(";")
    },
    (error, packages) => {
        void packages; // currently unused

        if (error) {
            console.error("Error: ", error);
            exit(1);
        }
        exit(0);
    }
);
