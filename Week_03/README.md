<!--
 * @Author: your name
 * @Date: 2021-02-01 23:17:41
 * @LastEditTime: 2021-02-11 09:37:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \algorithm024\Week_03\README.md
-->
学习笔记

#### week 03

- 递归解法的基本方式:
terminator , process , drill down , reverse state;

分治解法和回溯解法也是和递归解法的方式基本一致;

- 寻找最近公共祖先的问题:
    使用递归进行寻找，样例代码入下:
```
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if(root === null){
        return null;
    }
    if(root === p || root === q){
        return root;
    }
    // 递归寻找
    let left = lowestCommonAncestor(root.left , p , q);
    let right = lowestCommonAncestor(root.right , p , q);

    if(left && right) {
        return root;
    }else if(left === null) {
        return right;
    }
    return left;
};
```








