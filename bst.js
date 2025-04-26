const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }

    insert(value) {
        function compare(node, value) {
            if (value < node.data) {
                if (node.left === null) {
                    node.left = new Node(value);
                    console.log("Went left");
                } else {
                    compare(node.left, value);
                }
            } else {
                if (node.right === null) {
                    node.right = new Node(value);
                    console.log("Went right");
                } else {
                    compare(node.right, value);
                }
            }
        }
        compare(this.root, value);
    }

    deleteItem(value, root = this.root, parentNode = null) {
        if (root === null) {
            console.log("Not found");
            return;
        }
        if (value < root.data) {
            this.deleteItem(value, root.left, root);
        } else if (value > root.data) {
            this.deleteItem(value, root.right, root);
        } else {
            const left = root.left;
            const right = root.right;
            // leaf node
            if (left === null && right === null) {
                console.log("Leaf node");
                if (value < parentNode.data) {
                    parentNode.left = null;
                } else if (value > parentNode.data) {
                    parentNode.right = null;
                }
                return;
            }

            // one child
            if ((left && right === null) || (left === null && right)) {
                console.log("One child");
                if (value < parentNode.data) {
                    if (left) {
                        parentNode.left = left;
                    } else {
                        parentNode.left = right;
                    }
                } else if (value > parentNode.data) {
                    if (left) {
                        parentNode.right = left;
                    } else {
                        parentNode.right = right;
                    }
                }
                return;
            }

            // two children
            console.log("Two children");
            if (left && right) {
                function getNextLargestNode(node, parent) {
                    if (!node.left) {
                        console.log(node, parent);
                        return { node, parent };
                    } else {
                        getNextLargestNode(node.left, node);
                    }
                }
                const nextLargest = getNextLargestNode(root.right, root);
                console.log(nextLargest);
                const oldRootCopy = root;
                root = nextLargest.node;
                root.left = oldRootCopy.left;
                if (!parentNode) {
                    return;
                } else if (oldRootCopy.data < parentNode.data) {
                    parentNode.left = root;
                } else {
                    parentNode.right = root;
                }
                return;
            }
        }
    }
}

function buildTree(array) {
    const startIndex = 0;
    const endIndex = array.length - 1;
    const midIndex = Math.floor((endIndex - startIndex) / 2);
    if (startIndex > endIndex) {
        return null;
    } else {
        const root = new Node(array[midIndex]);
        root.left = buildTree(array.slice(startIndex, midIndex));
        root.right = buildTree(array.slice(midIndex + 1, endIndex + 1));
        return root;
    }
}

const test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const unique = test.filter((item, index) => test.indexOf(item) === index);
unique.sort((a, b) => {
    return a - b;
});
console.log(unique);

const example = new Tree(unique);
prettyPrint(example.root);
/* example.deleteItem(4);
prettyPrint(example.root);
example.deleteItem(67);
prettyPrint(example.root); */
example.deleteItem(8);
prettyPrint(example.root);
