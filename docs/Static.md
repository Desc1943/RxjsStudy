## [Public Static](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)
| Method | Parameter  | Return |
|----------|----------|----------|
|[bindCallback](#bindcallback)|__func__: function,<br/> __selector__: function,<br/> __scheduler__: Scheduler|function(...params: *): Observable|
|[bindNodeCallback](#bindnodecallback)|__func__: function,<br/> __selector__: function,<br/> __scheduler__: Scheduler|function(...params: *): Observable|
|[combineLatest](#combinelatest)|__observable1__: ObservableInput,<br/> __observable2__: ObservableInput,<br/> __project__: function,<br/> __scheduler__: Scheduler|Observable|
|[concat](#concat)|__input1__: ObservableInput,<br/> __input2__: ObservableInput,<br/> __scheduler__: Scheduler|Observable|
|[create](#create)|__onSubscription__: function(observer: Observer): TeardownLogic|Observable|
|[defer](#defer)|__observableFactory__: function(): SubscribableOrPromise|Observable|		
|[empty](#empty)|__scheduler__: Scheduler|Observable|		
|forkJoin|__sources__: *|any|		
|[from](#from)|__ish__: ObservableInput<T>,<br/> __scheduler__: Scheduler|Observable<T>|	
|[fromEvent](#fromevent)|__target__: EventTargetLike,<br/> __eventName__: string,<br/> __options__: EventListenerOptions,<br/> __selector__: SelectorMethodSignature<T>|Observable<T>|	
|[fromEventPattern](#fromeventpattern)|__addHandler__: function(handler: Function): any,<br/> __removeHandler__: function(handler: Function, signal?: any): void,<br/> __selector__: function(...args: any): T|Observable<T>|
|[fromPromise](#frompromise)|__promise__: Promise<T>,<br/> __scheduler__: Scheduler|Observable<T>|	
|[interval](#interval)|__period__: number,<br/> __scheduler__: Scheduler|Observable|	
|[merge](#merge)|__observables__: ...ObservableInput,<br/> __concurrent__: number,<br/> __scheduler__: Scheduler|Observable|	
|[never](#never)|()|Observable|	
|[of](#of)|__values__: ...T,<br/> __scheduler__: Scheduler|Observable<T>|	
|[range](#range)|__start__: number,<br/> __count__: number,<br/> __scheduler__: Scheduler|Observable|	
|[throw](#throw)|__error__: any,<br/> __scheduler__: Scheduler|Observable|	
|[timer](#timer)|__initialDelay__: number/Date,<br/> __period__: number,<br/> __scheduler__: Scheduler|Observable|
|[webSocket](#websocket)|__urlConfigOrSource__: string/WebSocketSubjectConfig|WebSocketSubject|	
|[zip](#zip)|__observables__: *|Observable<R>|

### [bindCallback](#)
绑定一个方法，返回一个`callback`。
```javascript
function someFunction(value) {
  console.log(value);
}
const source = Observable.bindCallback(someFunction)('next');
// next
```
> See: [bindNodeCallback](#bindnodecallback), [from](#from), [fromPromise](#frompromise)

### [bindNodeCallback](#)
就像bindCallback一样，但是回调返回是回调类型（error, result）
> 将Node.js样式的回调API转换为返回Observable的函数
```javascript
function someFunction(value) {
  console.log(value);
}
const source = Observable.bindNodeCallback(someFunction)('next');
// next
```
> See: [bindCallback](#bindcallback), [from](#from), [fromPromise](#frompromise)

### [combineLatest](#)
组合多个Observables创建一个Observable，其值根据每个输入Observable的最新值计算。
> 每当任何输入Observable发出值时，它将使用所有输入中的最新值计算公式，然后发出该公式的输出。
```javascript
const source = Observable.combineLatest(
  Observable.interval(200),
  Observable.timer(400, 200)
  );
// [1,0] // [2,0] // [2,1] // [3,1] // [3,2]
```
> 此时 Marble diagrams:
```
Obs1:   --0--1--2--3--4-...
Obs2:   ----0--1--2--3-...
        combineLatest(Obs1, Obs2)
source: ----([1,0])--([2,0])--([2,1])--([3,1])--([3,2])-...
```
> See: [combineAll](#combineall), [merge](#merge), [withLatestFrom](#withLatestfrom)

### [concat](#)
创建一个输出Observable，它依次从给定的Observable中发出所有的值，然后进入下一个。
> 非并行（并行：merge）
```javascript
const source = Observable.concat(
  Observable.interval(100).take(2),
  Observable.interval(200).take(3)
  );
// 0 // 1 // 0 // 1 // 2 
```
> 此时 Marble diagrams:
```
Obs1:   -0-1|
Obs2:   --0--1--2|
        concat(Obs1, Obs2)
source: -0-1--0--1--2|
```
> See: [concatAll](#concatall), [concatMap](#concatmap), [concatMapTo](#concatmapto)

### [create](#)
创建一个新的Observable，当Observer订阅它时，它将执行指定的函数。
> 拥有一个 `callback(Observer)` Observer拥有 `next, error, complete`
```javascript
const source = Observable.create(function (observer) {
  observer.next('next');
  observer.complete('complete');
});
// next // complete
```
> See: [empty](#empty), [never](#never), [of](#of), [throw](#throw)

### [defer](#)
只有当它被订阅时，创建 Observable lazily 。
> 返回一个 Observable 对象
```javascript
const source = Observable.defer(function () {
  if (Math.random() > 0.5) {
    return Observable.fromEvent(document, 'click');
  } else {
    return Observable.interval(1000);
  }
});
```
> See: [create](#create)

### [empty](#)
创建一个Observable，不会发送任何数据，并立即发出 `complete` 的通知。
```javascript
const source = Observable.empty().startWith('over');
// over // complete
```
> See: [create](#create), [never](#never), [of](#of), [throw](#throw)

### [from](#)
从Array创建一个Observable，一个类似Array的对象，一个Promise，一个可迭代对象或一个Observable类对象。
> 几乎任何东西都可以转换成Observable。
```javascript
const source = Observable.from([1,2,3]);
// 1 // 2 // 3
```
> See: [create](#create), [fromEvent](#fromevent), [fromEventPattern](#fromeventpattern), [fromPromise](#frompromise)

### [fromEvent](#)
创建一个Observable，发出来自给定事件目标的特定类型的事件。
> 非并行（并行：merge）
```javascript
const source = Observable.zip(
  Observable.interval(1000),
  Observable.fromEvent(document, 'click'),
  (x,y) =>  [x,y]
);
// Event 
```
> 此时 Marble diagrams:
```
Obs1:   -0-1-2-3-4|
Obs2:   --c---c|
        zip(Obs1, Obs2, (x,y) => [x,y])
source: --[0,e]---[1,e]|
```
> See: [from](#from), [fromEventPattern](#fromeventpattern)

### [fromEventPattern](#)
基于addHandler / removeHandler函数从API创建一个Observable。
```javascript
function addClickHandler(handler) {
  document.addEventListener('click', handler);
}
function removeClickHandler(handler) {
  document.removeEventListener('click', handler);
}
Observable.fromEventPattern(
  addClickHandler,
  removeClickHandler
);
```
> See: [from](#from), [fromEvent](#fromevent)

### [fromPromise](#)
将 Promise 转换为 Observable.
> 返回一个Observable，发出Promise解析的值，然后完成。
```javascript
Observable.fromPromise(fetch('http://myserver.com/'));
```
> See: [bindCallback](#bindcallback), [from](#from)

### [interval](#)
创建一个Observable，可以在指定的时间间隔内在指定的IScheduler上发送序列号。
```javascript
Observable.interval(1000);
// 0 // 1 // 2...
```
> See: [timer](#timer), [delay](#delay)

### [merge](#)
创建一个输出Observable，它可以从每个给定的输入Observable中同时发出所有的值。
> 可以通过 Number 参数，控制并行的 Observable 数量。通过一个，再进行下一个。
```javascript
Observable.merge(
  Observable.interval(500).take(4),
  Observable.interval(1000).take(2),
  Observable.interval(300).take(3),
  2
);
// 0 // 1 // 0 // 2 // 3 // 1 // 0 // 1 // 2
```
> 此时 Marble diagrams:
```
Obs1:   -----0-----1-----2-----3|
Obs2:   ----------0----------1|
Obs2:   ---0---1---2|
        merge(Obs1, Obs2, Obs3, 2)
source: -----0-----(1,0)-----2-----(3,1)---0---1---2|
```
> See: [mergeAll](#mergeall), [mergeMap](#mergemap), [mergeMapTo](#mergemapto), [mergeScan](#mergescan)

### [never](#)
创建一个Observable，它不会发送任何数据。
> 它和  `empty` 最大的区别在于，它不会发出 `complete` 的通知。
```javascript
const source = Observable.never().startWith('over');
// over
```
> See: [create](#create), [empty](#empty), [of](#of), [throw](#throw)

### [of](#)
创建一个Observable，发出一些您指定为参数的值，一个接着一个，然后发出一个完整的通知。
> 它和  `from` 最大的区别在于，它以一个个参数的形式进入，而不是以Array.
```javascript
const source = Observable.of(1,2,3);
// 1 // 2 // 3
```
> See: [create](#create), [empty](#empty), [never](#never), [throw](#throw)

### [range](#)
创建一个Observable，发出指定范围内的数字序列。
> 开始的范围和输出的个数。
```javascript
Observable.range(5,3);
// 5 // 6 // 7 // 8
```
> See: [timer](#timer), [interval](#interval)

### [throw](#)
创建一个Observable，它不会发送任何数据，但会立即发出错误通知。
> 它和  `empty` 最大的区别在于，它发出的是 `error` 的通知。
```javascript
const source = Observable.throw().startWith('over');
// over // error
```
> See: [create](#create), [empty](#empty), [never](#never), [of](#of)

### [timer](#)
创建一个可以在初始发射时间的Observable，并在此后的每个间隔内发送数据。
> 它像 `interval`，但你可以指定何时发送数据。
```javascript
Observable.timer(1000,500);
// 0 // 1 // 2 // 3...
```
> 此时 Marble diagrams:
```
Obs:   ----------0-----1-----2-----3...
```
> See: [interval](#interval), [delay](#delay)

### [webSocket](#)
对w3c兼容的WebSocket进行包装。

### [zip](#)
组合多个可观察值来创建一个Observable，其值根据每个输入的数值计算得出。
> 如果最新的参数是一个函数，则该函数用于从输入值计算创建的值。否则返回输入值的数组。
```javascript
Observable.zip(
  Observable.timer(1000,500),
  Observable.of('a','c','b','d'),
  (x, y) => y
  );
// a // c // b // d
```
> 此时 Marble diagrams:
```
Obs1:   ----------0-----1-----2-----3...
Obs1:   (a,c,b,d)|
        zip(Obs1,Obs2,(x,y) => y)
source: ----------a-----c-----b-----d|
```