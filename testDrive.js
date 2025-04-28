import { Tree, removeDuplicatesAndSort, prettyPrint } from "./bst.js";

function createRandomArray() {
    const array = [];
    const minCeiled = Math.ceil(10);
    const maxFloored = Math.floor(30);
    const length = Math.floor(
        Math.random() * (maxFloored - minCeiled) + minCeiled
    );
    while (array.length < length) {
        const newNumber = Math.floor(Math.random() * 100);
        array.push(newNumber);
    }

    return removeDuplicatesAndSort(array);
}

const array = createRandomArray();
console.log(`ARRAY BEING USED = \n${array}\n`);

const tree = new Tree(array);
prettyPrint(tree.root);

if (tree.isBalanced() !== -1) {
    console.log(`TREE IS BALANCED WITH A HEIGHT OF ${tree.isBalanced()}`);
} else {
    console.log(`TREE IS NOT BALANCED!`);
}

console.log(`LEVEL ORDER PRINT OUT: `);
tree.levelOrder((node) => {
    console.log(node);
});

console.log(`PRE ORDER PRINT OUT: `);
tree.preOrder((node) => {
    console.log(node);
});
