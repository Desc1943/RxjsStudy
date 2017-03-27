#Creation Operator 

Observable 有许多创建实例的方法，称为 。

下面列出 RxJS 常用的 ：
* [create](#create)
* [of](#of)
* [from](#from)
* [fromPromise](#fromPromise)
* [fromEvent](#fromEvent)
* [fromEventPattern](#fromEventPattern)
* [never](#never)
* [empty](#empty)
* [throw](#throw)
* [interval](#interval)
* [timer](#timer)
* [unsubscribe](#unsubscribe )(用来取消订购)
## [create](#)
需要next()一步步发出请求。
```javascript
const observable = Observable
  .create( observer => {
    observer.next('Jerry');
    observer.next('Anna');
    observer.complete();
  })
  .subscribe({
    next: value => {
      console.log(value);
    },
    complete: () => {
      console.log('complete');
    },
    error: error => {
      console.log(error);
    }
  });
// Jerry
// Anna
// complete
```
## [of](#)
如果同步传递多个值，可以使用 `of` 简化操作。
```javascript
const observable = Observable
  .of('Jerry', 'Anna')
  .subscribe({
    next: value => {
      console.log(value);
    },
    complete: () => {
      console.log('complete');
    },
    error: error => {
      console.log(error);
    }
  });
// Jerry
// Anna
// complete
```
## [from](#)
同 `of` ，但接收一个**可枚举**对象或**字符串**对象。
```javascript
const observable = Observable
  .from(['Jerry', 'Anna']) // 同 .of(...['Jerry', 'Anna'])
  .subscribe({
    next: value => {
      console.log(value);
    },
    complete: () => {
      console.log('complete');
    },
    error: error => {
      console.log(error);
    }
  });
// Jerry
// Anna
// complete
```
## [fromPromise](#)
`fromPromise` 与 `from` 而且还能接收一个Promise对象。
```javascript
const observable = Observable
  .fromPromise(new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello RxJs!');
    },1000);
  }))   
  .subscribe({
    next: value => {
      console.log(value);
    },
    complete: () => {
      console.log('complete');
    },
    error: error => {
      console.log(error);
    }
  });
// Hello RxJS!
// complete
```
## [fromEvent](#)
通过Event建立Observable.
```javascript
const observable = Observable
  .fromEvent(document.body, 'click')
  .subscribe({
    next: value => {
      console.log(value);
    },
    complete: () => {
      console.log('complete');
    },
    error: error => {
      console.log(error);
    }
  });
// MouseEvent {...}
```
## [fromEventPattern](#)
这个方法是个类事件使用。所谓的类事件就是指其行为跟事件相像，同时具有注册监听及移除监听两种行为，就像 DOM Event 有 addEventListener 及 removeEventListener 一样！
```javascript
class Producer {
  constructor() {
    this.listeners = [];
  }
  addListener(listener) {
    if(typeof listener === 'function') {
      this.listeners.push(listener);
    } else {
      throw new Error('listener  必须为 function');
    }
  }
  removeListener(listener) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  }
  notify(message) {
    this.listeners.forEach(listener => {
      listener(message);
    });
  }
}

const eggHead = new Producer();

const observable = Observable
  .fromEventPattern(
    (handler) => eggHead.addListener(handler),
    (handler) => eggHead.removeListener(handler)
  )
  .subscribe({
    next: value => {
      console.log(value);
    },
    complete: () => {
      console.log('complete');
    },
    error: error => {
      console.log(error);
    }
  });

eggHead.notify('Hello! Can you hear me?');
// Hello! Can you hear me?
```
> 这里需要注意！不要将方法直接导入，避免this指针出错！也可以通过 `bind` 来改写 `this`。
```javascript
const observable = Observable
  .fromEventPattern(
    eggHead.addListener.bind(eggHead),
    eggHead.removeListener.bind(eggHead)(handler)
  )
```
## [empty](#)
`Observable` 进入 `complete` ！
```javascript
const observable = Observable
  .empty()
  .subscribe({
    next: value => {
      console.log(value);
    },
    complete: () => {
      console.log('complete');
    },
    error: error => {
      console.log(error);
    }
  });
// complete
```
## [never](#)
`Observable` 处于永久的等待状态，没有明确的时间！
```javascript
const observable = Observable
  .never()
  .subscribe({
    next: value => {
      console.log(value);
    },
    complete: () => {
      console.log('complete');
    },
    error: error => {
      console.log(error);
    }
  });
```
## [throw](#)
`Observable` 抛出错误，进入 `error` 状态!
```javascript
const observable = Observable
  .throw('抛出错误！')
  .subscribe({
    next: value => {
      console.log(value);
    },
    complete: () => {
      console.log('complete');
    },
    error: error => {
      console.log(error);
    }
  });
// 抛出错误！ 
```
## [interval](#)
如同 JavaScript 的 `setInterval` 建立一个持续的行为！接收一个 `ms`计量单位的数值！
```javascript
const observable = Observable
  .interval(1000)
  .subscribe({
    next: value => {
      console.log(value);
    },
    complete: () => {
      console.log('complete');
    },
    error: error => {
      console.log(error);
    }
  });
// 0
// 1
// 2
// ...
```
## [timer](#)
如同 JavaScript 的 `setInterval` 建立一个持续的行为！接收一个 `ms`计量单位的数值！
> timer 第一个参数除了可以是数值（Number）之外，也可以是日期(Date)，它会等到指定的时间再发送第一个值。
```javascript
const observable = Observable
  .timer(1000, 3000)
  .subscribe({
    next: value => {
      console.log(value);
    },
    complete: () => {
      console.log('complete');
    },
    error: error => {
      console.log(error);
    }
  });
// 0  （通过第一个参数的时间发出）
// 1  （之后都通过第二个参数的时间发出）
// 2
// ...
```
## [unsubscribe](#)
订阅 `Observable` 之后就会回传一个物件，这个物件就是用来取消订阅的。
> 一般我们不会使用它，而是使用 `takeUntil`
```javascript
const observable = Observable
  .interval(1000)
  .subscribe({
    next: value => {
      console.log(value);
    },
    complete: () => {
      console.log('complete');
    },
    error: error => {
      console.log(error);
    }
  });
setTimeout(() => {
  observable.unsubscribe();
}, 2000);
// 0 
// 1
```
