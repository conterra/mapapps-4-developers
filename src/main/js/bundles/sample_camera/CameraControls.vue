<template>
  <v-layout
    row
    wrap
  >
    <v-flex xs12>
      <position-viewer
        v-if="latitude !== undefined && longitude !== undefined "
        :latitude="latitude"
        :longitude="longitude"
      />
      <view-mode-switcher v-model="viewmode" />
    </v-flex>
    <v-flex xs12>
      <v-slider
        v-model="zoom"
        label="Zoom"
        min="2"
        max="25"
        prepend-icon="zoom_out"
        append-icon="zoom_in"
      />
    </v-flex>
    <v-flex
      v-if="viewmode === '2D'"
      xs12
    >
      <v-slider
        v-model="rotation"
        label="Rotation"
        min="0"
        max="360"
        step="0.0001"
        thumb-label
      />
    </v-flex>
    <v-flex
      v-if="viewmode === '3D'"
      xs12
    >
      <v-slider
        v-model="heading"
        label="Heading"
        min="0"
        max="360"
        thumb-label
      />
      <v-slider
        v-model="tilt"
        label="Tilt"
        min="0"
        max="90"
        thumb-label
      />
    </v-flex>
  </v-layout>
</template>
<script>
    import PositionViewer from "./PositionViewer.vue";
    import ViewModeSwitcher from "./ViewModeSwitcher.vue";
    import Bindable from "apprt-vue/mixins/Bindable";
    export default  {
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
