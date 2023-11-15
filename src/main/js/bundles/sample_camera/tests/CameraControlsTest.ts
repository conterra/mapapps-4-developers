import { assert } from "chai";
import Vue from "apprt-vue/Vue";
import CameraControls from "../CameraControls.ts.vue";

describe(module.id, function(){
    it("Camera Control Component", function () {
        assert.ok(new Vue(CameraControls));
    });
});
