import calculator from '@/helpers/calculator';
import faker from 'faker';
import infixToPostfix from 'infix-to-postfix';

jest.mock('infix-to-postfix');

describe('calculator', () => {
    it('should call infixToPostfix and return undefined if infixToPostfix returns null', () => {
        (infixToPostfix as any).mockReturnValueOnce(null);

        expect(calculator(faker.random.words())).toBeUndefined();
        expect(infixToPostfix).toBeCalled();
    });

    describe.each([
        ['1', 1],
        ['+1', 1],
        ['-1', -1],

        ['0 0 +', 0],
        ['0 0 -', 0],
        ['0 0 *', 0],
        ['0 0 /', NaN],

        ['1 2 +', 3],
        ['1 -2 +', -1],
        ['1.5 1.75 +', 3.25],
        ['1 2 3 + +', 6],

        ['2 1 -', 1],
        ['1 2 -', -1],
        ['1 -2 -', 3],
        ['3 2 - 1 -', 0],

        ['5 5 *', 25],
        ['5 -1 *', -5],
        ['5 5 * 5 *', 125],

        ['100 2 /', 50],
        ['100 -2 /', -50],
        ['1 0 /', Infinity],
        ['0 10 /', 0],
        ['100 2 / 2 /', 25],
    ])('correct expression: %o expected result: %o', (expression, result) => {
        it('should correctly evaluate correct expressions', () => {
            (infixToPostfix as any).mockReturnValueOnce(expression);
            expect(calculator(faker.random.words())).toEqual(result);
        });
    });

    it('should correctly evaluate long expression with different operation types', () => {
        const longExpression = '100500 74 + 15 * 21 7 * + 15 78 99 + / 150 * - 19 10 - 15 0 * + 7.574228 * /';
        (infixToPostfix as any).mockReturnValueOnce(longExpression);
        expect(calculator(faker.random.words())).toBeCloseTo(22132.718243666, 8);
    });

    describe.each([
        'dnkgn',
        '* 29',
        '/ 29',
        '29 +',
        '29 -',
        '29 *',
        '29 /',
    ])('incorrect expression: %o', (expression) => {
        it('should return undefined on each incorrect expression', () => {
            (infixToPostfix as any).mockReturnValueOnce(expression);
            expect(calculator(faker.random.words())).toBeUndefined();
        });
    });
});
