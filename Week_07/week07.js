/*
 * @Author: your name
 * @Date: 2021-03-21 22:56:28
 * @LastEditTime: 2021-03-21 23:10:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \algorithm024\Week_07\week07.js
 */
/**
 * 爬楼梯问题;
 */
 /**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    // 1. 使用dp 的方式求解;
    let dp = [];
    dp[0] = 1;  
    dp[1] = 1;
    for (let i = 2;i <= n;i++){
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
};

/**
 * 使用cur 和 prev 变量的解法;
 */

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    let prev = 1;
    let cur = 1;
    for (let i = 2; i < n+1;i++){
        const temp = cur;
        cur = cur + prev; // 当前状态是过去状态和当前状态的和;
        prev = temp;
    }
    return cur;
};

/**
 * 括号生成问题;
 */


/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let res = [];
       //  cur :当前字符  left：当前字符左括号 right:当前字符右括号
       const help = (cur, left, right) => {
         if (cur.length === 2 * n) {
           res.push(cur);
           return;
         }
         if (left < n) {
           help(cur + "(", left + 1, right)
         }
         if (right < left) {
           help(cur + ")", left, right + 1);
         }
       };
       help("", 0, 0);
       return res;
 };

/**
 * 有效的数独问题;
 */

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    let box_val = new Array(9).fill(0).map(() => new Map())
    let row_val = new Array(9).fill(0).map(() => new Map())
    let col_val = new Array(9).fill(0).map(() => new Map())
    for(let i = 0; i < 9; i++) {
      for(let j = 0; j < 9; j++) {
        if(board[i][j] === '.') continue
        let num = board[i][j]
        let box_idx = Math.floor(i/3)*3 + Math.floor(j/3)
        if(box_val[box_idx].has(board[i][j])) return false
        if(row_val[i].has(board[i][j])) return false
        if(col_val[j].has(board[i][j])) return false
        box_val[box_idx].set(board[i][j],1)
        row_val[i].set(board[i][j],1)
        col_val[j].set(board[i][j],1)
      }
    }
    return true
  };

/**
 * 单词接龙问题;
 */

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {
    // beginWord , endWord , wordList;
    const wordSet = new Set(wordList);
    let queue = [];
    queue.push([beginWord , 1]); // word , index;
    while(queue.length){
        const [word , level] = queue.shift();
        if(word === endWord) {
            return level;
        }
         for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) { // 对应26个字母
                const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1); // 形成新词
                if (wordSet.has(newWord)) { // 单词表里有这个新词
                    queue.push([newWord, level + 1]);
                    wordSet.delete(newWord);  // 避免该词重复入列
                }
            }
        }
    }
    return 0;
};


/**
 * 最小基因变化问题;
 */

/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */
var minMutation = function(start, end, bank) {
    let bankSet = new Set(bank);
    if (!bankSet.has(end)) return -1;
    let queue = [[start, 0]];
    let dna = ["A", "C", "G", "T"];
    while (queue.length) {
        let [node, count] = queue.shift();// 删除数组的头元素，并返回第一个数组的值;
        if (node === end) return count;
        for (let i = 0; i < node.length; i++) {
            for (let j = 0; j < dna.length; j++) {
                let d = node.slice(0, i) + dna[j] + node.slice(i + 1);
                if (bankSet.has(d)) {
                    queue.push([d, count + 1]);
                    bankSet.delete(d);
                }
            }
        }
    }
    return -1;
};

