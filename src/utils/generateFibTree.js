export function generateFibTree(n) {
    const memo = new Map();

    const buildTree = (val) => {
        if (memo.has(val)) {
            return memo.get(val);
        }

        const node = val <= 1
            ? { name: `fib(${val})` }
            : {
                name: `fib(${val})`,
                children: [buildTree(val - 1), buildTree(val - 2)],
            };

        memo.set(val, node);
        return node;
    };

    return buildTree(n);
}
