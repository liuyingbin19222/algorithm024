<!--
 * @Author: your name
 * @Date: 2021-02-01 23:17:41
 * @LastEditTime: 2021-03-14 10:53:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \algorithm024\Week_05\README.md
-->
学习笔记


#### dp 算法

- 求解DP问题的三步:

找到子问题， 确定状态空间， 求出状态方程;


- 求解dp 算法的思考方式:

计算机中是if-else , for loop , 所以自己的思维要适配机器思维;

说一点题外话，要掌握一个问题，需要找出来求解该问题的根本逻辑是什么 ， 抓住了根本的逻辑，自然的这个问题也就迎刃而解了，最多在封装一些方法论的方式;

那么 ，对于别的问题 ，比如说升级加薪，跳槽去大厂的底层逻辑是什么 ， 只有抓住了底层的逻辑，才不会乱花渐欲迷人眼，找不着北; 同样的，个人赚钱的底层逻辑是什么，也是一样的道理，不过我还没有找到呀。。

- 问题求解方法汇总:

之前解斐波那契问题的时候，多数情况自己用的是人肉递归:

```
const _fib = (num) => {
    if(num < 2) {
        return num;
    }
    return  _fib(num-1) + _fib(num-2);
}
```

##### 每日一题记录:

1. 两个字符串的最长公共子序列:
solu: 1. 最开始想用暴力求解的方式; 
    2. 看答案解析之后，发现使用动态规划是一个更好的方式;
```
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 * dp(m,n)表示：S1[0...m] 和 S2[0...n] 的最长公共子序列的长度
 * S1[m] == S[n]：dp(m,n) = 1 + dp(m - 1,n - 1)
 * dp(m,n) = max(dp(m - 1,n), dp(m,n - 1))
 */
var longestCommonSubsequence = function(text1, text2) {
  const m = text1.length;
  const n = text2.length;

  // 初始化二维 dp 数组
  const dp = new Array(m)
  for (let i = 0; i < m; i++) {
    dp[i] = new Array(n).fill(0)
  }
    /**
        这里注意一下 ， 初始化二维数组的方式使用new Array 进行实现， 之后通过fill 进行填充;这是
        动态规划解法中常使用的方式;
    */
  // 从前往后遍历设置 dp[i][j]，根据 dp[0][0..n] 和 dp[0..m][0] 都为 0，推导出 dp[m-1][n-1]
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          // 第一种情况，两者相等，则 dp(m,n) = 1 + dp(m - 1,n - 1)
          if (text1[i] === text2[j]) {
            if (i - 1 < 0 || j - 1 < 0) { // 越界处理
              dp[i][j] = 1 + 0;
            } else {
              dp[i][j] = 1 + dp[i - 1][j - 1];
            }  
          } else { // 第二种情况，两者不相等，则 dp(m,n) = max(dp(m - 1,n), dp(m,n - 1))
              if (i - 1 < 0 || j - 1 < 0) { // 越界处理
                if (i - 1 < 0 && j - 1 < 0) {
                  dp[i][j] = 0
                } else if (i - 1 < 0) {
                  dp[i][j] = dp[i][j - 1]
                } else if (j - 1 < 0) {
                  dp[i][j] = dp[i - 1][j]
                } 
              } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
              }
             
          }
      }
  }

  return dp[m - 1][n - 1];
};
```
#### 最大子序列和问题求解

1. 基本解法:
  解决这个问题的基本方式是找到自相似性的子问题，抛弃第一反应的估量的方式（凭经验）,之后使用DP 算法进行求解;
  dp 算法的步骤是:
    1): 分治问题;
    2): 状态数组定义;
    3): 列出dp 方程; f[i] = Math.max(f[i-1] , 0) + a[i];

  之后写出代码进行求解;

  
  





