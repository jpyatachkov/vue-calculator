<template>
    <div class="MyCalculator__container">
        <div class="MyCalculator__input-row mb-20">
            <my-input
            :value="currentText"
            />

            <my-button
            text="<"
            meta="removeLast"
            event-name="remove-last"
            @remove-last="handleRemoveLast"
            />

            <my-button
            text="C"
            meta="clear"
            event-name="clear-input"
            @clear-input="handleClearInput"
            />
        </div>

        <div class="MyCalculator__buttons-container">
            <my-button
            v-for="button in buttons"
            :text="button.text"
            :meta="button.meta"
            :inversed="!!button.inversed"
            :key="button.text"
            @my-button-click="handleMyButtonClick"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import calculator from '@/helpers/calculator';
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
                { text: '+', meta: '+' },

                { text: '4', meta: '4' },
                { text: '5', meta: '5' },
                { text: '6', meta: '6' },
                { text: '-', meta: '-' },

                { text: '7', meta: '7' },
                { text: '8', meta: '8' },
                { text: '9', meta: '9' },
                { text: '×', meta: '×' },

                { text: '0', meta: '0' },
                { text: '.', meta: '.' },
                { text: '=', meta: '=', inversed: true },
                { text: '÷', meta: '÷' },
            ],
            currentText: '',
            currentTextError: false,
        }),

        methods: {
            handleClearInput() {
                this.currentText = '';
            },

            handleMyButtonClick(meta: string) {
                if (meta === '=') {
                    const result: number|undefined = calculator(this.currentText);

                    if (result === undefined) {
                        this.currentTextError = true;
                        this.currentText = 'Введено неверное выражение';
                    } else {
                        this.currentText = result.toString();
                    }
                } else {
                    if (this.currentTextError) {
                        this.currentTextError = false;
                        this.currentText = meta;
                    } else {
                        this.currentText += meta;
                    }
                }
            },

            handleRemoveLast() {
                if (!this.currentText) return;

                this.currentText = this.currentText.slice(0, this.currentText.length - 1);
            },
        },
    });
</script>

<style lang="scss" scoped>
    @import '@/assets/helpers.scss';

    .MyCalculator__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .MyCalculator__buttons-container {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .MyCalculator__error {
        color: red;
        border-color: red;

        &:focus {
            color: red;
            border-color: red;
        }
    }

    .MyCalculator__input-row {
        display: flex;
    }

    .MyCalculator__row-item--right {
        align-self: flex-end;
    }
</style>

