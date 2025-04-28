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

function getArrayToUnbalanceTree() {
    function getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }
    const array = [];
    const length = Math.random() * (10 - 2) + 2;
    while (array.length < length) {
        const newNumber = getRandomInt(101, 7000);
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

console.log(`\n***LEVEL*** ORDER PRINT OUT: `);
tree.levelOrder((node) => {
    console.log(node);
});

console.log(`\n***PRE*** ORDER PRINT OUT: `);
tree.preOrder((node) => {
    console.log(node);
});

console.log(`\n***IN*** ORDER PRINT OUT: `);
tree.inOrder((node) => {
    console.log(node);
});

console.log(`\n***POST*** ORDER PRINT OUT: `);
tree.postOrder((node) => {
    console.log(node);
});

const disruptor = getArrayToUnbalanceTree();
disruptor.forEach((value) => tree.insert(value));
prettyPrint(tree.root);

if (tree.isBalanced()) {
    console.log(`TREE IS BALANCED`);
} else {
    console.log(`TREE IS NOT BALANCED!`);
}
