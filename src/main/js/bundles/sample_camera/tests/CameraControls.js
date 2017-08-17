import registerSuite from "intern!object";
import assert from "intern/chai!assert";
import module from "module";
import Vue from "apprt-vue/Vue";
import CameraControls from "../CameraControls.vue"

registerSuite({
    name: module.id,
    "Camera Control Component": function () {
        assert.ok(new Vue(CameraControls));
    }
});