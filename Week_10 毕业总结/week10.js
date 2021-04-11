/*
 * @Author: yingbin
 * @Date: 2021-04-11 22:12:34
 * @LastEditTime: 2021-04-11 22:21:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \algorithm024\Week_10 毕业总结\week10.js
 */


/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    let tmin = Infinity
    for (let i = 0; i < 26; i++){
        let char = String.fromCharCode(i + 97)
        let firstIndex = s.indexOf(char)
        let lastIndex = s.lastIndexOf(char)
        if (firstIndex > -1 && lastIndex == firstIndex){
            tmin = Math.min(tmin, firstIndex)
        } 
    }
    return tmin == Infinity ? -1 : tmin
};

/**
 * 反转字符串;
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {
    if(k == 1) return s
    let result = ''
    let temp = ''
    let dobulek = 2 * k;
    for (let i = 0; i < s.length; i++) { 
        const element = s[i];
        let kyu = i % dobulek
        if(kyu == 0){
            result += temp  
            temp = ''
        }
        if(kyu < k){ // 利用余数进行判断;
            temp = element + temp
        }else {
            temp =  temp + element 
        } 
    }

    return result + temp
};

/**
 * 翻转字符串里的单词;
 */

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    let r = s.length - 1, l = r, res = "";
   while (l >= 0) {
       while (s[r] === " ") {
           r--;
       }
       l = r;
       if (l >= 0 && res) {
           res += " ";
       }
       while (s[l] && s[l] !== " ") {
           l--;
       }
       for (let i = l + 1, j = r; i <= j; i++) {
           res += s[i];
       }
       r = l;
   }
   return res;
};

 /**
  * 翻转字符串中的单词;
  */

 /**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    let arr = s.split("");
    let l = 0, r = l;
    while (l < arr.length) {
        //先找到空格
        while (arr[r] && arr[r] !== " ") {
            r++;
        }

        //反转单词
        for (let i = l, j = r - 1; i < j; i++, j--) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        //跳到下一个单词
        l = r + 1;
        r = l;
    }
    return arr.join("");
};

/**
 * 仅仅反转字母; 
 */

var reverseOnlyLetters = function(S) {
    let i = 0,j = S.length-1,str1='',str2='';
    while(i<=j){
        if((S[i]<'a'||S[i]>'z')&&(S[i]<'A'||S[i]>'Z')){
            str1+=S[i]
            i++;
            continue;
        }
         if((S[j]<'a'||S[j]>'z')&&(S[j]<'A'||S[j]>'Z')){
            str2=S[j]+str2
            j--;
            continue;
        }
        str1 = str1+S[j--];
        if(i<j)  str2 = S[i++]+str2;
      
    }
    return str1+str2
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
 * 验证回文字符串;
 */
 

/**
 * @param {string} s
 * @return {boolean}
 */

function isPali (str, l, r) {
    while (l < r) {            
      if (str[l] != str[r]) {
        return false;
      }
      l++;
      r--;
    }
    return true; 
  }
  
  
  var validPalindrome = function(s) {
      let l = 0;
      let r = s.length - 1;
  
      while(l < r) {
          if(s[l] != s[r]) {
              return isPali(s , l + 1 , r) || isPali(s , l , r - 1);
          }
          l++;
          r--;
      }
      return true;
  };


