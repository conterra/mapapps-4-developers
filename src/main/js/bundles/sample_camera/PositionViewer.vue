<template>
    <div>
        <span>Lat: {{latitude}}</span>
        <br/>
        <span>Lon: {{longitude}}</span>
    </div>
</template>
<script>
    export default {
        props: {
            latitude: Number,
            longitude: Number
        }
    };
</script>