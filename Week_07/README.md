学习笔记

- dfs && bfs 模板实现方式



bfs 代码的实现:
```
const bfs = (root) => {  
    let result = [], queue = [root]
    while (queue.length > 0) {    
        let level = [], n = queue.length    
        for (let i = 0; i < n; i++) {      
            let node = queue.pop()      
            level.push(node.val)       
            if (node.left) queue.unshift(node.left);    
            if (node.right) queue.unshift(node.right)    
        }    
        result.push(level)  
    }  
    return result
};
```


dfs 代码的实现:
```

const dfs = (root) => {
    if(root === null) {
        return;
    }
    show(root.val);
    dfs(root->left);
    dfs(root->right);
}
```

- 双向BFS:

双向BFS 的模板代码:

```

```


- 启发式搜索:

```
使用的是优先级队列；需要定义一个优先级函数，优先级函数的定义也是根据题意来的;
```








