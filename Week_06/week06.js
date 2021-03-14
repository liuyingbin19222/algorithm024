/*
 * @Author: 刘颖斌
 * @Date: 2021-02-28 08:56:44
 * @LastEditTime: 2021-03-14 22:03:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \algorithm024\Week_05\week05.js
 */

/**
 * 1. 斐波那契数列的动态规划实现;
 * 2. 斐波那契队列的递归实现;
 */

const fib = (num) => {
    if(num < 2) return 1;
    let dp = [];
    dp[0] = 0;
    dp[1] = 1;
    for ( let i = 2; i <= num; i++ ) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[num];
}

console.log(fib(3));

const _fib = (num) => {
    if(num < 2) {
        return num;
    }
    return  _fib(num-1) + _fib(num-2);
}
console.log(_fib(3));

/**
 * 爬楼梯问题使用dp 算法实现;
 */

const climbLadder = (num) => {
    let dp = [];
    dp[0] = 1;
    dp[1] = 1;
    if(num < 2) {
        return num;
    }
    // 其实是斐波那契问题;
    for(let i = 2;i <= num;i++){
        dp[i] = dp[i-1] + dp[i-2];
    }
    console.log('爬楼梯的结果:',dp[num]);
    return dp[num];
}

climbLadder(3);

/**
 * 在这里复习一下bfs 的模板代码;
 *  wiki: 实现的思路是新建一个queue 来存储对应的数字, 
 * while(queue.length) {} // 作为外层判断的最终标准;
 */


/**
 * 最小路径和问题:
 *  https://leetcode-cn.com/problems/minimum-path-sum/submissions/
 */

 /**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    // 使用dp 算法;
    let m = grid.length;
    let n = grid[0].length;
    // 计算边界值;
    for (let i  = 1; i < m;i++){
        grid[i][0] += grid[i-1][0];
    }
    for (let j = 1;j < n;j++){
        grid[0][j] += grid[0][j-1];
    }
    // dp 方程;
    for (let i = 1; i < m; i++){
        for (let j = 1; j < n; j++){
            grid[i][j] += Math.min( grid[i][j-1] , grid[i-1][j]);
        }
    }
    return grid[m-1][n-1];
};


/**
 * 解码方法;
 */

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {

    // 异常处理
    if(s[0] === '0') return 0

    // 边界处理：多填充一位辅助位（前两位为1）因为后续需要用到
    const len = s.length, dp = [1, 1, ...new Array(len - 1).fill(0)]

    // dp 方程;
    for (let i = 2; i <= len; i++) {
        let lastOne = s.slice(i - 1, i), lastTwo = s.slice(i - 2, i)

        if(lastOne > 0 && lastOne < 10) dp[i] += dp[i - 1]

        if(lastTwo >= 10 && lastTwo <= 26) dp[i] += dp[i - 2]
    }

    return dp[len]
};


/**
 * 最大正方形问题;
 */


/*
 * @lc app=leetcode id=221 lang=javascript
 *
 * [221] Maximal Square
 */
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    if (matrix.length === 0) return 0;
    const dp = [];
    const rows = matrix.length;
    const cols = matrix[0].length;
    let max = Number.MIN_VALUE;
  
    for (let i = 0; i < rows + 1; i++) {
      if (i === 0) {
        dp[i] = Array(cols + 1).fill(0);
      } else {
        dp[i] = [0];
      }
    }
  
    for (let i = 1; i < rows + 1; i++) {
      for (let j = 1; j < cols + 1; j++) {
        if (matrix[i - 1][j - 1] === "1") {
          dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
          max = Math.max(max, dp[i][j]);
        } else {
          dp[i][j] = 0;
        }
      }
    }
  
    return max * max;
  };


/**
 * 任务调度器
 */

var leastInterval = function(tasks, n) {
    var AIndex = 'A'.charCodeAt(0)
    var arr = new Array(26).fill(0)
    function getIndex(char) {
        return char.charCodeAt(0) - AIndex
    }
    // 找出单个任务执行最多的次数
    var maxRepeatTime = 0;
    for (let i = 0; i < tasks.length; i++) {
        var index = getIndex(tasks[i])
        arr[index] += 1
        maxRepeatTime = Math.max(maxRepeatTime, arr[index])
    }

    // 执行maxRepeatTime次的任务种类
    var maxRepeatTime_taskNum = arr.filter(num=> num === maxRepeatTime).length;

    return Math.max(tasks.length, (n + 1) * (maxRepeatTime-1) + maxRepeatTime_taskNum);
}

/**
 * 回文子串;
 */


const countSubstrings = (s) => {
    let count = 0;
    const len = s.length;
  
    const dp = new Array(len);
    for (let i = 0; i < len; i++) {
      dp[i] = new Array(len).fill(false); // 二维矩阵
    }
  
    for (let j = 0; j < len; j++) { // 注意扫描矩阵的方向，下面会解释
      for (let i = 0; i <= j; i++) {
        if (i == j) {   // 单个字符的情况
          dp[i][j] = true;
          count++;
        } else if (j - i == 1 && s[i] == s[j]) { // 两个字符的情况 
          dp[i][j] = true;
          count++;
        } else if (j - i > 1 && s[i] == s[j] && dp[i + 1][j - 1]) { // 多于两个字符
          dp[i][j] = true;
          count++;
        }
      }
    }
    return count;
  };


/**
 * 最长有效括号;
 */

const longestValidParentheses = (s) => {
        let maxLen = 0;
        const stack = [];
        stack.push(-1);
        for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c == '(') {       // 左括号的索引，入栈
            stack.push(i);
        } else {              // 遍历到右括号
            stack.pop();        // 栈顶的左括号被匹配，出栈
            if (stack.length) { // 栈未空
            const curMaxLen = i - stack[stack.length - 1]; // 计算有效连续长度
            maxLen = Math.max(maxLen, curMaxLen);          // 挑战最大值
            } else {            // 栈空了
            stack.push(i);    // 入栈充当参照
            }
        }
        }
        return maxLen;
  };
  
/**
 * 
 */

/**
 * 编辑距离问题;
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 * 定义 dp[i][j]的含义为：当字符串 word1 的长度为 i，字符串 word2 的长度为 j 时，
 * 将 word1 转化为 word2 所使用的最少操作次数为 dp[i][j]
 */
var minDistance = function(word1, word2) {
    let n1 = word1.length;
    let n2 = word2.length;
    let dp = new Array(n1 + 1)
    for (let i = 0; i < n1 + 1; i++) {
        dp[i] = new Array(n2 + 1).fill(0)
    }
    // dp[0][0...n2]的初始值
    for (let j = 1; j <= n2; j++) {
        dp[0][j] = dp[0][j - 1] + 1;
    }
    // dp[0...n1][0] 的初始值
    for (let i = 1; i <= n1; i++) {
        dp[i][0] = dp[i - 1][0] + 1;
    }
    // 通过公式推出 dp[n1][n2]
    for (let i = 1; i <= n1; i++) {
        for (let j = 1; j <= n2; j++) {
            // 如果 word1[i] 与 word2[j] 相等。第 i 个字符对应下标是 i-1
            if (word1[i - 1] == word2[j - 1]){
                dp[i][j] = dp[i - 1][j - 1];
            }else {
                dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]) + 1;
            }         
        }
    }
    return dp[n1][n2];
};


/**
 * 青蛙过河问题;
 */

var canCross = function (stones) {
    const set = new Set()
    return helper(stones, 0, 0, set)
 };
 var helper = function (stones, index, k, set) {
     const key = index * 1000 + k
     if (set.has(key)) {
         return false
     } else {
         set.add(key)
     }
     for (let i = index + 1; i < stones.length; i++) {
         const gap = stones[i] - stones[index]
         if (gap >= k-1 && gap <= k+1) {
             if (helper(stones, i, gap, set)) {
                 return true
             }
         } else if (gap > k+1) {
             break
         }
     }
     return index == stones.length - 1
 }
 

/**
 * 分割数组的最大值;
 */


/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function(nums, m) {
    let len = nums.length,
      sumList = Array(len + 1).fill(0),
      dp = Array.from({ length: len + 1 }, () => Array(m + 1).fill(Number.MAX_VALUE));
  
    // 逐位增加，反面后面根据区间求区间和
    for (let i = 0; i < len; i++) {
      sumList[i + 1] = sumList[i] + nums[i];
    }
  
    // 默认值
    dp[0][0] = 0;
  
    for (let i = 1; i <= len; i++) {
      for (let j = 1; j <= Math.min(m, i); j++) {
        // 前i个数分成j段
        for (let x = j - 1; x < i; x++) {
          // x最后一段的起点
          // perv本轮分割完成 分段中最大的和
          let prev = Math.max(dp[x][j - 1], sumList[i] - sumList[x])
          // 该分割情况下最大分段和的最小值
          dp[i][j] = Math.min(prev, dp[i][j])
        }
      }
    }
  
    return dp[len][m]
  };

/**
 * 学生出勤记录;
 */

var checkRecord = function (n) {
    const mod = 1e9 + 7;
    const memo = new Map();
    return btm(n, false, 0);

    function btm(n, existA, countL) {
        const key = `${n},${existA},${countL}`;
        if (!memo.has(key)) {
            if (--n == 0) {
                const sum = 1 + (existA ? 0 : 1) + (countL == 2 ? 0 : 1);
                memo.set(key, sum);
            }
            else {
                const sum1 = btm(n, existA, 0);                 //next is P
                const sum2 = existA ? 0 : btm(n, true, 0);      //next is A
                const sum3 = countL == 2 ? 0 : btm(n, existA, ++countL); //next is L
                memo.set(key, (sum1 + sum2 + sum3) % mod);
            }
        }
        return memo.get(key);
    }
};

/**
 * 最小覆盖字串;
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    // 创建左指针
    let l = 0;
    // 创建右指针
    let r = 0;
    // 最后需要返回的最小长度子串
    let res = "";
    // 创建字典表
    const m = new Map();
    // 遍历需要匹配的字符
    for (let i = 0; i < t.length; i++) {
      const c = t[i];
      // 放入字典表
      m.set(c, m.has(c) ? m.get(c) + 1 : 1);
    }
    // 创建记录需要匹配的字符种类
    let needType = m.size;
    // 遍历字符串
    while (r < s.length) {
      // 获取当前字符
      const c = s[r];
      // 如果是需要匹配的字符
      if (m.has(c)) {
        // 更新字典表中的次数 - 1
        m.set(c, m.get(c) - 1);
        //  如果次数为0，证明这个字符种类在当前窗口已经集齐了，needType - 1
        if (m.get(c) === 0) needType -= 1;
      }
      // 当needType为0，证明所有需要匹配的字符都已经在当前滑动窗口中
      while (needType === 0) {
        const c2 = s[l];
        // 记录当前滑动窗口的字符
        let newRes = s.slice(l, r + 1);
        // 当新的窗口中的字符长度小于上次的字符长度时，更新结果
        // !res 是在结果值为空的时候需要更新一下第一次匹配的值
        if (!res || newRes.length < res.length) res = newRes;
        // 如果左指针移动过程中出现，字典中的值证明需要匹配的字符已经脱离了当前窗口
        if (m.has(c2)) {
          // 更新表中需要出现的次数
          m.set(c2, m.get(c2) + 1);
          // 更新needType
          if (m.get(c2) === 1) needType += 1;
        }
        // 移动左指针
        l++;
      }
      // 移动右指针
      r++;
    }
    // 返回结果值
    return res;
  };



/**
 * 戳气球;
 */

var maxCoins = function (nums) {
    let res = Number.MIN_VALUE;
    backtrack(nums, 0);
    return res;
    // 回溯法，状态树很大
    function backtrack(nums, score) {
      if (nums.length == 0) {
        res = Math.max(res, score);
        return;
      }
      for (let i = 0, n = nums.length; i < n; i++) {
        let point =
          (i - 1 < 0 ? 1 : nums[i - 1]) *
          nums[i] *
          (i + 1 >= n ? 1 : nums[i + 1]);
        let tempNums = [].concat(nums);
        // 做选择 在 nums 中删除元素 nums[i]
        nums.splice(i, 1);
        // 递归回溯
        backtrack(nums, score + point);
        // 撤销选择
        nums = [...tempNums];
      }
    }
  };
  
