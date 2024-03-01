
#include <queue>
#include <limits>
using namespace std;

/*
Struct TreeNode is in-built in the solution file on leetcode.com. 
When running the code on the website, do not include this struct.
 */
struct TreeNode {
	int val;
	TreeNode* left;
	TreeNode* right;

	TreeNode() : val(0), left(nullptr), right(nullptr) {}
	TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
	TreeNode(int x, TreeNode* left, TreeNode* right) : val(x), left(left), right(right) {}
};

class Solution {

public:
    bool isEvenOddTree(TreeNode* root) const {
        queue<TreeNode*> queue;
        queue.push(root);
        int currentLevel = 0;

        while (!queue.empty()) {

            int numberOfNodesInCurrentLevel = queue.size();

            // alternatively: isEven(currentLevel) ? INT_MIN : INT_MAX;
            int valuePreviousNode = isEven(currentLevel)
                                    ? numeric_limits<int>::min()
                                    : numeric_limits<int>::max();

            while (numberOfNodesInCurrentLevel-- > 0) {

                TreeNode* currentNode = queue.front();
                queue.pop();
                if (currentNodeIsInvalid(currentLevel, valuePreviousNode, currentNode->val)) {
                    return false;
                }
                valuePreviousNode = currentNode->val;

                if (currentNode->left != nullptr) {
                    queue.push(currentNode->left);
                }
                if (currentNode->right != nullptr) {
                    queue.push(currentNode->right);
                }
            }

            ++currentLevel;
        }
        return true;
    }

private:
    bool isEven(int value) const {
        return value % 2 == 0;
    }

    bool nodesAreStrictlyIncreasing(int valuePreviousNode, int valueCurrentNode) const {
        return valuePreviousNode < valueCurrentNode;
    }

    bool nodesAreStrictlyDecreasing(int valuePreviousNode, int valueCurrentNode) const {
        return valuePreviousNode > valueCurrentNode;
    }

    bool currentNodeIsInvalid(int currentLevel, int valuePreviousNode, int valueCurrentNode) const {

        return (isEven(currentLevel) == isEven(valueCurrentNode))
                || (isEven(currentLevel) && !nodesAreStrictlyIncreasing(valuePreviousNode, valueCurrentNode))
                || (!isEven(currentLevel) && !nodesAreStrictlyDecreasing(valuePreviousNode, valueCurrentNode));
    }
};
