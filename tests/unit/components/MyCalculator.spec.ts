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
                    propsData: {
                        currentText: faker.random.words(),
                    }
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

            it('should update currentText with incoming meta if it is not =', () => {
                const meta = faker.random.word();
                const wrapper: any = shallowMount(MyCalculator, { localVue });

                expect(wrapper.vm.currentText).toBeFalsy();

                wrapper.vm.handleMyButtonClick(meta);

                expect(wrapper.vm.currentText).toEqual(meta);
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
                const wrapper: any = shallowMount(MyCalculator, { localVue });

                (calculator as any).mockReturnValueOnce(undefined);

                wrapper.vm.handleMyButtonClick(START_CALCULATION_META);

                expect(wrapper.vm.currentText).toEqual(ERROR_TEXT);
                expect(calculator).toBeCalled();
            });
        });
    });
});
