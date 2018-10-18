import { createLocalVue, shallowMount } from '@vue/test-utils';

import MyButton from '@/components/MyButton.vue';
import faker from 'faker';

const localVue = createLocalVue();

describe('MyButton', () => {
    describe('component', () => {
        let meta: string;
        let text: string;

        beforeEach(() => {
            meta = faker.random.uuid();
            text = faker.random.uuid();
        });

        it('should call handleClick if component was clicked', async () => {
            const handleClick = jest.fn();
            const wrapper: any = shallowMount(MyButton, {
                propsData: {
                    meta,
                    text,
                },
                methods: {
                    handleClick,
                },
            });

            wrapper.find('[data-jest="element-to-click"]').trigger('click');

            expect(handleClick).toBeCalled();
        });
    });

    describe('methods', () => {
        describe('handleClick', () => {
            let meta: string;
            let text: string;

            beforeEach(() => {
                meta = faker.random.uuid();
                text = faker.random.uuid();
            });

            it('should emit default event if no eventName provided', () => {
                const wrapper: any = shallowMount(MyButton, {
                    localVue,
                    propsData: {
                        meta,
                        text,
                    },
                });

                wrapper.vm.handleClick();

                const emitted = wrapper.emitted()[wrapper.vm.eventName];
                expect(emitted).toBeTruthy();
                expect(emitted[0]).toEqual([meta]);
            });

            it('should emit eventName if it is provided', () => {
                const eventName = faker.random.uuid();
                const wrapper: any = shallowMount(MyButton, {
                    localVue,
                    propsData: {
                        eventName,
                        meta,
                        text,
                    },
                });

                wrapper.vm.handleClick();

                const emitted = wrapper.emitted()[eventName];
                expect(emitted).toBeTruthy();
                expect(emitted[0]).toEqual([meta]);
            });
        });
    });
});
