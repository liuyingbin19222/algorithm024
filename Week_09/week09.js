/*
 * @Author: 刘颖斌;
 * @Date: 2021-04-04 23:11:59
 * @LastEditTime: 2021-04-04 23:19:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \algorithm024\Week_09\week09.js
 */


/**
 * 数组的相对排序;
 * https://leetcode-cn.com/problems/relative-sort-array/
 */
 

var relativeSortArray = function (arr1, arr2) {
    const counts = new Array(1001).fill(0);
  
    for (const n of arr1) { // 统计arr1数字的出现次数
      counts[n]++;
    }
  
    const res = [];
    for (const n of arr2) {   // 遍历arr2
      while (counts[n] > 0) { // 出现次数>0，循环推入res
        res.push(n);	   // 循环结束时，值变为0
        counts[n]--;
      }
    }
  
    for (let i = 0; i < counts.length; i++) { // 遍历counts
      while (counts[i] > 0) { // 非0项的索引 循环推入res
        res.push(i);
        counts[i]--;
      }
    }
    return res;
  };

/**
 * 有效字母的异位词;
 * 
 */


 /**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if(s.length !== t.length) {
        return false;
    }
    let result = [];
    for (let i = 0;i < s.length;i++) {
        result[s.charAt(i)] ++;
        result[t.charAt(i)] --;
    }
    for (let i in result){
        if(result[i] !== 0) {
            return false;
        }
    }
    return true;
};


/**
 * 反转字符里的单词;
 */

var reverseWords = function (s) {

    let r = s.length - 1, l = r, res = "";
    while (l >= 0) {
        //先找到单词的尾部
        while (s[r] === " ") {
            r--;
        }
        l = r;

        //给上次单词加空格，排除第一次
        if (l >= 0 && res) {
            res += " ";
        }

        //再找到单词的头部
        while (s[l] && s[l] !== " ") {
            l--;
        }

        //遍历单词并添加
        for (let i = l + 1, j = r; i <= j; i++) {
            res += s[i];
        }

        //跳到下一个单词
        r = l;
    }

    return res;
};



/**
 * 同构字符串;
 */


var isIsomorphic = function(s, t) {
    const s2t = {}
    const t2s = {}
    for (let i = 0; i < s.length; i++) {
        const a1 = s2t[s[i]]
        const a2 = t2s[t[i]]
        if (a1 && a2) {
            if (a1 != t[i] || a2 != s[i]) {
                return false
            }
        } else if (!a1 && !a2) {
            s2t[s[i]] = t[i]
            t2s[t[i]] = s[i]
        } else {
            return false
        }
    }
    return true
};

/**
 * LRU 缓存机制代码;
 */



class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.map = new Map();
    }

    get(key) {
        let val = this.map.get(key);
        if (val === undefined) return -1;

        this.map.delete(key); // 因为被用过一次，原有位置删除
        this.map.set(key, val); // 放入最下面表示最新使用
        return val;
    }

    put(key, val) {
        if (this.map.has(key)) this.map.delete(key); // 如果有，删除

        this.map.set(key, val); // 放到最下面表示最新使用

        if (this.map.size > this.capacity) {
            // 这里有个知识点
            // map的entries方法，还有keys方法(可以看mdn))，会返回一个迭代器
            // 迭代器调用next也是顺序返回，所以返回第一个的值就是最老的，找到并删除即可
            this.map.delete(this.map.entries().next().value[0])
        }
    }
}


/**
 * 合并区间;
 */


/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if(!intervals || !intervals.length) return [];
intervals.sort((a,b)=>a[0] - b[0]);  //  关键要进行排序;
let ans = [ intervals[0] ];  

for(let i = 0 ; i <  intervals.length; i++){
  if(ans[ans.length-1][1] >= intervals[i][0]){
    ans[ans.length-1][1] = Math.max( ans[ans.length-1][1] , intervals[i][1]);
  }else{
    ans.push(intervals[i]);
  }
}

return ans;
};


/**
 * 最长上升子序列;
 */


/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    let dp = [1];
    for (let i = 0;i < nums.length;i++){
        dp[i] = 1;
        for (let j = 0;j < i;j++){
            nums[i] > nums[j] && (dp[i] = Math.max(dp[i] , dp[j] + 1));
        }
    }
    return Math.max(...dp);
};


/**
 * 解码方法;
 */



var numDecodings = function(s) {
    if(s[0] == "0") return 0;
    let dp = [1, 1], len = s.length;
    for(let i=1; i < len; ++i) {
        if(s[i - 1] != "0") {
            let num = (s[i - 1] + s[i] | 0);
            if(num >= 1 && num <= 26) {
                dp[i + 1] = s[i] != "0"? dp[i - 1] + dp[i]: dp[i - 1];
            } else if(s[i] != "0") {
                dp[i + 1] = dp[i];
            } else {
                return 0;
            }
        } else if(s[i] != "0") {
            dp[i + 1] = dp[i];
        } else {
            return 0;
        }
    }
    return dp[len];
}


