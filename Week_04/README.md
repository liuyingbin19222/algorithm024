<!--
 * @Author: your name
 * @Date: 2021-02-01 23:17:41
 * @LastEditTime: 2021-02-20 09:54:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \algorithm024\Week_04\README.md
-->
学习笔记
#### 搜索方式

- dfs：
```
def dfs(node):
    if node in visited:
    return;
    visited.add(node);

    dfs(node.left);
    dfs(node.right);
```
上述是dfs 的代码模板 ; 
dfs 首先是在visited 数组中判断节点是否存在,存在的情况 ， 需要return 出去; 不存在的情况，需要使用递归;

 BFS 的代码模板是:

```
// 使用队列进行实现;
const bfs = (root) => {
    let result = [];
    let queue = [root];
    
    while(queue.length > 0) {
        let level = [];
        let n = queue.length;
        for (let i = 0 ;i < n;i++){
            let node = queue.pop();
            level.push(node.val);
        }
        if(node.left) queue.unshift(node.left)
        if(node.right) queue.unshift(node.right)
    }
    
    result.push(level);
    return result;
}
```

- 二分查找

二分查找的前提是:

目标函数单调性;存在上下界;能够通过索引访问(index accessible);

二分查找的代码模板:
```
let left = 0, right = len(array) - 1
while (left <= right) {  
    let mid = (left + right) >> 1  
    if (array[mid] === target) { 
        /*find the target*/; 
        return 
    }  else if (array[mid] < target) 
        left = mid + 1
     else 
        right = mid - 1
    }
```

二分查找的递归写法:
```
public static int binarySearch(int[] nums,int target,int left, int right) { 
    if (left <= right) {
        int mid = left + ((right - left) >> 1);
        if (nums[mid] == target) {
            //查找成功
            return  mid;
        }else if (nums[mid] > target) {
            //新的区间,左半区间
            return binarySearch(nums,target,left,mid-1);
        }else if (nums[mid] < target) {
            //新的区间，右半区间
            return binarySearch(nums,target,mid+1,right);
        }
    }
    //不存在返回-1
    return -1;
}
```



需要形成肌肉式记忆 , 注意left <= right , 多数情况下;
写的要非常熟练;

四步做题法:  所有的解题方法，找到时间复杂度 、 空间复杂度最好的情况;


二分查找的变式非常的多 ，下面的帖子是关于变式的汇总:
https://leetcode-cn.com/problems/search-a-2d-matrix/solution/yi-wen-dai-ni-gao-ding-duo-ge-er-fen-cha-2hl9/


问题：使用二分查找，寻找一个半有序数组 [4, 5, 6, 7, 0, 1, 2] 中间无序的地方

解法: 通过二分查找的手段，比较nums[0] 和 nums[nums.length - 1] 两个数的大小 ，可以进而判断无序的点的位置;

```
var findIndex = (arr) => {
    let left = 0;
    let right = arr.length - 1;
    while(left <= right){
        let mid = left + ((right - left) >> 1);
        if( arr[mid] <= arr[0] || arr[mid] >= arr[right]) {
            console.log(mid);
            return mid;
        }else if(arr[mid] > arr[0]) {
            mid = left + 1;// 向左偏移;
        }else {
            right = mid - 1;
        }
    }
    // console.log('mid' , mid);
    return -1;
}
```




