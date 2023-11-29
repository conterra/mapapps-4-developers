// eslint-disable-next-line no-undef
testConfig({
    jsregistry: [{
        //root: "url to registry..",
        packages: [
            // register all self hosted packages
            "*"
        ]}
        //uncomment, if project runs in remote mode
        // ,{
        //     root: "@@mapapps.remote.base@@/resources/jsregistry/root",
        //     packages: [
        //         "apprt-polyfill",
        //         "apprt@4.x",
        //         "apprt-vue@4.x",
        //         "vuetify@~0.14.7",
        //         "esri@4.x"
        //     ]
        // }
    ],
    // ensure babel polyfill is loaded during test execution
    deps: [
        "apprt-polyfill",
        // Needed for import { assert } from "chai"
        "/js/tests/init-packs.js"
    ]
});
