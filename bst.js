export const prettyPrint = (node, prefix = "", isLeft = true) => {
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

export class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }

    insert(value) {
        function compare(node, value) {
            if (value < node.data) {
                if (node.left === null) {
                    node.left = new Node(value);
                } else {
                    compare(node.left, value);
                }
            } else {
                if (node.right === null) {
                    node.right = new Node(value);
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
                if (value < parentNode.data) {
                    parentNode.left = null;
                } else if (value > parentNode.data) {
                    parentNode.right = null;
                }
                return;
            }

            // one child
            if ((left && right === null) || (left === null && right)) {
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
            if (left && right) {
                function getNextLargestNode(node, parent) {
                    if (!node.left) {
                        return { node, parent };
                    } else {
                        return getNextLargestNode(node.left, node);
                    }
                }
                const nextLargest = getNextLargestNode(root.right, root);
                if (nextLargest.parent === root) {
                    root.right = nextLargest.node.right;
                } else {
                    nextLargest.parent.left = nextLargest.node.right;
                }
                root.data = nextLargest.node.data;
                return;
            }
        }
    }

    find(value, root = this.root) {
        if (root === null) {
            console.log("Not found");
            return;
        }
        if (value < root.data) {
            if (!root.left) {
                console.log("Not found");
                return;
            } else {
                return this.find(value, root.left);
            }
        } else if (value > root.data) {
            if (!root.right) {
                console.log("Not found");
                return;
            } else {
                return this.find(value, root.right);
            }
        } else {
            return root;
        }
    }

    levelOrder(callback) {
        function trace(node) {
            if (node === null) {
                console.log("No node found.");
                return;
            } else {
                const queue = [];
                queue.push(node);
                while (queue.length > 0) {
                    const current = queue[0];
                    callback(current.data);
                    if (current.left) {
                        queue.push(current.left);
                    }
                    if (current.right) {
                        queue.push(current.right);
                    }
                    queue.shift();
                }
            }
        }
        trace(this.root);
    }

    preOrder(callback) {
        function visitPre(node) {
            if (!node) {
                return;
            } else {
                callback(node.data);
                visitPre(node.left);
                visitPre(node.right);
            }
        }
        return visitPre(this.root);
    }

    inOrder(callback) {
        function visitOrd(node) {
            if (!node) {
                return;
            } else {
                visitOrd(node.left);
                callback(node.data);
                visitOrd(node.right);
            }
        }
        return visitOrd(this.root);
    }

    postOrder(callback) {
        function visitPost(node) {
            if (!node) {
                return;
            } else {
                visitPost(node.left);
                visitPost(node.right);
                callback(node.data);
            }
        }
        return visitPost(this.root);
    }

    height(value) {
        const targetNode = this.find(value);
        if (!targetNode) {
            console.log("Value not found.");
            return null;
        } else {
            function findHeight(node) {
                if (node === null) {
                    return -1;
                } else {
                    const leftHeight = findHeight(node.left);
                    const rightHeight = findHeight(node.right);
                    const bigger =
                        (leftHeight >= rightHeight ? leftHeight : rightHeight) +
                        1;
                    return bigger;
                }
            }
            return findHeight(targetNode);
        }
    }

    depth(value) {
        const targetNode = this.find(value);
        if (!targetNode) {
            console.log("Value not found.");
            return null;
        } else {
            let depth = 0;
            function travel(node) {
                if (node === null) {
                    return;
                } else {
                    if (targetNode.data > node.data) {
                        depth += 1;
                        return travel(node.right);
                    } else if (targetNode.data < node.data) {
                        depth += 1;
                        return travel(node.left);
                    } else {
                        return depth;
                    }
                }
            }
            return travel(this.root);
        }
    }

    isBalanced() {
        function checkBalance(node) {
            if (node === null) {
                return 0;
            }
            let leftHeight = checkBalance(node.left);
            let rightHeight = checkBalance(node.right);
            if (
                leftHeight === -1 ||
                rightHeight === -1 ||
                Math.abs(leftHeight - rightHeight) > 1
            ) {
                return -1;
            }
            return Math.max(leftHeight, rightHeight) + 1;
        }

        return checkBalance(this.root) > 0;
    }

    rebalance() {
        const values = [];
        this.levelOrder(function (item) {
            values.push(item);
        });
        values.sort((a, b) => {
            return a - b;
        });
        this.root = buildTree(values);
    }
}

export function buildTree(array) {
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

export function removeDuplicatesAndSort(array) {
    const unique = array.filter((item, index) => array.indexOf(item) === index);
    unique.sort((a, b) => {
        return a - b;
    });
    return unique;
}
