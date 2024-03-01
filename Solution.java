
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    public boolean isEvenOddTree(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        int currentLevel = 0;

        while (!queue.isEmpty()) {

            int numberOfNodesInCurrentLevel = queue.size();
            int valuePreviousNode = isEven(currentLevel) ? Integer.MIN_VALUE : Integer.MAX_VALUE;

            while (numberOfNodesInCurrentLevel-- > 0) {

                TreeNode currentNode = queue.poll();
                if (currentNodeIsInvalid(currentLevel, valuePreviousNode, currentNode.val)) {
                    return false;
                }
                valuePreviousNode = currentNode.val;

                if (currentNode.left != null) {
                    queue.add(currentNode.left);
                }
                if (currentNode.right != null) {
                    queue.add(currentNode.right);
                }
            }

            ++currentLevel;
        }
        return true;
    }

    private boolean isEven(int value) {
        return value % 2 == 0;
    }

    private boolean nodesAreStrictlyIncreasing(int valuePreviousNode, int valueCurrentNode) {
        return valuePreviousNode < valueCurrentNode;
    }

    private boolean nodesAreStrictlyDecreasing(int valuePreviousNode, int valueCurrentNode) {
        return valuePreviousNode > valueCurrentNode;
    }

    private boolean currentNodeIsInvalid(int currentLevel, int valuePreviousNode, int valueCurrentNode) {

        return (isEven(currentLevel) == isEven(valueCurrentNode))
                || (isEven(currentLevel) && !nodesAreStrictlyIncreasing(valuePreviousNode, valueCurrentNode))
                || (!isEven(currentLevel) && !nodesAreStrictlyDecreasing(valuePreviousNode, valueCurrentNode));
    }
}

/*
Class TreeNode is in-built in the solution file on leetcode.com. 
When running the code on the website, do not include this class.
 */
class TreeNode {

    int val;
    TreeNode left;
    TreeNode right;

    TreeNode() {
    }

    TreeNode(int val) {
        this.val = val;
    }

    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
