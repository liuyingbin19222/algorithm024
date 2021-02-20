/*
 * @Author: your name
 * @Date: 2021-02-15 12:00:44
 * @LastEditTime: 2021-02-20 18:59:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \algorithm024\Week_04\week04.js
 */


/**
 * 二叉树的层次遍历:
 * 使用 bfs , dfs 进行实现;
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal/solution/yan-du-you-xian-sou-suo-by-shetia/
 */
// 使用 dfs 进行遍历的时候需要记住层数;
let levelOrder = (root) => {
    if(!root) return [];
    let res = [];
    dfs(root , 0 , res);
    return res;
}

const dfs  = (root , step , res) => {
    if(root) {
        if(!res[step]) res[step] = [];
        res[step].push(root.val);
        dfs(root.left, step + 1 , res);
        dfs(root.right, step + 1  ,res);
    }
}

// 使用bfs 进行遍历;
var levelOrder1 = function(root) {
    if(!root) return [];
    const queue = [root];
    const res = [];
    let level = 0;

    while(queue.length){
        res[level] = [];
        let levelNum = queue.length;
        while(levelNum--){
            const front = queue.shift();   // 取出第一个元素;
            res[level].push(front.val);
            if(front.left) queue.push(front.left);
            if(front.right) queue.push(front.right);
        }
        level++;
    }
    return res;
};


 /**
  * https://leetcode-cn.com/problems/find-largest-value-in-each-tree-row/
  * 在每个树行中找最大值;
  */

 var largestValues = function (root) {
    // 边界处理
    if (!root) return []
    // 变量定义
    const res = [], queue = [root]
    while (queue.length) {
        const curLevLen = queue.length; // 当前层可遍历次数
        let curMax = Number.MIN_SAFE_INTEGER;// 只追求那岁月静好...
        for (let i = 0; i < curLevLen; i++) {
            // 依次出队 当前层节点node
            const node = queue.shift()
            curMax = Math.max(curMax, node.val)
            // 若有子节点则入队
            node.left  && queue.push(node.left)
            node.right && queue.push(node.right)
        }
        res.push(curMax)
    }
    return res
}

// 以下是默写的代码;
const bfs = (root) => {
    if(!root) return;
    let res = [];
    let queue = [root];
    while(queue.length) {
        let len = queue.length; // 作为for 循环的终止条件;
        
        for (let i = 0; i < len; i++) {
            let node = queue.shift();
            // 以下是业务处理的代码;
            curMax = Math.max(Number.MIN_SAFE_INTEGER , node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        res.push(curMax);
    }
    return res;
}

/**
 * 柠檬水找零问题
 * https://leetcode-cn.com/problems/lemonade-change/
 * 解法是直接求解;
 */

 /**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
    let five = 0;
    let ten  = 0;
    for (let i in bills){
        if(bills[i] === 5) {
            five++;
        }else if(bills[i] === 10) {
            if(five >= 1) {
                five--;
                ten++;
            }else {
                return false
            }
        }else if(bills[i] === 20){
            if(ten > 0 && five > 0) {
                ten--;
                five--;              
            }else if(five >= 3) {
                five = five - 3;
            }else {
                return false;
            }
        }
    }
    return true;
};

/**
 * 买卖股票的最佳时机;
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/description/
 * 解法就是差是正的时候直接相加求解即可;
 */

function maxProfit(prices) {
    /**
     * 单层for循环遍历，只要遇到差价高的情况，就加操作;
     */
  let profit = 0;    // 收益
  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1]; // 今天和昨天的差价
    if (diff > 0) {			   // 差价大于0
      profit += diff;			   // 今天卖掉，赚了今天和昨天的差价
    }
  }
  return profit;
}

 /**
  * 圣诞节发饼干问题:
  * https://leetcode-cn.com/problems/assign-cookies/
  * 这里处理的关键是for 循环中 && 的实现;
  */
 var findContentChildren = function(g, s) {
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);
    const numOfChildren = g.length, numOfCookies = s.length;
    let count = 0;
    for (let i = 0, j = 0; i < numOfChildren && j < numOfCookies; i++, j++) {
        while (j < numOfCookies && g[i] > s[j]) {
            j++;
        }
        if (j < numOfCookies) {
            count++;
        }
    }
    return count;
};


/**
 * 机器人行走问题；
 * https://leetcode-cn.com/problems/walking-robot-simulation/
 * 这种题比较烦了
 */
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var robotSim = function(commands, obstacles) {
    // 构建障碍缓存（雷达图），根据移动特性，我们根据x,y轴值分别进行缓存
  const obsCacheByX = new Map(); // x轴方向上的障碍坐标
  const obsCacheByY = new Map(); // y轴方向上的障碍坐标
  obstacles.forEach(o => {
    obsCacheByX.has(o[0]) ? obsCacheByX.get(o[0]).push(o[1]) : obsCacheByX.set(o[0], [o[1]]);
    obsCacheByY.has(o[1]) ? obsCacheByY.get(o[1]).push(o[0]) : obsCacheByY.set(o[1], [o[0]]);
  });
  const obsCaches = [obsCacheByX, obsCacheByY];
  // 移动方向集合分别代表上，右，下，左，其中[a,b]，a是移动轴坐标索引，b是移动方向
  const heads = [[1, 1], [0, 1], [1, -1], [0, -1]]; // n, e, s, w; [x|y, +|-]
  const coord = [0, 0, 0]; // x, y, head，坐标信息，包括x, y，以及当前移动方向索引
  let max = 0;
  let right = 0; // 记录向右转的次数，负数代表向左转
  // 移动函数
  const go = function (c) {
    if (right !== 0) { // 移动之前，检测是否需要转向
      // 设置方向索引
      // 因为每一次向右转其实就是当前索引+1，超过之后就%4，因为原地转4次就是复位
      // 而一次向左转可以理解成向右转三次，结合一起有：
      coord[2] = (coord[2] + (right < 0 ? 3 * -right : right)) % 4;
      // 执行转向后，将转向指令清零
      right = 0;
    }
    // 获取当前方向设定
    const head = heads[coord[2]];
    // 移动轴索引
    const moveAxis = head[0];
    // 固定轴索引，因为每次只会朝单一方向移动，因此不是x轴就是y轴，因此：
    const standAxis = (moveAxis + 1) % 2;
    // 计算无障碍时的预期终点
    let end = coord[moveAxis] + c * head[1];
    // 从缓存中找出当前移动方向轴上的障碍坐标
    const obVals = obsCaches[standAxis].get(coord[standAxis]) || [];
    // 碰撞可能性检测（雷达在此）
    //  有效障碍需要满足介于end与当前出发点之前，这里有两种情况:
    //           end <---- o ----- coord ---- o ------> end
    //  head[1]            -1        |        +1
    //  可以归纳出：
    //  (head[1] === 1 && coord[moveAxis] < o && end >= o) ||
    //  (head[1] === -1 && coord[moveAxis] > o && end <= o)
    //  约简为：
    //  const detector = head[1] === 1 ? Math.max : Math.min;
    //  const coordRef = coord[moveAxis] + head[1]; // 这里是为了让detector能区分非等情况
    //  detector(coordRef, o) === o && detector(o, end) === end
    const detector = head[1] === 1 ? Math.max : Math.min;
    const coordRef = coord[moveAxis] + head[1];
    obVals.forEach(o => {
      if (detector(coordRef, o) === o && detector(o, end) === end) {
        // 满足条件时，将当前终点坐标设置在障碍之前
        end = o - head[1];
      }
    });
    // 设置坐标终点
    coord[moveAxis] = end;
    // 求当前坐标距离原点(0,0)欧式距离的平方，并与之前的值比较，取其最大值
    max = Math.max(max, coord[0] * coord[0] + coord[1] * coord[1]);
  }
  commands.forEach(c => {
    if (c >= 0) {
      // 接收到步长时，开始移动机器人
      go(c);
    } else {
      // 转向可以先记录（有时候若干相邻的转向指令可以相互抵消）
      right += (c === -1 ? 1 : -1);
    }
  });
  return max;
};

/**
 * 单词接龙问题;
 * https://leetcode-cn.com/problems/word-ladder/description/
 * 这道题是困难的，没有做出来，借鉴了别人的代码; 
 */
const ladderLength = (beginWord, endWord, wordList) => {
    const wordSet = new Set(wordList);
    const queue = [];
    queue.push([beginWord, 1]);
  
    while (queue.length) {
      const [word, level] = queue.shift();  // 当前出列的单词
      if (word == endWord) {
        return level;
      }
      for (let i = 0; i < word.length; i++) { // 遍历当前单词的所有字符
        for (let c = 97; c <= 122; c++) { // 对应26个字母
          const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1); // 形成新词
          if (wordSet.has(newWord)) { // 单词表里有这个新词
            queue.push([newWord, level + 1]); // 作为下一层的词入列
            wordSet.delete(newWord);  // 避免该词重复入列
          }
        }
      }
    }
    return 0; // bfs结束，始终没有遇到终点
  };
  
/**
 * 岛屿数量问题
 * 
 */
/**
 * @param {character[][]} grid
 * @return {number}
 * https://leetcode-cn.com/problems/number-of-islands/
 * 求解方式: 是使用dfs 递归的方式进行求解;
 */
// 使用递归进行判断;
const dfs = (grid , i , j ,  rows, cols) => {
    if(i > rows - 1 || j > cols - 1 || i < 0 || j < 0 || grid[i][j] === '0') {
        return ;
    }
    grid[i][j] = '0';
    dfs(grid , i + 1 , j, rows, cols);
    dfs(grid , i , j + 1 , rows , cols);
    dfs(grid , i - 1 , j , rows , cols);
    dfs(grid , i , j - 1 , rows , cols);
}

var numIslands = function(grid) {
    // 对二维数组处理的模板;
    let res = 0;
    let rows = grid.length;
    let cols = grid[0].length;
    if(rows === 0) return 0;
    for (let i = 0;i < rows;i++){
        for (let j = 0;j < cols;j++){
            if(grid[i][j] === '1'){
                dfs(grid , i , j , rows, cols);
                res++;
            }
        }
    }
    return res;
};

/**
 * https://leetcode-cn.com/problems/jump-game/
 * 跳跃游戏;
 * reach 每一次取最大值进行实现;
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    if(nums.length === 0) return false;
    let reach = nums[0];
    for (let i = 0; i < nums.length;i++){
        if(reach >= i) {
            reach = Math.max(reach , i + nums[i]);
        }
    }
    return reach >=  nums.length - 1;
};

/**
 * 旋转数组的判断;
 * https://leetcode-cn.com/problems/search-in-rotated-sorted-array/
 * 实现的方式是利用二分查找;
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // 边界判断;
    if(nums.length === 0) {
        return -1;
    }
    // 使用二分查找进行实现;
    let left = 0;
    let right = nums.length - 1;
    while(left <= right) {
        let mid = left +( ( right - left ) >> 1);
        // 判断部分排序;
        if(nums[mid] === target ) {
            return mid;
        }else if(nums[0] <= nums[mid]){
            if(nums[0] <= target && target <= nums[mid]){
                right = mid - 1; 
            }else {
                left = mid + 1;
            }
        }else {
            if(nums[mid] <= target && target <= nums[nums.length - 1]){
                left = mid + 1;
            }else{
                right = mid - 1;
            }
        }
    }
    return -1;
};

/**
 * 搜索二维矩阵
 * https://leetcode-cn.com/problems/search-a-2d-matrix/
 * 首先对数组进行扁平化处理;
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    // 将二维数组转换为一维数组 ， 不使用flat 方法;
    // O(mn) ;
    let arr = [];
    for (let i in matrix) {
        arr = arr.concat(matrix[i]);
    }
    const binarySearch = (arr , target) => {
        let left = 0;
        let right = arr.length - 1;
        while(left <= right) {
            let mid =  left + ((right - left ) >> 1);   //防止溢出;
            if(arr[mid] === target){
                return mid;
            }else if(arr[mid] <= target) {
                left = mid + 1;
            }else {
                right = mid - 1;
            }
        }
        return -1;
    }
    if(binarySearch(arr , target) !== -1) {
        return true;
    }else {
        return false;
    }
};

/**
 * 寻找旋转数组中的最小值;
 * @param {*} nums 
 */
var findMin = function(nums) {
    var left = 0;
    var right = nums.length - 1;
    while (left < right) {
        var mid = (left + right) >> 1;
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];// 左边的是最小的值;
};

/**
 * 单词接龙问题没有做出来;借鉴了别人的代码;
 * 
 */

const findLadders = (beginWord, endWord, wordList) => {
    const wordSet = new Set(wordList);
    wordSet.add(beginWord);               // 这个其实要不要都行
    if (!wordSet.has(endWord)) return []; // 单词表中没有终点词，无法变到终点词
  
    const levelMap = new Map();           // 存放图中的单词所在的层
    const wordMap = new Map();            // 存放图中的单词的邻接单词
    const visited = new Set();            // 记录访问过的节点
    const queue = [beginWord];            // 维护一个队列，初始放入起点词
    visited.add(beginWord);               // 入列即访问，存入visited
  
    let finished = false;             // 是否存在变化到终点词的路径
    let level = 0;             
    levelMap.set(beginWord, 0);       // 起始词的level为0
  
    while (queue.length) {            // 队列空了，所有邻接节点就遍历完了
      const levelSize = queue.length; // 当前level的单词个数
      level++;                        // 遍历当前层的单词，level+1
      for (let i = 0; i < levelSize; i++) { // 当前层的单词逐个出列考察
        const word = queue.shift();   // 当前出列的单词
  
        for (let i = 0; i < word.length; i++) {  // 遍历单词的所有字符
          for (let c = 97; c <= 122; c++) {      // 遍历26个字母字符
            const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
            if (!wordSet.has(newWord)) continue; // 不是单词表中的单词就忽略
            if (wordMap.has(newWord))            // 已经存在于wordMap
              wordMap.get(newWord).push(word);   // 对应的数组推入出列的单词
            else                                 // 初始化一个数组
              wordMap.set(newWord, [word]);      // 并放入“父单词”
  
            if (visited.has(newWord)) continue; // 该新单词已经访问过就忽略
            if (newWord == endWord)             // 遇到了终点词
              finished = true;                  // 存在抵达终点词的路径
  
            levelMap.set(newWord, level);       // 记录这个单词的level
            queue.push(newWord);                // 该新单词是下一层的，入列
            visited.add(newWord);               // 入列即访问，记录一下
          }
        }
      }
    }
    if (!finished) return []; // 无法到达终点词，返回[]
  
    const res = [];
    const dfs = (path, beginWord, word) => {
      if (word == beginWord) {          // 当前遍历的word，和起始词相同
        res.push([beginWord, ...path]); // 将当前路径推入res数组，加上起始词
        return;                        
      }
      path.unshift(word);        // 将当前单词加入到path数组的开头
      if (wordMap.get(word)) {   // 当前单词有对应的“父单词”们
        for (const parent of wordMap.get(word)) { // 遍历“父单词”们
          if (levelMap.get(parent) + 1 == levelMap.get(word)) { // 满足要求的
            dfs(path, beginWord, parent);                       // 递归dfs
          }
        }
      }
      path.shift(); // 回溯，撤销选择，将path数组开头的单词弹出
    }
    dfs([], beginWord, endWord); // dfs的入口
    return res;
  };

/**
 * 跳跃的最大距离:
 * https://leetcode-cn.com/problems/jump-game-ii/
 * 使用最大值进行求解;
 */

var jump = function(nums) {
    let curr = 0; // 当前位置
    let next = 0; // 跳跃后的位置
    let stepNum = 0; // 跳跃次数
    let length = nums.length - 1;
    for (let i = 0; i < length; i++) {
        next = Math.max(next, i + nums[i]); // 跳一次的最远跳跃距离 = 当前位置 + 可跳跃的最大数
        if (curr >= length) break;
        if (curr === i) {
            curr = next;
            stepNum ++;
        }
    }
    return stepNum;
};


  