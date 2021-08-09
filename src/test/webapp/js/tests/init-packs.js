/*
 * Copyright (C) con terra GmbH
 */
if (require.packs["@vue/test-utils"]) {
    require.packs["@vue/test-utils"].main = "dist/vue-test-utils.umd";
}
if (require.packs["chai"]) {
    require.packs["chai"].main = "chai";
}
