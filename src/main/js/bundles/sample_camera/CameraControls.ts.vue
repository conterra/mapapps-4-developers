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
<script lang="ts">
    import Vue from "apprt-vue/Vue";
    import PositionViewer from "./PositionViewer.ts.vue";
    import ViewModeSwitcher from "./ViewModeSwitcher.ts.vue";
    import Bindable from "apprt-vue/mixins/Bindable";

    export default Vue.extend({
        components: {
            'position-viewer': PositionViewer,
            'view-mode-switcher': ViewModeSwitcher
        },
        mixins: [Bindable],
        data: function () {
            return {
                latitude: undefined as number | undefined,
                longitude: undefined as number | undefined,
                rotation: undefined as number | undefined,
                zoom: undefined as number | undefined,
                heading: undefined as string | undefined,
                tilt: undefined as number | undefined,
                viewmode: undefined as string | undefined
            };
        }


    });
</script>
