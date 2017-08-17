<template>
    <div>
        <span><input type="radio" value="2D" v-model="selected" />2D</span>
        <br/>
        <span><input type="radio" value="3D" v-model="selected" />3D</span>
    </div>
</template>
<script>
    export default {
        props: {
            // external property is named "value" so v-model can be used
            value: String
        },
        data: function() {
            // radio v-model uses "selected" state
            return {
                selected: this.value
            };
        },
        watch: {
            selected: function(newVal) {
                // on selected state we trigger in input event to match v-model component specification
                this.$emit("input", newVal);
            }
        }
    };
</script>