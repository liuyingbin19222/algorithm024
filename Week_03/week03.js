/*
 * @Author: your name
 * @Date: 2021-02-10 07:14:52
 * @LastEditTime: 2021-02-11 09:20:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \algorithm024\Week_03\week03.js
 */


/**
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
 * https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/
 * 解法是使用递归的方式求解，分下面几种情况进行讨论：
 *  p , q 分别是 root 的情况，这时候最近公共祖先就是root；
 *  p , q 分别在root 的左右子树上，那么最近的公共祖先就是root;
 *  p , q 分别在root 的某一刻子树上，那么需要继续递归求解;
 *
 */

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
    if(root === p || root === q) {
        return root;
    }
    let left = lowestCommonAncestor(root.left , p , q);
    let right = lowestCommonAncestor(root.right , p , q);
    if(left && right) {
        return root;
    }
    if(left === null){
        return right;
    }
    return left;

};
/**
 * 组合问题;
 * 
 * https://leetcode-cn.com/problems/combinations/
 * 
 */

const combine = (n, k) => {
    const res = [];
      // 选择;
    const helper = (start, path) => { // start是枚举选择的起点 path是当前构建的路径（组合）
      if (path.length == k) {
        res.push(path.slice());       // 拷贝一份path，推入res
        return;                       // 结束当前递归
      }
      for (let i = start; i <= n; i++) { // 枚举出所有选择
        path.push(i);                    // 选择
        helper(i + 1, path);             // 向下继续选择
        path.pop();                      // 撤销选择
      }
    };
  
    helper(1, []); // 递归的入口，从数字1开始选
    return res;
  }


/**
 * 前序: root , 
 * 中序: 寻找root;
 *  https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 */

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if(inorder.length === 0) {
        return null;
    }
    // 使用递归方式生成二叉树;
    // 使用字符串截取的方式 来求解;
    let root = new TreeNode( preorder[0]);
    let mid = inorder.indexOf(preorder[0]);
    root.left = buildTree(preorder.slice(1,mid+1), inorder.slice(0,mid)); // 
    root.right = buildTree(preorder.slice(mid+1), inorder.slice(mid+1));
    return root;
};

/**
 * 全排列问题:
 * https://leetcode-cn.com/problems/permutations/
 * 使用的是回溯的方法进行求解;
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = (nums) => {
    // 1. 设置结果集
    const result = [];
    // 2. 回溯
    const recursion = (path, set) => {
      // 2.1 设置回溯终止条件
      if (path.length === nums.length) {
        // 2.1.1 推入结果集
        result.push(path.concat());
        // 2.1.2 终止递归
        return;
      }
      // 2.2 遍历数组
      for (let i = 0; i < nums.length; i++) {
        // 2.2.1 必须是不存在 set 中的坐标
        if (!set.has(i)) {
          // 2.2.2 本地递归条件（用完记得删除）
          path.push(nums[i]);
          set.add(i);
          // 2.2.3 进一步递归
          recursion(path, set);
          // 2.2.4 回溯：撤回 2.2.2 的操作
          path.pop();
          set.delete(i);
        }
      }
    };
    recursion([], new Set());
    // 3. 返回结果
    return result;
  };
  
  

/**
 * 全排列2 :
 * 使用剪枝算法进行求解;
 * https://leetcode-cn.com/problems/permutations-ii/submissions/
 * used[i] 来控制是否进行遍历;
 * 
 */

const permuteUnique = (nums) => {
    const res = [];
    const len = nums.length;
    const used = new Array(len);
    nums.sort((a, b) => a - b); // 升序排序
  
    const helper = (path) => {
      if (path.length == len) { // 个数选够了
        res.push(path.slice()); // path的拷贝 加入解集
        return;                 // 结束当前递归 结束当前分支
      }
  
      for (let i = 0; i < len; i++) { // 枚举出所有的选择
        if (nums[i - 1] == nums[i] && i - 1 >= 0 && !used[i - 1]) { // 避免产生重复的排列
          continue;
        }
        if (used[i]) {      // 这个数使用过了，跳过。
          continue;
        }
        path.push(nums[i]); // make a choice
        used[i] = true;     // 记录路径上做过的选择
        helper(path);       // explore，基于它继续选，递归
        path.pop();         // undo the choice
        used[i] = false;    // 也要撤销一下对它的记录
      }
    };
    helper([]);
    return res;
  };
  


 
