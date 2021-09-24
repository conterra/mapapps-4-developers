<template>
    <div>
        <p>Lat: {{ latitude }}</p>
        <p>Lon: {{ longitude }}</p>
    </div>
</template>
<script>
    export default {
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
    };
</script>
