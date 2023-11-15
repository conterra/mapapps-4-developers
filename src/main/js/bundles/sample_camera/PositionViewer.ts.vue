<template>
    <div>
        <p>Lat: {{ latitude }}</p>
        <p>Lon: {{ longitude }}</p>
    </div>
</template>
<script lang="ts">
    import Vue from "apprt-vue/Vue";
    export default Vue.extend({
        props: {
            latitude: {
                type: Number,
                default: 0
            },
            longitude: {
                type: Number,
                default: 0
            }
        }
    });
</script>
