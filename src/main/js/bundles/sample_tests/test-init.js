/*
 * Copyright (C) con terra GmbH
 */
// eslint-disable-next-line no-undef
testConfig({
    jsregistry: [
        {
            //root: "url to registry..",
            packages: [
                // register all self hosted packages
                "app-uitest-support",
                "test-utils",
                "uitest",
                "dojo",
                "@conterra/mapapps-mocha-runner",
                "mocha",
                "chai",
                "apprt",
                "apprt-core"
            ]
        }
    ],
    deps: [
        "apprt-polyfill",
        // Needed for import { assert } from "chai"
        "/js/tests/test-base/init-packs.js"
    ],
    packages: [
        {
            name: "test-apps",
            location: "@@application.base.url@@/js/tests/test-apps"
        },
        {
            // register a package to access the base url
            name: "appContext",
            location: "@@application.base.url@@"
        }
    ]
});
