<!--
 * @Author: your name
 * @Date: 2021-02-01 23:17:41
 * @LastEditTime: 2021-02-09 10:53:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \algorithm024\Week_02\README.md
-->
学习笔记

#### 学习该课的范式

有时间就看课程，坚持每日一题，上面的两步都是为了做题，做完题之后，看
最优解，使用js  实现，并已leetcode形式记录在github上


### 做笔试题的习惯

首先是利用四步法来实现，第一步:classifcation , 确认题目的要求，这时候要和面试官确认
疑问的地方， 第二点是possible solution , 并从中找到最优解；第三点是写代码 ， 最后一步是
test cases;

#### 好的代码记录

https://leetcode-cn.com/problems/fizz-buzz/

```
public class Solution {
    public List<String> fizzBuzz(int n) {
        List<String> ret = new ArrayList<String>(n);
        for(int i=1,fizz=0,buzz=0;i<=n ;i++){
            fizz++;
            buzz++;
            if(fizz==3 && buzz==5){
                ret.add("FizzBuzz");
                fizz=0;
                buzz=0;
            }else if(fizz==3){
                ret.add("Fizz");
                fizz=0;
            }else if(buzz==5){
                ret.add("Buzz");
                buzz=0;
            }else{
                ret.add(String.valueOf(i));
            }
        } 
        return ret;
    }
}
```
- 大根堆的js代码实现:
写这一部分的目的是遇到基本的数据结构实现的时候，背下来代码，直接进行实现即可:
https://shimo.im/docs/Lw86vJzOGOMpWZz2/read


```
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
```

上面是大根堆的js 实现代码 ， 背下来;

- 分治求解的基本步骤:
1.terminator , 2: process , 3. drill down (subproblem) 4: merge (合并子问题) 5: reverse state 
pow(x,n) 的求法是 拆分为subproblem  , 2 ^ 10 ---> 2 ^ 5 * 2^ 5 , 2 ^ 5 -> 2 * 2^2  , 时间复杂度可以
优化为O(logn); 这里还需要判断是否是奇数 还是偶数 ， 因为奇数的情况需要在乘一个2来达到最终的结果;






