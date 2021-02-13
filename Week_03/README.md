<!--
 * @Author: your name
 * @Date: 2021-02-01 23:17:41
 * @LastEditTime: 2021-02-13 10:06:50
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


- 二分查找算法:

https://leetcode-cn.com/problems/sqrtx/solution/cong-ji-ben-de-er-fen-fa-shuo-qi-jie-jue-xde-ping-/

这里的文字是对该文章的总结复盘;

二分查找是面试中常考的算法，对基本的使用场景以及套路需要有一个熟悉的了解;

二分法使用的场景是：

大多数情况下具有单调性质;
可以通过index 访问元素;

简单的例子:
[1,2,3,4,5,6,6,7] , 找到4 , 普通的遍历算法的时间复杂度是O(n),使用二分查找算法的时间复杂度是O(logn) ; 

查找代码的写法如下:
```
function searchNum(target , nums) {
    if(!nums.length) return -1;
    let left = 0;
    let right = nums.length - 1;
    let mid;
    // while 是处理的关键代码;
    while(left <= right) {
        mid = left + ((right - left) >> 1)
        if(nums[mid] === target) {
            return mid;
        }
        if(nums[mid] < target){
            left = mid + 1;
        }
        if(nums[mid] > target){
            right = mid - 1;
        }
    }
    return -1;
}
```

上述是二分查找的模板代码，leetcode 有一道题是求平方根,比较偷懒的方式是调用Math.sqrt 进行计算。但是这里说到了二分查找，我们就用二分查找进行实现了;


使用二分查找计算平方根的代码是:

```
const mySqrt = (num) => {
    if(num < 2) return num;
    let left = 1;
    let mid;
    let right = Math.floor(num / 2);
    while(left <= right) {
        mid = Math.floor(left + (right - left) / 2)
        if(mid * mid === x) return mid;
        if(mid * mid < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return right;
}
```










