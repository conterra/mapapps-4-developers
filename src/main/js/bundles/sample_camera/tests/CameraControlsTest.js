import { assert } from "chai";
import module from "module";
import Vue from "apprt-vue/Vue";
import CameraControls from "../CameraControls.vue";

describe(module.id, function(){
    it("Camera Control Component", function () {
        assert.ok(new Vue(CameraControls));
    });
});
