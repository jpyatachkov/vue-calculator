import { createLocalVue, shallowMount } from '@vue/test-utils';

import MyCalculator from '@/components/MyCalculator.vue';
import calculator from '@/helpers/calculator';
import faker from 'faker';

jest.mock('@/helpers/calculator');

const localVue = createLocalVue();

describe('MyCalculator', () => {
    describe('methods', () => {
        describe('handleClearInput', () => {
            it('should clear currentText field', () => {
                const wrapper: any = shallowMount(MyCalculator, {
                    localVue,
                    data: () => ({
                        currentText: faker.random.words(),
                    }),
                });

                wrapper.vm.handleClearInput();

                expect(wrapper.vm.currentText).toBeFalsy();
            });
        });

        describe('handleMyButtonClick', () => {
            const ERROR_TEXT = 'Введено неверное выражение';
            const START_CALCULATION_META = '=';

            afterEach(() => {
                (calculator as any).mockClear();
            });

            it(`should append to currentText incoming meta
            if meta is not = and currentTextError is false`, () => {
                const currentText = faker.random.word();
                const meta = faker.random.word();
                const wrapper: any = shallowMount(MyCalculator, {
                    localVue,
                    data: () => ({
                        currentText,
                        currentTextError: false,
                    }),
                });

                wrapper.vm.handleMyButtonClick(meta);

                expect(wrapper.vm.currentText).toEqual(`${currentText}${meta}`);
            });

            it(`should change currentText to incoming meta and currentTextError to false
            if meta is not = and currentTextError is true`, () => {
                const currentText = faker.random.word();
                const meta = faker.random.word();
                const wrapper: any = shallowMount(MyCalculator, {
                    localVue,
                    data: () => ({
                        currentText,
                        currentTextError: true,
                    }),
                });

                wrapper.vm.handleMyButtonClick(meta);

                expect(wrapper.vm.currentText).toEqual(meta);
                expect(wrapper.vm.currentTextError).toBeFalsy();
            });

            it(`should call calculator function and change currentText
            to received result if meta is ${START_CALCULATION_META}`, () => {
                const result = 228;
                const wrapper: any = shallowMount(MyCalculator, { localVue });

                (calculator as any).mockReturnValueOnce(result);

                expect(wrapper.vm.currentText).not.toEqual(result.toString());

                wrapper.vm.handleMyButtonClick(START_CALCULATION_META);

                expect(wrapper.vm.currentText).toEqual(result.toString());
                expect(calculator).toBeCalled();
            });

            it(`should call calculator function and change currentText
            to error text if result is undefined and meta is ${START_CALCULATION_META}`, () => {
                const wrapper: any = shallowMount(MyCalculator, {
                    localVue,
                    data: () => ({
                        currentTextError: false,
                    }),
                });

                (calculator as any).mockReturnValueOnce(undefined);

                wrapper.vm.handleMyButtonClick(START_CALCULATION_META);

                expect(wrapper.vm.currentText).toEqual(ERROR_TEXT);
                expect(wrapper.vm.currentTextError).toBeTruthy();
                expect(calculator).toBeCalled();
            });
        });

        describe('handleRemoveLast', () => {
            it('should return is currentText is empty', () => {
                const wrapper: any = shallowMount(MyCalculator, {
                    localVue,
                    data: () => ({
                        currentText: '',
                    }),
                });

                wrapper.vm.handleRemoveLast();

                expect(wrapper.vm.currentText).toBeFalsy();
            });

            it('should remove last char from string', () => {
                const currentText = faker.random.word();
                const wrapper: any = shallowMount(MyCalculator, {
                    localVue,
                    data: () => ({
                        currentText,
                    }),
                });

                wrapper.vm.handleRemoveLast();

                expect(wrapper.vm.currentText).toEqual(currentText.slice(0, currentText.length - 1));
            });
        });
    });
});
