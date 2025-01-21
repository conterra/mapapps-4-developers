/*
 * Copyright (C) con terra GmbH
 */

// Use UMD builds of libraries
if (require.packs["@vue/test-utils"]) {
    require.packs["@vue/test-utils"].main = "dist/vue-test-utils.umd";
}
if (require.packs["chai"]) {
    require.packs["chai"].main = "chai";
}
if (require.packs["sinon"]) {
    require.packs["sinon"].main = "pkg/sinon";
}
