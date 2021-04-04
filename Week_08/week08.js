/*
 * @Author: 刘颖斌;
 * @Date: 2021-03-28 10:18:53
 * @LastEditTime: 2021-03-28 11:20:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \algorithm024\Week_08\week08.js
 */
/**
 * 汉明重量;
 */
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let count = 0;
    while(n){
        n &= n - 1;// 不断的对n 进行反转操作;
        count++;
    }
    return count;
};


/**
 * 2 的幂;
 */

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
    return n > 0 && (n & (n-1)) === 0;
};



/**
 * 颠倒二进制位;
 */

/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */

var reverseBits = function(n) {
    let res = 0;
    for( let i = 0; i < 32; i++) {
        res = (res << 1) + (n & 1); //每次取末尾;
        n >>= 1;
    }
    return res>>>0;  // 必须要无符号右移;
};

/**
 * trie 树的实现;
 */



class Trie {
    constructor() {
      this.root = Object.create(null);
    }
    insert(word) {
      let node = this.root
      for (const c of word) {
        if (!node[c]) node[c] = Object.create(null)
        node = node[c]
      }
      node.isWord = true;
    }
  
    traverse(word) {
      let node = this.root;
      for (const c of word) {
        node = node[c]
        if (!node) return null
      }
      return node;
    }
  
    search(word) {
      const node = this.traverse(word)
      return !!node && !!node.isWord; 
      // !! 操作保证 '' , null , undefined 在if 体中不会执行;
    }
  
    startsWith(prefix) {
      return !!this.traverse(prefix)
    }
  
  }



/**
 * 省份数量;
 * 
 * 是使用并查集实现的经典问题;
 * https://leetcode-cn.com/problems/number-of-provinces/
 */

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
// 使用并查集实现;

class UnionFind {  
    constructor(n) {    
        this.count = n;    
        this.parent = new Array(n);    
        for (let i = 0; i < n; i++) {      
            this.parent[i] = i;    
            }  
        }  
        find(p) {    
            let root = p;    
            while (this.parent[root] !== root) {      
                root = this.parent[root];    
            }    // 压缩路径    
            while (this.parent[p] !== p) {      
                let x = p;      
                p = this.parent[p];      
                this.parent[x] = root;    
            }    
            return root;  
        }
        union(p, q) {    
            let rootP = this.find(p);    
            let rootQ = this.find(q);    
            if (rootP === rootQ) return;    
            this.parent[rootP] = rootQ;    
            this.count--;  
        }
    }

var findCircleNum = function(isConnected) {
    let i = -1, unionFind = new UnionFind(isConnected.length)
    while (++i < isConnected.length)
        for (let j = i + 1; j < isConnected[i].length; j++)
            if (isConnected[i][j]) unionFind.union(i, j)
    return unionFind.parent.filter((v, i) => v === i).length
};



/**
 * 岛屿数量;
 */

var numIslands = function(grid) {
    let m = grid.length;
    if (m == 0) return 0;
    let n = grid[0].length;
    let dirs = [[0,1],[0,-1],[1,0],[-1,0]];
    let ret = 0;
    let roots = [...new Array(m * n)].map((_, i) => i);
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (grid[i][j] == '1') {
                ret++;
                let root1 = findRoot(i * n + j);
                for (let dir of dirs) {
                    let ii = i + dir[0];
                    let jj = j + dir[1];
                    if (grid[ii] && grid[ii][jj] == '1') {
                        console.log(i, '_', j, '    ', ii, '_' , jj);
                        let root2 = findRoot(ii * n + jj);
                        if (root1 != root2) {
                            roots[root2] = root1;
                            ret--;
                        }
                    }
                }
            }
        }
    }
    return ret;
    
    function findRoot(id) {
        if (id == roots[id]) return id;
        roots[id] = findRoot(roots[id]);
        return roots[id];
    }
};

 
 /**
  * 被围绕的区域;
  * 
  */

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
/**
 * 使用递归实现;
 */
var solve = function(board) {
    if(board == null || board.length == 0) return ;
    var m = board.length;
    var n = board[0].length;
    for(let i = 0;i < m;i++){
        for(let j = 0;j < n;j++){
            var isEdge = i == 0 || j == 0|| i == m-1 || j == n-1;
            if(isEdge && board[i][j] == 'O') {
                dfs(board,i,j);
            }
        }
    }

    for(var i = 0;i < m;i++) {
        for(var j = 0;j < n;j++) {
            if(board[i][j] == 'O') {
                board[i][j] = 'X';
            }
            if(board[i][j] == '#'){
                board[i][j] = 'O';
            }
        }
    }
};

var dfs = function(arr,i,j){
    if(i < 0|| j < 0|| i >= arr.length || j >= arr[0].length ||
    arr[i][j] == 'X' || arr[i][j] == '#'){
        return ;
    }
    arr[i][j] = '#';
    dfs(arr,i-1,j);
    dfs(arr,i+1,j);
    dfs(arr,i,j-1);
    dfs(arr,i,j+1);
}

/**
 * N皇后问题：
 */


const solveNQueens = (n) => {
    const board = new Array(n);
    for (let i = 0; i < n; i++) {     // 棋盘的初始化
      board[i] = new Array(n).fill('.');
    }
    const res = [];

    const isValid = (row, col) => {  
      for (let i = 0; i < row; i++) { // 之前的行
        for (let j = 0; j < n; j++) { // 所有的列
          if (board[i][j] == 'Q' &&   // 发现了皇后，并且和自己同列/对角线
            (j == col || i + j === row + col || i - j === row - col)) {
            return false;             // 不是合法的选择
          }
        }
      }
      return true;
    };
    
    const helper = (row) => {   // 放置当前行的皇后
      if (row == n) {           // 递归的出口，超出了最后一行
        const stringsBoard = board.slice(); // 拷贝一份board
        for (let i = 0; i < n; i++) {
          stringsBoard[i] = stringsBoard[i].join(''); // 将每一行拼成字符串
        }
        res.push(stringsBoard); // 推入res数组
        return;
      }
      for (let col = 0; col < n; col++) { // 枚举出所有选择
        if (isValid(row, col)) {          // 剪掉无效的选择
          board[row][col] = "Q";          // 作出选择，放置皇后
          helper(row + 1);                // 继续选择，往下递归
          board[row][col] = '.';          // 撤销当前选择
        }
      }
    };
    
    helper(0);  // 从第0行开始放置
    return res;
  };

 
//https://github.com/liuyingbin19222/algorithm024/tree/main/Week_08