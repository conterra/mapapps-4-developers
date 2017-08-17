<template>
    <div>
        <div>
            <position-viewer  v-if="latitude !== undefined && longitude !== undefined " :latitude="latitude" :longitude="longitude" />
            <view-mode-switcher v-model="viewmode" />
            <p>Zoom:<input type="range" v-model="zoom" min="2.0" max="25" step ="0.000000000001"/></p>
        </div>
        <div v-if="viewmode === '2D'">
            <p>Rotation:<input type="range" v-model=rotation min="0" max="360" /></p>
        </div>
        <div v-if="viewmode === '3D'">
            <p>Heading:<input type="range" v-model="heading" min="0" max="360" /></p>
            <p>Tilt:<input type="range" v-model="tilt" min="0" max="90" /></p>
        </div>
    </div>
</template>
<script>
    import PositionViewer from "./PositionViewer.vue";
    import ViewModeSwitcher from "./ViewModeSwitcher.vue";
    import Bindable from "apprt-vue/mixins/Bindable";
    export default  {
        mixins: [Bindable],
        data: function() {
            return {
                latitude: undefined,
                longitude: undefined,
                rotation: undefined,
                zoom: undefined,
                heading: undefined,
                tilt: undefined,
                viewmode: undefined
            };
        },
        components: {
            'position-viewer': PositionViewer,
            'view-mode-switcher': ViewModeSwitcher
        }
    };
</script>