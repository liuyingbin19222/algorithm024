/*
 * @Author: 刘颖斌
 * @Date: 2021-01-25 22:37:16
 * @LastEditTime: 2021-02-01 23:26:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \algorithm024\Week_01\week01.js
 */
/**
 * 爬楼梯问题:
 * https://leetcode-cn.com/problems/climbing-stairs/submissions/
 */
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    // dp 算法:
    var dp = [];
    dp[0] = 1;
    dp[1] = 1;
    for(let i =2;i <= n;i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
};

/**
 * 
 * 两数之和的问题:
 * https://leetcode-cn.com/problems/two-sum/solution/liang-shu-zhi-he-by-flamboyant-i3lackvve-61of/
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // 遍历数组实现 找到sum 是target 的两个数;
    let result = [];
    for (let i = 0;i < nums.length;i++) {
        for (let j = i + 1;j < nums.length;j++) {
            if(nums[i] + nums[j] === target) {
                result.push(i);
                result.push(j);
            }
        }
    }
    return result;
};

//另一种思路的实现方式： 使用target - nums[i] , 寻找数组里面符合条件的第二个数;

var twoSum = function(nums, target) {
    for (let i = 0;i < nums.length;i++) {
        let index = nums.indexOf(target - nums[i]);
        if(index > -1 && index !== i) {
            return [i , index]
        }
    }
}

/**
 * 两两交换链表中的节点的问题;
 * https://leetcode-cn.com/problems/swap-nodes-in-pairs/
 * 实现思路是通过设置dummy 节点的方式来实现节点的交换;
 */
var swapPairs = function(head) {
    // for - loop 实现两两交换;
    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;

    while(head && head.next) {
        const next = head.next;
        head.next = next.next;
        next.next = head;
        prev.next = next;

        //指针更新;
        prev = head;
        head = head.next;
    }
    return dummy.next;
};


//day 5 :
/**
 * 合并两个有序链表的方式;
 * https://leetcode-cn.com/problems/merge-two-sorted-lists/submissions/
 * 使用递归的方式实现;
 */

var mergeTwoLists = function(l1, l2) {
    //实现不出来 ，看题解; 使用递归的解法来实现;
    if(l1 === null) {
        return l2;
    }
    if(l2 === null) {
        return l1;
    }
    if(l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next,l2);
        return l1;
    }else {
        l2.next = mergeTwoLists(l1,l2.next);
        return l2;
    }
};


/**
 * DAY6：
 * 移动零的实现;
 * https://leetcode-cn.com/problems/move-zeroes/
 * 实现方式是利用sort 高阶函数实现;
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    return nums.sort((a , b) => b ? 0 : -1);
};



/**
 * 第一周作业:
 */

// 删除数组中的重复项;https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    // return [...new Set(nums)];
    // 暴力解;
    // 使用双指针实现; in-place 算法;双指针使用的基本方式是在于对原数组的判断处理;
    let p1 = 0;
    let p2 = 0;
    for ( ;p1 < nums.length;p1++) {
        if(nums[p2] != nums[p1]) {
            p2++;// p2 累加;
            nums[p2] = nums[p1]; // 修改原数组;
        }
    }
    return p2 + 1;
};

// 旋转数组; https://leetcode-cn.com/problems/rotate-array/
var rotate = function(nums, k) {
    for (let i = 0;i < k;i++) {
        nums.unshift(nums.pop());
    }
}

// 合并两个有序数组; 使用双指针的方式求解; https://leetcode-cn.com/problems/merge-sorted-array/

const merge = (nums1, m, nums2, n) => {
    let i = nums1.length - 1
    m--
    n--
    while (n >= 0) {
      if (nums1[m] > nums2[n]) {
        nums1[i--] = nums1[m--]
      } else {
        nums1[i--] = nums2[n--]
      }
    }
  }

// 加一 操作:   https://leetcode-cn.com/problems/plus-one/submissions/
//1. 正常  2. 进一位 3 进多位; 需要考虑三种情况;
var plusOne = function(digits) {
    const len = digits.length;
   for(let i = len - 1; i >= 0; i--) {
       digits[i]++;
       digits[i] %= 10;
       if(digits[i]!=0)
           return digits;
   }
   digits = [...Array(len + 1)].map(_=>0);
   digits[0] = 1;
   return digits;
};