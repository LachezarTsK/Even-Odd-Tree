
/*
 Function TreeNode is in-built in the solution file on leetcode.com. 
 When running the code on the website, do not include this function.
 */
/**
 * @param {number} val
 * @param {TreeNode} left
 * @param {TreeNode} right
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isEvenOddTree = function (root) {
    // const {Queue} = require('@datastructures-js/queue');
    const queue = new Queue();
    queue.enqueue(root);
    let currentLevel = 0;

    while (!queue.isEmpty()) {

        let numberOfNodesInCurrentLevel = queue.size();
        let valuePreviousNode = isEven(currentLevel) ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;

        while (numberOfNodesInCurrentLevel-- > 0) {

            const currentNode = queue.dequeue();
            if (currentNodeIsInvalid(currentLevel, valuePreviousNode, currentNode.val)) {
                return false;
            }
            valuePreviousNode = currentNode.val;

            if (currentNode.left !== null) {
                queue.enqueue(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.enqueue(currentNode.right);
            }
        }

        ++currentLevel;
    }
    return true;
};

/**
 * @param {number} value
 * @return {boolean}
 */
function isEven(value) {
    return value % 2 === 0;
}

/**
 * @param {number} valuePreviousNode
 * @param {number} valueCurrentNode
 * @return {boolean}
 */
function nodesAreStrictlyIncreasing(valuePreviousNode, valueCurrentNode) {
    return valuePreviousNode < valueCurrentNode;
}

/**
 * @param {number} valuePreviousNode
 * @param {number} valueCurrentNode
 * @return {boolean}
 */
function nodesAreStrictlyDecreasing(valuePreviousNode, valueCurrentNode) {
    return valuePreviousNode > valueCurrentNode;
}

/**
 * @param {number} currentLevel
 * @param {number} valuePreviousNode
 * @param {number} valueCurrentNode
 * @return {boolean}
 */
function currentNodeIsInvalid(currentLevel, valuePreviousNode, valueCurrentNode) {

    return (isEven(currentLevel) === isEven(valueCurrentNode))
            || (isEven(currentLevel) && !nodesAreStrictlyIncreasing(valuePreviousNode, valueCurrentNode))
            || (!isEven(currentLevel) && !nodesAreStrictlyDecreasing(valuePreviousNode, valueCurrentNode));
}
