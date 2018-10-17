<template>
    <div id="MyButon__container" data-jest="element-to-click" @click="handleClick">
        <p>{{ text }}</p>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'MyButton',
        
        methods: {
            handleClick() {
                this.$emit(this.eventName, this.meta);
            },
        },

        props: {
            eventName: {
                type: String,
                default: 'my-button-click',
            },
            meta: {
                type: String,
                required: true,
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

    .MyButton__container {
        @include border-radius-1px;

        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        color: $primary-color;

        width: 40px;
        height: 40px;
        margin: 5px;

        &:hover {
            background-color: $primary-color;
            color: white;
        }
    }
</style>
