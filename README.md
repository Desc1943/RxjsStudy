# RxjsStudy
## 专业术语
1. FRP(Functional Reactive Programming):RxJS是 Functional Programming 跟 Reactive Programming;
2. FP(Functional Programming):函数式编程
## 简介
* [何为RxJS【一】](https://segmentfault.com/a/1190000007553779)
* [何为RxJS【二】](https://segmentfault.com/a/1190000004293922)
* [白话RxJS](https://zhuanlan.zhihu.com/p/24451002)
* [怎么理解rxjs](https://www.zhihu.com/question/48615787/answer/142414744)
* [Rx中的subject和scheduler怎么理解概念？](https://www.zhihu.com/question/54027469/answer/141217783)
## 案例demo
* [Hello RxJS](https://zhuanlan.zhihu.com/p/23331432)
* [做一个 github 小应用](https://segmentfault.com/a/1190000007562818)
## 进阶
* [30 天精通 RxJS](http://ithelp.ithome.com.tw/articles/10189028)
* [10个需要知道的RxJS函数与示例](http://www.html5in.com/10-need-to-know-rxjs-functions-with-examples/)

## 30天学会Rxjs

### 第五天：[建立 Observable(一)](http://ithelp.ithome.com.tw/articles/10187005)
  * **Observable 是 RxJS 的核心**，讲解 `Observable` 的实例，用到了 `create` 的方法，但大部分的內容还是在讲 `Observable` 几个重要的概念，如下
    * `Observable` 可以同时处理同步跟非同步行为
    * `Observer` 是一个物件，这个物件具有三个方法，分别是 `next`, `error`, `complete`
    * 订阅一個 `Observable` 就像在执行一个 `function`
### 第六天：[建立 Observable(二)](http://ithelp.ithome.com.tw/articles/10187043)
  * 通常我們會透過 creation operator 來建立 Observable 實例，這篇文章會講解幾個較為常用的 operator ！
    1. create
    2. of
    3. from 
    4. fromEvent 
    5. fromPromise   
    6. never   
    7. empty   
    8. throw   
    9. interval  
    10. timer 
### 第七天：[Observable Operators & Marble Diagrams](http://ithelp.ithome.com.tw/articles/10187248) 
  * Observable 的 Operators 是實務應用上最重要的部份，我們需要了解各種 Operators 的使用方式，才能輕鬆實作各種需求！
    1. 什麼是 Operators
        * 如何建立 operator
    2. Marble diagrams
    3. Operators
        * map
        * mapTo
        * filter
### 第八天：[简单拖拉案例 - take, first, takeUntil, concatAll](http://ithelp.ithome.com.tw/articles/10187333)         
  * 四个 `operators` 分別是 `take`, `first`, `takeUntil`, `concatAll`，并且完成了一個简单的拖拉功能.
### 第九天：[ Observable Operator - skip, takeLast, last, concat, startWith, merge](http://ithelp.ithome.com.tw/articles/10187520)         
  * 六個 operators 都是平時很容易用到  `skip`, `takeLast`, `last`, `concat`, `startWith`, `merge`
### 第十天：[ Observable Operator - combineLatest, withLatestFrom, zip](http://ithelp.ithome.com.tw/articles/10187638)         
  * 三個合併用的 operators，這三個 operators 的 callback 都會依照合併的 observable 數量來傳入參數，如果我們合併了三個 observable，callback 就會有三個參數，而不管合併幾個 observable 都會只會回傳一個值。
### 第十一天：[實務範例 - 完整拖拉應用](http://ithelp.ithome.com.tw/articles/10187756)         