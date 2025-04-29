import {
    Tree,
    removeDuplicatesAndSort,
    prettyPrint,
    buildTree,
} from "./bst.js";

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

// Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
const array = createRandomArray();
console.log(`ARRAY BEING USED = \n${array}\n`);

const tree = new Tree(array);
prettyPrint(tree.root);

// Confirm that the tree is balanced by calling isBalanced.
if (tree.isBalanced()) {
    console.log(`TREE IS BALANCED`);
} else {
    console.log(`TREE IS NOT BALANCED!`);
}

// Print out all elements in level, pre, post, and in order.
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

// Unbalance the tree by adding several numbers > 100.
const disruptor = getArrayToUnbalanceTree();
disruptor.forEach((value) => tree.insert(value));
prettyPrint(tree.root);

// Confirm that the tree is unbalanced by calling isBalanced.
if (tree.isBalanced()) {
    console.log(`TREE IS BALANCED`);
} else {
    console.log(`TREE IS NOT BALANCED!\nRebalancing...`);
}

// Balance the tree by calling rebalance.
tree.rebalance();
prettyPrint(tree.root);

// Confirm that the tree is balanced by calling isBalanced.
if (tree.isBalanced()) {
    console.log(`THERE! Now it's balanced.`);
} else {
    console.log(`TREE IS STILL NOT BALANCED!?!`);
}

// Print out all elements in level, pre, post, and in order.
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
