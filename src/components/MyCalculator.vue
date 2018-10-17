<template>
    <div class="MyCalculator__container">
        <my-input :text.sync="currentText" />

        <div class="MyCalculator__buttons-container">
            <my-button
            v-for="button in buttons"
            :text="button.text"
            :meta="button.meta"
            :key="button.text"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import MyButton from '@/components/MyButton.vue';
    import MyInput from '@/components/MyInput.vue';

    export default Vue.extend({
        name: 'MyCalculator',

        components: {
            MyButton,
            MyInput,
        },

        data: () => ({
            buttons: [
                { text: '1', meta: '1' },
                { text: '2', meta: '2' },
                { text: '3', meta: '3' },
                { text: '4', meta: '4' },
                { text: '5', meta: '5' },
                { text: '6', meta: '6' },
                { text: '7', meta: '7' },
                { text: '8', meta: '8' },
                { text: '9', meta: '9' },
                { text: '0', meta: '0' },
                { text: '.', meta: '.' },
                { text: '=', meta: '=' },
            ],
            currentText: '',
        }),

        methods: {
            handleMyButtonClick(evt: any) {
                console.log(evt);
            }
        },

        mounted() {
            this.$on('my-button-click', this.handleMyButtonClick);
        }
    });
</script>

<style lang="scss" scoped>
    .MyCalculator__container {
        display: grid;
        grid-template-rows: 200px 1fr;
    }

    .MyCalculator__buttons-container {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>

