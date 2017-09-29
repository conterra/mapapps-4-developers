<template>
    <v-layout row wrap>
        <v-flex xs12>
            <position-viewer  v-if="latitude !== undefined && longitude !== undefined " :latitude="latitude" :longitude="longitude" />
            <view-mode-switcher v-model="viewmode" />
        </v-flex>
        <v-flex xs12>
            <v-slider label="Zoom" v-bind:min="2" v-bind:max="25" v-model="zoom" prepend-icon="zoom_out" append-icon="zoom_in"></v-slider>
        </v-flex>
        <v-flex xs12 v-if="viewmode === '2D'">
            <v-slider label="Rotation" v-bind:min="0" v-bind:max="360" v-model="rotation" thumb-label></v-slider>
        </v-flex>
        <v-flex xs12 v-if="viewmode === '3D'">
            <v-slider label="Heading" v-bind:min="0" v-bind:max="360" v-model="heading" thumb-label></v-slider>
            <v-slider label="Tilt" v-bind:min="0" v-bind:max="90" v-model="tilt" thumb-label></v-slider>
        </v-flex>
    </v-layout>
</template>
<script>
    import PositionViewer from "./PositionViewer.vue";
    import ViewModeSwitcher from "./ViewModeSwitcher.vue";
    import Bindable from "apprt-vue/mixins/Bindable";
    export default  {
        mixins: [Bindable],
        data: function () {
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