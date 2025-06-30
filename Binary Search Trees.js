// Node class
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Tree class
class Tree {
    constructor(array) {
        this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
    }

    buildTree(array) {
        if (array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));

        return root;
    }

    insert(value, node = this.root) {
        if (!node) return new Node(value);
        if (value < node.data) node.left = this.insert(value, node.left);
        else if (value > node.data) node.right = this.insert(value, node.right);
        return node;
    }

    deleteItem(value, node = this.root) {
        if (!node) return null;

        if (value < node.data) node.left = this.deleteItem(value, node.left);
        else if (value > node.data)
            node.right = this.deleteItem(value, node.right);
        else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            let temp = node.right;
            while (temp.left) temp = temp.left;
            node.data = temp.data;
            node.right = this.deleteItem(temp.data, node.right);
        }
        return node;
    }

    find(value, node = this.root) {
        if (!node || node.data === value) return node;
        if (value < node.data) return this.find(value, node.left);
        return this.find(value, node.right);
    }

    levelOrder(callback) {
        if (!callback) throw new Error("Callback is required.");
        const queue = [this.root];
        while (queue.length) {
            const node = queue.shift();
            callback(node);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    inOrder(callback, node = this.root) {
        if (!callback) throw new Error("Callback is required.");
        if (node) {
            this.inOrder(callback, node.left);
            callback(node);
            this.inOrder(callback, node.right);
        }
    }

    preOrder(callback, node = this.root) {
        if (!callback) throw new Error("Callback is required.");
        if (node) {
            callback(node);
            this.preOrder(callback, node.left);
            this.preOrder(callback, node.right);
        }
    }

    postOrder(callback, node = this.root) {
        if (!callback) throw new Error("Callback is required.");
        if (node) {
            this.postOrder(callback, node.left);
            this.postOrder(callback, node.right);
            callback(node);
        }
    }

    height(node = this.root) {
        if (!node) return -1;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    depth(value, node = this.root, currentDepth = 0) {
        if (!node) return null;
        if (node.data === value) return currentDepth;
        if (value < node.data)
            return this.depth(value, node.left, currentDepth + 1);
        return this.depth(value, node.right, currentDepth + 1);
    }

    isBalanced(node = this.root) {
        if (!node) return true;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        if (Math.abs(leftHeight - rightHeight) > 1) return false;
        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance() {
        const values = [];
        this.inOrder((node) => values.push(node.data));
        this.root = this.buildTree(values);
    }
}

// prettyPrint function
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) return;
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// ========== DRIVER SCRIPT ==========

const randomArray = Array.from({ length: 15 }, () =>
    Math.floor(Math.random() * 100)
);
const tree = new Tree(randomArray);

console.log("Initial Tree:");
prettyPrint(tree.root);
console.log("Balanced:", tree.isBalanced());

console.log("Level Order:");
tree.levelOrder((node) => console.log(node.data));
console.log("Pre Order:");
tree.preOrder((node) => console.log(node.data));
console.log("In Order:");
tree.inOrder((node) => console.log(node.data));
console.log("Post Order:");
tree.postOrder((node) => console.log(node.data));

// Unbalancing the tree
tree.insert(120);
tree.insert(130);
tree.insert(140);
tree.insert(150);
tree.insert(160);

console.log("\nUnbalanced Tree:");
prettyPrint(tree.root);
console.log("Balanced:", tree.isBalanced());

// Rebalancing the tree
tree.rebalance();
console.log("\nRebalanced Tree:");
prettyPrint(tree.root);
console.log("Balanced:", tree.isBalanced());

console.log("Level Order:");
tree.levelOrder((node) => console.log(node.data));
console.log("Pre Order:");
tree.preOrder((node) => console.log(node.data));
console.log("In Order:");
tree.inOrder((node) => console.log(node.data));
console.log("Post Order:");
tree.postOrder((node) => console.log(node.data));
