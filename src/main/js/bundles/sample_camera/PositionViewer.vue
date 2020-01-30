<template>
    <v-layout column>
        <p>Lat: {{ latitude }}</p>
        <p>Lon: {{ longitude }}</p>
    </v-layout>
</template>
<script>
    export default {
        props: {
            latitude: Number,
            longitude: Number
        }
    };
</script>
