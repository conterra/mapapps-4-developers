<template>
    <v-layout>
        <v-radio-group v-model="selected" :mandatory="false">
            <v-radio label="2D" value="2D"></v-radio>
            <v-radio label="3D" value="3D"></v-radio>
        </v-radio-group>
    </v-layout>
</template>
<script>
    export default {
        props: {
            // external property is named "value" so v-model can be used
            value: String
        },
        data: function () {
            // radio v-model uses "selected" state
            return {
                selected: this.value
            };
        },
        watch: {
            selected: function (newVal) {
                // on selected state we trigger in input event to match v-model component specification
                this.$emit("input", newVal);
            }
        }
    };
</script>