<!--
 * @Author: your name
 * @Date: 2021-02-01 23:17:41
 * @LastEditTime: 2021-03-28 11:13:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \algorithm024\Week_08\README.md
-->
学习笔记

- 字典树:

主要是用来解决单词前缀的问题;


- 并查集：

主要是用来解决类似于朋友圈关系的问题;

分析微信好友问题;

代码模板:
// JavaScript
class unionFind {  
    constructor(n) {    
        this.count = n;    
        this.parent = new Array(n);    
        for (let i = 0; i < n; i++) {      
            this.parent[i] = i;    
            }  
        }  
        find(p) {    
            let root = p;    
            while (parent[root] !== root) {      
                root = parent[root];    
            }    // 压缩路径    
            while (parent[p] !== p) {      
                let x = p;      
                p = this.parent[p];      
                this.parent[x] = root;    
            }    
            return root;  
        }  union(p, q) {    
            let rootP = find(p);    
            let rootQ = find(q);    
            if (rootP === rootQ) return;    
            this.parent[rootP] = rootQ;    
            this.count--;  
        }
    }
- N皇后问题的解法:
    - 使用位运算的方法;
    - 使用通用的解法 ， 撇捺实现;