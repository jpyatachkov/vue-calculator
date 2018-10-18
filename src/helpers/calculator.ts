import infixToPostfix from 'infix-to-postfix';

interface IOperatorMap {
    [index: string]: (x: number, y: number) => number,
};

const operators: IOperatorMap = {
    '+': (x: number, y: number): number => x + y,
    '-': (x: number, y:number): number => x - y,
    '*': (x: number, y: number): number => x * y,
    '/': (x: number, y: number): number => x / y,
    '×': (x: number, y: number): number => x * y,
    '÷': (x: number, y: number): number => x / y,
};

export default function (rawString: string): number|undefined {
    const postfix: string|null = infixToPostfix(rawString);

    if (!postfix) {
        return;
    }

    const stack: Array<number> = [];
    const tokens: Array<string> = postfix.split(' ');

    for (let i = 0; i < tokens.length; i++) {
        const token: string = tokens[i];

        if (token in operators) {
            const [y, x] = [stack.pop(), stack.pop()];

            if (x === undefined || y === undefined) return;

            stack.push(operators[token](x, y));
        } else {
            const operand = parseFloat(token);

            if (isNaN(operand)) return;

            stack.push(operand);
        }
    }

    return stack.pop();
};
