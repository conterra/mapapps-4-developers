import Binding from "apprt-binding/Binding";
import { debounceOrCancel, ifDefined } from "apprt-binding/Transformers";
import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import CameraControls from "./CameraControls.vue";

class CameraWidgetFactory {

    createInstance() {
        let modelToViewBinding = this._modelToViewBinding = this.declareModelToVueBinding();
        const vm = new Vue(CameraControls);
        const model = this._mapWidgetModel;
        const widget = VueDijit(vm);

        // bind model and view model
        modelToViewBinding.bindTo(model, vm);

        // register methods to enable/disable binding
        widget.enableBinding = function () {
            modelToViewBinding.enable().syncToRightNow();
        }
        widget.disableBinding = function () {
            modelToViewBinding.disable();
        }

        // clean up binding and attached functions
        widget.own({
            remove() {
                modelToViewBinding.unbind();
                modelToViewBinding = undefined;
                widget.enableBinding = widget.disableBinding = undefined;
            }
        });

        return widget;
    }

    declareModelToVueBinding() {
        return Binding.create()
            .sync("viewmode", ifDefined(), ifDefined())
            .sync("zoom", log("left", ignoreNonIntegerNumbers), log("right", ifDefined(debounceOrCancel(10))))
            .sync("rotation", log("left", ifDefined()), log("right", ifDefined(debounceOrCancel(10))))
            .syncToRight("center", ["latitude", "longitude"], ifDefined(center => [center.latitude, center.longitude]))
            .sync("camera", ["heading", "tilt"], ifDefined(({ heading, tilt }) => [heading, tilt]),
                debounceOrCancel(
                    15,
                    (values, context) => this._putHeadingTiltIntoCamera(values, context.targetValue())
                )
            );
    }

    _putHeadingTiltIntoCamera([heading, tilt], camera) {
        if (!camera) {
            return camera;
        }
        if (equalsAlmost(camera.heading, heading)
            && equalsAlmost(camera.tilt, tilt)) {
            return camera;
        }
        const newCamera = camera.clone();
        newCamera.heading = heading;
        newCamera.tilt = tilt;
        return newCamera;
    }
}

function equalsAlmost(a, b, eps) {
    eps = eps || 1e-8;
    return Math.abs(a - b) < eps;
}

function ignoreNonIntegerNumbers(v, { ignore }) {
    if (v && Number.isInteger(v)) {
        return v;
    }
    return ignore();
}

function log(prefix, cb) {
    return (v, ctx) => {
        console.debug(`${prefix}: ${ctx.sourceName} -> ${ctx.targetName} : ${v}`);
        return cb && cb(v, ctx);
    }
}

export default CameraWidgetFactory;
