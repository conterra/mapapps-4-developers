<template>
    <v-layout row wrap>
        <v-flex xs12 class="mb-1">
            <span>Lat: {{latitude}}</span>
        </v-flex>
        <v-flex xs12>
            <span>Lon: {{longitude}}</span>
        </v-flex>
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