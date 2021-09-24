<template>
    <v-container
        fluid
        fill-height
        class="camera-widget pa-2"
    >
        <v-layout column>
            <!-- fixed widget header section -->
            <v-flex
                shrink
                class="camera-widget__header"
            >
                <position-viewer
                    v-if="latitude !== undefined && longitude !== undefined "
                    :latitude="latitude"
                    :longitude="longitude"
                />
                <view-mode-switcher v-model="viewmode" />
            </v-flex>
            <!-- scrollable widget main section -->
            <v-flex class="camera-widget__center scroll-y">
                <v-slider
                    v-model="zoom"
                    label="Zoom"
                    min="2"
                    max="25"
                    prepend-icon="zoom_out"
                    append-icon="zoom_in"
                    hide-details
                />
                <template v-if="viewmode === '2D'">
                    <v-slider
                        v-model="rotation"
                        label="Rotation"
                        min="0"
                        max="360"
                        step="0.0001"
                        thumb-label
                        hide-details
                        append-icon=" "
                        prepend-icon=" "
                    />
                </template>
                <template v-if="viewmode === '3D'">
                    <v-slider
                        v-model="heading"
                        label="Heading"
                        min="0"
                        max="360"
                        thumb-label
                        hide-details
                        append-icon=" "
                        prepend-icon=" "
                    />
                    <v-slider
                        v-model="tilt"
                        label="Tilt"
                        min="0"
                        max="90"
                        thumb-label
                        hide-details
                        append-icon=" "
                        prepend-icon=" "
                    />
                </template>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import PositionViewer from "./PositionViewer.vue";
    import ViewModeSwitcher from "./ViewModeSwitcher.vue";
    import Bindable from "apprt-vue/mixins/Bindable";

    export default {
        components: {
            'position-viewer': PositionViewer,
            'view-mode-switcher': ViewModeSwitcher
        },
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
        }
    };
</script>
