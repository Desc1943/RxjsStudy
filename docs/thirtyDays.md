# RxJs复习档
<h2>一个核心（Observable ），三个重点（Observer，Subject，Schedulers）</h2>
## 为何使用ReJs
  1. 针对分同步事件,非同步常見的問題
      * 竞态条件 (Race Condition)
        <p>每当我們对同一個资源同时做多次的非同步存取时，就可能发生 Race Condition 的问题。比如说我们发了一个 Request 更新使用者资源，然后我们又立即发送另一個 Request 取得使用者资料，这是第一个 Request 和第二个 Request 先后顺序就会影响到最终接收到的结果，这就是 Race Condition。</p>
      * 内存泄漏 (Memory Leak)
        <p>Memory Leak 是最常被大家忽略的一点。原因是在传统网站的行为，我们每次切换页面都是整页刷新，并重新执行 JavaScript，所以不太需要理会内存的问题！但是当我们希望将网站做得像应用程序时，这件事就变得很重要。例如做 SPA (Single Page Application) 网站时，我們是通过 JavaScript 来达到切换页面的内容，这时如果有对 DOM 订阅监听事件，而沒有在适当的时机将监听的事件移除，就有可能造成 Memory Leak。比如说在 A 页面监听 body 的 scroll 事件，但頁面切換時，沒有把 scroll 的监听事件移除。</p>
      * 复杂的状态 (Complex State)
        <p>当有非同步行为时，应用程序的状态就会变得非常的复杂！比如我们有一支付用户才能播放的影片，首先可能要抓取这部影片的资料，接着我们要在播放时验证用户是否有权限播放，而使用者也有可能在按下播放后又立即取消，而这些都是非同步执行的。这时就会有各种复杂的状态需要处理。</p>
      * 异常处理 (Exception Handling) 
        <p>JavaScript的 try/catch 可以捕捉同步的例外，但非同步的程序就没那么容易了。尤其当我们的非同步行为很复杂时，这个问题就愈加明显。</p>
  2. 各种不同的API，为统一API
      * DOM Events
      * XMLHttpRequest
      * fetch
      * WebSockets
      * Server Send Events
      * Service Worker
      * Node Stream
      * Timer
      
## 前置基础（函数式编程）
  1. 函数式编程（Functional Programming） 基本概念
      * 函数是一等公民
      * 函数能被赋值为变量
      * 函数能被当成参数
      * 函数能被当成返回值
      * 函数应该为纯函数，不应有副作用
      * 函数必须有返回值
      * 当传入值相同时，返回值也一定相同
  2. 函数式编程（Functional Programming） 优势
      * 可读性强
      * 可维护性强
      * 易于并行/平行处理
  3. 函数式编程（Functional Programming） 通用函数
      * ForEach
      * Map
      * Filter
      * ConcatAll
## 核心：Observable   
  1. 浅谈前置设计模式：迭代器模式（Iterator Pattern） 跟 观察者模式（Observer Pattern） 
  2. [创建Observable方法（Creation Operator）]()
      * create
      * of
      * from
      * fromEvent
      * fromPromise
      * never
      * empty
      * throw
      * interval
      * timer

## 重点（一）：Observer
  1. 观察者（Observer）的三个方法：
      * next：每當 Observable 发送出新的值，next 方法就会被呼叫。
      * complete：在 Observable 沒有其他的资料可以取得时，complete 方法就会被呼叫，在 complete 被呼叫之后，next 方法就不会再起作用。
      * error：每當 Observable 內發生錯誤時，error 方法就會被呼叫。
  2. Observer对象的调用：
      * 当作参数传入observable.subscribe()
      ```` javascript
      const observable = Rx.Observable
        .create(function(observer) {
          observer.next('Jerry');
          observer.complete();
        })
      	
      // 创建一个观察者(Observer) 拥有next, error, complete 三個方法
      const observer = {
        next: function(value) {
          console.log(value);
        },
        error: function(error) {
          console.log(error);
        },
        complete: function() {
          console.log('complete')
        }
      }
      
      // 用我们定义好的观察者，來订阅这个 observable	
      observable.subscribe(observer)
      ````   