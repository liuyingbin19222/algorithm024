/*
 * @Author: 刘颖斌
 * @Date: 2021-02-02 22:24:09
 * @LastEditTime: 2021-02-06 20:24:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \algorithm024\Week_02\week02.js
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// 以后使用es6 来写代码;
// 两个数组的交集 II
var intersect = function(nums1, nums2) {
    // 使用hashMap 的方式实现;
    let map = new Map();
    let res = [];
    for (let i of nums1) {
        if(map[i]) {
            map[i]++;
        }else {
            map[i] = 1;
        }
    }
    for (let i of nums2) {
        const val = map[i];
        if(val > 0) {// 从一开始
            res.push(i);
            map[i]--;
        }
    }
    return res;
};

/**
 * 滑动窗口问题
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// 使用单调队列来实现;
var maxSlidingWindow = function(nums, k) {
    let result = [];
    // 数组遍历的方式进行 ，之后使用滑动窗口去实现;
    // if(nums.length <= 2 && nums.length > 0) {
    //     result.push(findMax(nums));
    //     return result;
    // }
    if(nums.length === 0) {
        return result;
    }
    for (let i = 0;i < nums.length-k+1;i++) {
        let part = [];
        for (let j = i;j < i+k;j++) {
            part.push(nums[j]);
        }
        // 对part 进行处理;
        result.push(findMax(part));
    }
    return result;
};

var findMax = function(arr) {
    let max = arr[0];
    for (let i in arr){
        if(arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}


/**
 * 移除最外层括号
 * https://leetcode-cn.com/problems/remove-outermost-parentheses/submissions/
 */

 /**
 * @param {string} S
 * @return {string}
 */
// 使用计数法来实现;
var removeOuterParentheses = function(S) {
    // 使用最简单的计数法求解;
    let res = '';
    let operate = 0;
    for(let i of S){
        if(i === '(' && operate++ > 0) {
            res += i
        }else if(i === ')' && operate-- > 1) { // 说明是最里层的括号;
            res += i;
        }
    }
    return res;
};

/**
 * FizzBuzz 游戏的实现;
 * https://leetcode-cn.com/problems/fizz-buzz/solution/arrayfrom1xing-dai-ma-chao-99-by-mantoufan/
 */
//Array.from 返回的是一个数组的实例对象;
var fizzBuzz = function(n) {
    return Array.from({length: n}, (t, i) => (t = (++i % 3 ? '' : 'Fizz') + (i % 5 ? '' : 'Buzz')) ? t : '' + i)
};

var newFizzBuzz = function (n) {
    let res = [];
    for (let i = 0 , fizz = 0,buzz = 0;i <= n;i++){
        fizz++;
        buzz++;
        if(fizz === 3 && buzz === 5) {
            res.push("FizzBuzz");
            fizz = 0;
            buzz =0;
        }else if(fizz === 3) {
            res.push('Fizz');
            fizz = 0;
        }else if(buzz === 5){
            res.push('Buzz');
            buzz = 0;
        }else {
            res.push(i + '');
        }
    }
    return res;
}

/**
 * TOP k 问题 ,最小的k个数;
 * 实现的方式首先是sort 一下 ，之后在返回最小的k个数来实现;
 */

 /**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
    arr.sort((a ,b) => {
            return a -b; // 从小到大进行排序; 
    });
    let res = [];
    for (let i = 0;i < k;i++) {
        res.push(arr[i]);
    }
    return res;
};

// top k 问题可以使用快速排序实现， 其实sort 函数的底层实现原理同样也用的是
// 快速排序的方式; https://juejin.cn/post/6844903507439419399


class BinaryHeap {
    constructor(compare) {
        this.data = [];
        this.compare = compare;
    }
    insert(value) {
        this.insertAt(this.data.length, value);
    }
    insertAt(index, value) {
        this.data[index] = value; // 对比当前节点与其父节点，如果当前节点更小就交换它们    
        while (index > 0 && this.compare(value, this.data[Math.floor((index - 1) / 2)]) < 0) {
            this.data[index] = this.data[Math.floor((index - 1) / 2)];
            this.data[Math.floor((index - 1) / 2)] = value;

            index = Math.floor((index - 1) / 2);
        }
    }
    delete(index) {
        if (this.data.length === 0) return;
        let value = this.data[index];
        let i = index; // fix heap    
        while (i < this.data.length) {
            let left = i * 2 + 1;
            let right = i * 2 + 2; // 没有左子节点      
            if (left >= this.data.length) break; // 没有右子节点      
            if (right >= this.data.length) {
                this.data[i] = this.data[left];
                i = left;
                break;
            } // 比较左右子节点的大小，更小的补到父节点     
            if (this.compare(this.data[left], this.data[right]) < 0) {
                this.data[i] = this.data[left];
                i = left;
            } else {
                this.data[i] = this.data[right];
                i = right;
            }
        } // 查看最后的空位是不是最后的叶子节点  
        if (i < this.data.length - 1) {
            this.insertAt(i, this.data.pop());
        } else {
            this.data.pop();
        }
        return value;
    }
    printHeap() {
        console.log("nHeap = ");
        console.log(this.data);
    }
}
let maxHeap = new BinaryHeap((a, b) => b - a);
maxHeap.insert(10);
maxHeap.insert(4);
maxHeap.insert(9);
maxHeap.insert(1);
maxHeap.insert(7);
maxHeap.insert(5);
maxHeap.insert(3);
maxHeap.printHeap();
maxHeap.delete(5);
maxHeap.printHeap();
maxHeap.delete(2);
maxHeap.printHeap();

/**
 * 有效字母的异位词;
 * https://leetcode-cn.com/problems/valid-anagram/
 * 自己使用遍历的方式，讲数组转换为对象，在对 对象按照val 进行排序，最终输出
 * 结果对象;
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    let s_arr = s.split('');
    let t_arr = t.split('');
    if(s_arr.length !== t_arr.length) {
        return false;
    }
    let result = true;
    let s_arr_obj = s_arr.reduce((all , item) => {
        if(item in all){
            all[item] ++;
        }else {
            all[item] = 1;
        }
        return all;
    },{});
    let t_arr_obj = t_arr.reduce((all , item) => {
        if(item in all){
            all[item] ++;
        }else {
            all[item] = 1;
        }
        return all;
    },{});
    Object.keys(s_arr_obj).forEach(item => {
        if( s_arr_obj[item] !== t_arr_obj[item]){
            result = false;
        }
    });
    return result;
};

/**
 * 参考高赞的新的解法 ， 是利用数组 ，s 对应++ , t 对应--
 * 最后判断
 */

// Java 的代码, 数组index 转换的时候没有找到好的方法进行转换; 就先晾凉代码吧;
```
class Solution {
    public boolean isAnagram(String s, String t) {
        if(s.length() != t.length())
            return false;
        int[] alpha = new int[26];
        for(int i = 0; i< s.length(); i++) {
            alpha[s.charAt(i) - 'a'] ++;
            alpha[t.charAt(i) - 'a'] --;
        }
        for(int i=0;i<26;i++)
            if(alpha[i] != 0)
                return false;
        return true;
    }
}
```

/**
 * twoSum 问题的解法;
 * 个人的解法;
 * https://leetcode-cn.com/problems/two-sum/
 * 找到和是目标值的两个整数;
 */
var twoSum = function (nums , target){
    // 使用for 循环的方式遍历;
    let result = [];
    for (let i = 0;i < nums.length;i++) {
        for (let j = i + 1;j < nums.length;j++){
            if(nums[j] + nums[i] === target){
                result.push(i);
                result.push(j);
            }
        }
    }
    return result;
}
 

// 国际站的方式是: 利用差值的解法配合 in 判断;
const twoSum = (nums, target) => {
    let dict= {};    
    for(let i = 0; i<nums.length; i++) {
        let inp = nums[i];
        let diff = target-inp;// 去差值;
        if(diff in dict) return [dict[diff], i]; //  in 的用法是 判断是否是对象的key；取val , 并取索引值;
        dict[inp] = i;
    }
    return null;
};

/**
 * N叉树的前序遍历;  使用递归进行实现;
 */

var preorder = function(root) {
    let array = [];
    var dfs = function (node) {
        if (node === null) {
            return;
        }
        array.push(node.val);
        for (let i = 0; i < node.children.length; i++) {
            dfs(node.children[i]);
        }
        return;
    }
    dfs(root); // 递归实现;
    return array;
};

// 字母异位词分组问题; 参考高赞答案进行实现; 自己还没有实现;

var groupAnagrams = function(strs) {
    var h = new Map, prime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101]
    for(var i = 0; i < strs.length; i++) {
        for(var j = 0, sum = 1; j < strs[i].length; j++)
            sum *= prime[strs[i].charCodeAt(j) - 97]
        h.has(sum) ? h.get(sum).push(strs[i]) : h.set(sum, [strs[i]])
    }
    return Array.from(h.values())
};
/**
 * 中序遍历输出二叉树的最终结果;
 * 定义一个函数，中序遍历调用,在调用一下，输出最终的结果;
 */
 /**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    let res = [];
    const inorder = (root) => {
        if(root === null) return;
        inorder(root.left);
        res.push(root.val);
        inorder(root.right);
    }
    inorder(root);
    return res;
};


/**
 * @param {Node} root
 * @return {number[][]}
 * 代码借鉴的是高赞的代码实现，
 * 背下来，以后会常考到;
 */
// N叉树的层次遍历;
var levelOrder = function(root) {
    var nums = [];
    search(nums,root,0);
    return nums;
};

function search(nums,node,k){
    if(node == null){
        return;
    }
    if(nums[k]==undefined){
        nums[k] = [];
    }
    nums[k].push(node.val);
    for(var i = 0;i < node.children.length;i++){
        search(nums,node.children[i],k + 1);
    }
}


/**
 * 剑指offer : 丑数 ，因子只是2 3 5 的数;输出第n个数;
 */
var nthUglyNumber = function(n) {
    const res = new Array(n);
    res[0] = 1;

    let ptr2 = 0, // 下个数字永远 * 2
        ptr3 = 0, // 下个数字永远 * 3
        ptr5 = 0; // 下个数字永远 * 5

    for (let i = 1; i < n; ++i) {
        res[i] = Math.min(res[ptr2] * 2, res[ptr3] * 3, res[ptr5] * 5);
        // 说明前ptr2个丑数*2也不可能产生比i更大的丑数了
        // 所以移动ptr2
        if (res[i] === res[ptr2] * 2) {
            ++ptr2;
        }
        if (res[i] === res[ptr3] * 3) {
            ++ptr3;
        }
        if (res[i] === res[ptr5] * 5) {
            ++ptr5;
        }
    }
    return res[n - 1];
};


