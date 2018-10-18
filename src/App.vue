<template>
    <div class="App__container">
        <my-calculator />
    </div>
</template>

<script lang="ts">
import MyCalculator from '@/components/MyCalculator.vue';
import Vue from 'vue';

export default Vue.extend({
    name: 'App',

    components: {
        MyCalculator,
    },
});
</script>

<style lang="scss">
    html, body {
        height: 100%;
        min-height: 100%;
    }

    body {
        font-family: 'Roboto-Slab', sans-serif;
    }

    #app {
        height: 100%;
        width: 100%;
    }

    .App__container {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
