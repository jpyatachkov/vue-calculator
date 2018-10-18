<template>
    <input
    class="Field align-text-right"
    :value="text"
    readonly
    />
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'MyInput',

        props: {
            text: {
                type: String,
            },
        },
    });
</script>

<style lang="scss" scoped>
    @import '@/assets/helpers.scss';
    @import '@/assets/main.scss';
    @import '@/assets/mixins.scss';

    .Field {
        @include border-radius-1px;

        background-color: white;
        color: $primary-color;

        height: 40px;
        padding: 0;
        margin: 5px;

        font-size: 1.1rem;
    }
</style>
