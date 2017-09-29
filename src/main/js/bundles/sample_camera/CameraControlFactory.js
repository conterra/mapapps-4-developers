import CameraControls from "./CameraControls.vue";
import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import Binding from "apprt-binding/Binding";
import {ifDefined, debounce, debounceOrCancel} from "apprt-binding/Transformers";

function equalsAlmost(a, b, eps) {
    eps = eps || 1e-8;
    return Math.abs(a - b) < eps;
}

class CameraWidgetFactory {

    createInstance() {
        let modelToViewBinding = this._modelToViewBinding = this.declareModelToVueBinding();
        let vm = new Vue(CameraControls);
        let model = this._mapWidgetModel;
        let widget = VueDijit(vm);
        modelToViewBinding.bindTo(model, vm).syncToRightNow();
        // register for clean up
        widget.own(modelToViewBinding);
        return widget;
    }

    declareModelToVueBinding() {
        return Binding.create()
                .syncAll("viewmode", "zoom", "rotation", ifDefined(), ifDefined(debounce()))
                .syncToRight("center", ["latitude", "longitude"], ifDefined(center => [center.latitude, center.longitude]))
                .sync("camera", ["heading", "tilt"], ifDefined(({heading, tilt}) => [heading, tilt]),
                        debounceOrCancel(15,(values, context) => this._putHeadingTiltIntoCamera(values, context.targetValue())))
                .enable();
    }

    _putHeadingTiltIntoCamera([heading, tilt], camera) {
        if (!camera) {
            return camera;
        }
        if (equalsAlmost(camera.heading, heading)
                && equalsAlmost(camera.tilt, tilt)) {
            return camera;
        }
        let newCamera = camera.clone();
        newCamera.heading = heading;
        newCamera.tilt = tilt;
        return newCamera;
    }
}

module.exports = CameraWidgetFactory;