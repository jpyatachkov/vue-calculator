<template>
    <input
    class="Field"
    :pattern="pattern"
    :value="text"
    />
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'MyInput',

        props: {
            pattern: {
                type: String,
                default: '[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?',
            },
            text: {
                type: String,
                required: true,
            },
        },
    });
</script>

<style lang="scss" scoped>
    @import '@/assets/main.scss';
    @import '@/assets/mixins.scss';

    .Field {
        @include border-radius-1px;

        background-color: white;
        color: $primary-color;

        height: 50px;

        font-size: 1.1rem;
    }
</style>
