export function generateFibTree(n) {
    const memo = new Map();

    const buildTree = (val) => {
        if (memo.has(val)) {
            return memo.get(val);
        }

        let node;

        if (val <= 1) {
            node = {
                name: `fib(${val}) = ${val}`,
                value: val,
            };
        } else {
            const left = buildTree(val - 1);
            const right = buildTree(val - 2);
            const value = left.value + right.value;
            node = {
                name: `fib(${val}) = ${value}`,
                value: value,
                children: [left, right],
            };
        }

        memo.set(val, node);
        return node;
    };

    return buildTree(n);
}
