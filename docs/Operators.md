# Operator

Observable 有许多创建实例的方法，称为 creation operator。

下面列出 RxJS 常用的 creation operator：
* [create](#create)
* [of](#of)
* [from](#from)
* [fromPromise](#fromPromise)
## [create](#Operator)
需要next()一步步发出请求。
```` javascript
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
````
