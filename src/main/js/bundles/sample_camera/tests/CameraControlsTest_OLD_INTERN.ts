/*
* ----------------------------------------------------------------------------
* |                                                                          |
* |   IMPORTANT NOTE: This is a sample file for a deprecated intern test.    |
* |                                                                          |
* ----------------------------------------------------------------------------
* */
//@ts-ignore
import registerSuite from "intern!object";
import { assert } from "chai";
import module from "module";
import Vue from "apprt-vue/Vue";
import CameraControls from "../CameraControls.ts.vue";

registerSuite({
    // @ts-ignore
    name: module.id,
    "Camera Control Component": function () {
        assert.ok(new Vue(CameraControls));
    }
});
