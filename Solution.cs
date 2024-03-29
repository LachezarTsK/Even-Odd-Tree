
using System;
using System.Collections.Generic;

public class Solution
{
    public bool IsEvenOddTree(TreeNode root)
    {
        Queue<TreeNode> queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        int currentLevel = 0;

        while (queue.Count > 0)
        {

            int numberOfNodesInCurrentLevel = queue.Count;
            int valuePreviousNode = IsEven(currentLevel) ? int.MinValue : int.MaxValue;

            while (numberOfNodesInCurrentLevel-- > 0)
            {

                TreeNode currentNode = queue.Dequeue();
                if (CurrentNodeIsInvalid(currentLevel, valuePreviousNode, currentNode.val))
                {
                    return false;
                }
                valuePreviousNode = currentNode.val;

                if (currentNode.left != null)
                {
                    queue.Enqueue(currentNode.left);
                }
                if (currentNode.right != null)
                {
                    queue.Enqueue(currentNode.right);
                }
            }

            ++currentLevel;
        }
        return true;
    }

    private bool IsEven(int value)
    {
        return value % 2 == 0;
    }

    private bool NodesAreStrictlyIncreasing(int valuePreviousNode, int valueCurrentNode)
    {
        return valuePreviousNode < valueCurrentNode;
    }

    private bool NodesAreStrictlyDecreasing(int valuePreviousNode, int valueCurrentNode)
    {
        return valuePreviousNode > valueCurrentNode;
    }

    private bool CurrentNodeIsInvalid(int currentLevel, int valuePreviousNode, int valueCurrentNode)
    {

        return (IsEven(currentLevel) == IsEven(valueCurrentNode))
                || (IsEven(currentLevel) && !NodesAreStrictlyIncreasing(valuePreviousNode, valueCurrentNode))
                || (!IsEven(currentLevel) && !NodesAreStrictlyDecreasing(valuePreviousNode, valueCurrentNode));
    }
}

/*
Class TreeNode is in-built in the solution file on leetcode.com. 
When running the code on the website, do not include this class.
 */
public class TreeNode
{
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int val = 0, TreeNode left = null, TreeNode right = null)
    {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
