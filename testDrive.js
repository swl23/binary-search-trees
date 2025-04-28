import { Tree, removeDuplicatesAndSort } from "./bst.js";

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

const test = createRandomArray();
console.log(test);
