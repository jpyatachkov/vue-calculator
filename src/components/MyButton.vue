<template>
    <div
    :class="styles"
    data-jest="element-to-click"
    @click="handleClick"
    >
        <p>{{ text }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'MyButton',

    computed: {
        styles(): object {
            return{
                'MyButton__container': !this.inversed,
                'MyButton__container--inversed': this.inversed,
                'ripple': true,
            };
        },
    },

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
        inversed: {
            type: Boolean,
            default: false,
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
    @import '@/assets/ripple.scss';

    %container {
        @include border-radius-1px;

        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;

        width: 40px;
        height: 40px;
        margin: 5px;
    }

    .MyButton__container {
        @extend %container;

        background-color: white;
        color: $primary-color;

        &:hover {
            background-color: $primary-color;
            color: white;
        }
    }

    .MyButton__container--inversed {
        @extend %container;

        background-color: $primary-color;
        color: white;

        &:hover {
            background-color: darken($color: $primary-color, $amount: 5%);
        }
    }
</style>
