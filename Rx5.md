## RxJS(5.2) Operators

### 目录
- [buffer](#buffer)
- [bufferCount](#buffercount)
- [bufferTime](#buffertime)
- [bufferToggle](#buffertoggle)
- [bufferWhen](#bufferwhen)
- [combineAll](#combineall)
- [combineLatest](#combinelatest)
- [concat](#concat)
- [concatAll](#concatall)
- [concatMap](#concatmap)
- [concatMapTo](#concatmapto)
- [count](#count)
- [debounce](#debounce)
- [debounceTime](#debouncetime)
- [defaultIfEmpty](#defaultifempty)
- [delay](#delay)
- [delayWhen](#delaywhen)
- [dematerialize](#dematerialize)
- [distinct](#distinct)
- [distinctUntilChanged](#distinctuntilchanged)
- [distinctUntilKeyChanged](#distinctuntilkeychanged)
- [do](#do)
- [elementAt](#elementat)
- [every](#every)
- [expand](#expand)
- [filter](#filter)
- [first](#first)
- [groupBy](#groupby)
- [ignoreElements](#ignoreelements)
- [last](#last)
- [map](#map)
- [mapTo](#mapto)
- [merge](#merge)
- [mergeMap](#mergemap)
- [pluck](#pluck)
- [publish](#publish)
- [race](#race)
- [repeat](#repeat)
- [retry](#retry)
- [retryWhen](#retrywhen)
- [sample](#sample)
- [scan](#scan)
- [share](#share)
- [single](#single)
- [skip](#skip)
- [skipUntil](#skipuntil)
- [skipWhile](#skipwhile)
- [startWith](#startwith)
- [switchMap](#switchmap)
- [window](#window)
- [windowCount](#windowcount)
- [windowTime](#windowtime)
- [windowToggle](#windowtoggle)
- [windowWhen](#windowwhen)
- [withLatestFrom](#withlastestFrom)
- [zip](#zip)

#### buffer
##### signature: `buffer(closingNotifier: Observable<any>): Observable<T[]>`

缓冲期间的观测值，直到 closingNotifier 发出观测值。将期间的缓冲值转为数组发出。  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-buffer)
> [demo](http://jsbin.com/luteda/1/edit?js,console,output)
参数唯一：Observable每次发出值，会触发source期间缓冲的所有值
```javascript
// 每500毫秒发出一个值
const sourceSelector = Rx.Observable.interval(500);

// 每当点击 document 的时候，发出一个值
const closingNotifier = Rx.Observable.fromEvent(document, 'click');

// 直到我们点击了 document ，这会使得 sourceSelector 发出期间缓冲的所有值。
const source = sourceSelector.buffer(closingNotifier);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
```
> 此时 Marble diagrams:
```
sourceSelector:   -----0-----1-----2-----3-----4-----5--...
closingNotifier:  ------c--c----------c|
                  sourceSelector.buffer(closingNotifier)
source:           ------([0])--([])----------([1,2])|
```

#### bufferCount
##### signature: `bufferCount(bufferSize: number, startBufferEvery: number): Observable<T[]>`

缓冲所有的输出值，直到达到 bufferSize 的数量，发出一组缓冲值。  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferCount)

> [demo](http://jsbin.com/luteda/2/edit?js,console,output)
参数1：设置积累数量，每次达到该数量发出。期间缺少值，每达到数量也可发出。 
```javascript
// 每500毫秒 发出一个值,发送7次。
const sourceSelector = Rx.Observable.interval(500).take(7);

// 当 sourceSelector 累计三个值，把它们作为数组发出。
const source = sourceSelector.bufferCount(3);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// [0,1,2] // [3,4,5] // [6] // Complete!
```
>> Marble diagrams:
```
sourceSelector:   -----0-----1-----2-----3-----4-----5-----6|
                  sourceSelector.bufferCount(3)
source:           ---------------([0,1,2])---------------([3,4,5])-----([6])|
```
> [demo](http://jsbin.com/luteda/3/edit?js,console,output)
参数2：设置每次source的初始缓冲点
```javascript
// 每500毫秒 发出一个值,发送7次。
const sourceSelector = Rx.Observable.interval(500).take(7);

// 确定每次source的缓冲起点，目前的缓冲起点都在source每隔2个发出点的位置
// 当 sourceSelector 累计三个值，把它们作为数组发出。
const source = sourceSelector.bufferCount(3,2);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// [0,1,2] // [2,3,4] // [4,5,6] // [6] // Complete!
```
>> Marble diagrams:
```
sourceSelector: -----0-----1-----2-----3-----4-----5-----6|
                sourceSelector.bufferCount(3,2)
source:         ---------------([0,1,2])---------------([2,3,4])---------------([4,5,6])([6])|
```

#### bufferTime
##### signature: `bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, maxBufferSize: number, scheduler: Scheduler): Observable<T[]>`

缓冲输出的值，直到达到指定的时间点，然后把他们以数组的形式发出。  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferTime)

> [demo](http://jsbin.com/luteda/4/edit?js,console,output)
只使用参数一：每次发送的时间间隔，将source此期间的缓冲值发出
```javascript
// 每200毫秒 发出一个值,发送7次。
const sourceSelector = Rx.Observable.interval(200).take(7);

// 每500ms，就把source所有缓冲的值，作为一个数组输出
const source = sourceSelector.bufferTime(500);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// [0,1] // [2,3] // [4,5,6] // Complete!
```
>> Marble diagrams:
```
sourceSelector: --0--1--2--3--4--5--6|.
                sourceSelector.bufferTime(500)
source:         -----([0,1])-----([2,3])-----([4,5,6])|
```

> [demo](http://jsbin.com/luteda/5/edit?js,console,output)
使用第2个参数：设置每次source的初始缓冲点
```javascript
// 每200毫秒 发出一个值,发送10次。
const sourceSelector = Rx.Observable.interval(200).take(10);

// 确定每次source的缓冲起点，目前的缓冲起点都在source每隔1000ms的位置
// 然后source起点开始，每500ms累计的缓冲的值，作为一个数组输出。
const source = sourceSelector.bufferTime(500,1000);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// [0,1] // [4,5,6]  // [9] // Complete!
```
>> Marble diagrams:
```
sourceSelector: --0--1--2--3--4--5--6--7--8--9|
                sourceSelector.bufferTime(500,1000)
source:         -----([0,1])----------([4,5,6])------[9]|
```

> [demo](http://jsbin.com/luteda/6/edit?js,console,output)
参数3：每次发送值的最大数量
```javascript
// 每200毫秒 发出一个值,发送7次。
const sourceSelector = Rx.Observable.interval(200).take(10);

// 确定每次source的缓冲起点，目前的缓冲起点都在source每隔1000ms的位置
// 然后source起点开始，每500ms累计的缓冲的值，作为一个数组输出
// 这个最终数组只取前面2个传出,不够2个就1个
const source = sourceSelector.bufferTime(500,1000,2);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// [0,1] // [4,5]  // [9] // Complete!
```
>> Marble diagrams:
```
sourceSelector: --0--1--2--3--4--5--6--7--8--9|
                sourceSelector.bufferTime(500,1000)
source:         -----([0,1])----------([4,5])------[9]|
```

#### bufferToggle
##### signature: `bufferToggle(openings: SubscribableOrPromise<O>, closingSelector: function(value: O): SubscribableOrPromise): Observable<T[]>`

打开 buffer ，使其捕捉 source emit 的值，关闭 buffer ，使其 emit 缓冲的值。  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferToggle)
> [demo](http://jsbin.com/luteda/7/edit?js,console,output)
参数1: 寻找每次source的初始缓冲点;  参数2: 每次source发送的间隔
```javascript
// 每200ms发出数据，发送10次
const sourceSelector = Rx.Observable.interval(200).take(10);
// 寻找源的初始点，每隔400ms设置一处 sourceSelector 的初始点
const openings = Rx.Observable.interval(400);
// 确定源的取值间隔，现在设置每次向 sourceSelector 取间隔为 300ms 内的缓冲值。
const closingSelector = () => {
  return Rx.Observable.interval(300);
};
// 每隔400ms就会开始一个新的缓冲区，缓冲初始点开始的`sourceSelector` 300ms内的所有 emit 过的值
const source = sourceSelector.bufferToggle(openings, closingSelector);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// [1,2] // [3,4] // [5,6] // [7,8] // [9] // Complete!
```
>> Marble diagrams:
```
sourceSelector:   --0--1--2--3--4--5--6--7--8--9|
openings:         ----0----1----2----3----4----5----6--...
closingSelector:  ---0---1---2---3---4--...
                  sourceInterval.bufferToggle(startInterval, closingInterval)
latest:           ----([1,2])----([3,4])----([5,6])----[7,8]---[9]|
```

#### bufferWhen
##### signature: `bufferWhen(closingSelector: function(): Observable): Observable<T[]>`

缓冲所有的值直到 closingSelector emit 值，接着 emit 缓冲好的值  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferWhen)
> [demo](http://jsbin.com/luteda/8/edit?js,console,output)
参数唯一：一个函数，返回一个Observable.设置每次source发出数据的时机
```javascript
// 每隔200ms发出一个数据
const sourceSelector = Rx.Observable.interval(200).take(10);
// 将400ms内 sourceSelector 的缓冲值以数组发出。
const closingSelector = () => Rx.Observable.interval(400);
const source = sourceSelector.bufferWhen(closingSelector);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// [0] // [1,2,3] // [4,5] // [6,7] // [8,9] // Complete!
```
>> Marble diagrams:
```
sourceSelector:   --0--1--2--3--4--5--6--7--8--9|
closingSelector:  ----0----1----2----3----4--...
                  sourceSelector.bufferWhen(closingSelector)
latest:           ----([0])----([1,2,3])----([4,5])----([6,7])----([8,9])|
```

#### catch
##### signature: `catch(selector: function): Observable`

捕捉处理异常  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-catch)
> [demo](http://jsbin.com/luteda/9/edit?js,console,output)
参数1：接受错误信息，处理异常
```javascript
// 接收处理错误的函数体,现在做的就时捕捉到错误，将错误信息打印
const selector = err => Rx.Observable.of(err);
// 发送数据，当数据发出4时，被捕捉并抛出异常，进入到`catch`处理.
const source = Rx.Observable
  .of(1,2,3,4,5,6)
  .map(val => {
    if(val === 4){
      throw 'four';
    }
    return val;
  })
  .catch(selector);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// 1 // 2 // 3 // four // Complete!
```

#### combineAll
##### signature: `combineAll(project: function): Observable`

针对嵌套Observable,可转换高阶Observable为一阶Observable. 有concatAll()一样的效果，不过它更高级，具有`project` 可以处理接受后的参数。  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-combineAll) 
> [demo](http://jsbin.com/luteda/10/edit?js,console,output)
参数唯一：project 函数，接受并加工转为一阶的 Observable
```javascript
// 可加工回传的参数，返回新的 Observable.
const project = val => `project: ${val}`;
// 延迟2000ms执行
const startInterval = Rx.Observable.timer(2000);
// 2000ms后开始发送数据，但输出的是高阶的 Observable
const sourceSelector = startInterval.mapTo(Rx.Observable.of(3,2,1));
// 将高阶的 Observable 转为一阶 Observable.并用过project加工数据，返回新的Observable.
const source = sourceSelector.combineAll(project);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// project: 3 // project: 2 // project: 1 // Complete!
```

#### combineLatest
##### signature: `combineLatest(other: ObservableInput, project: function): Observable`

当任何输入观察值发出一个值时，它计算一个公式，使用来自所有 Observable 发出的最新值，然后发出该公式的输出。  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-combineLatest)
> 使用场景：每次有新的请求会影响其他用户时，使用combineLatest非常合适。
> [demo](http://jsbin.com/luteda/11/edit?js,console,output)
参数1：多个Observable; 参数2：接受多个Observable的返回，然后处理输出一个全新的Observable.
```javascript
// 可加工回传的参数，返回新的 Observable.
const project = (x,y,z) => `${x},${y},${z}`;
// 每500ms输出一个值，总共输出3个
const observable1 = Rx.Observable.interval(500).take(3);
// 每1000ms输出一个值，总共输出2个
const observable2 = Rx.Observable.interval(1000).take(2);
// 每700ms输出一个值，总共输出2个
const sourceSelector = Rx.Observable.interval(700).take(2);
// 真实发出值的条件：首先需要所有 Observable 都具有一个发出值，否则处于等待状态。
// 随后每一个Observable发出新值，其他 Observable 会将最近最新的数据发出。一旦有数据发送完毕，总体将进入结束状态
const source = sourceSelector.combineLatest(observable1,observable2,project);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// 0,1,0 // 1,1,0 // 1,2,0 // 1,2,1 // Complete!
```
>> Marble diagrams:
```
sourceSelector: -------0-------1|
observable1:    -----0-----1-----2|
observable2:    ----------0----------1|
                sourceSelector.combineLatest(observable1,observable2,project)
latest:         ----------(0,1,0)----(1,1,0)-(1,2,0)-----(1,2,1)|
```

#### concat
##### signature: `concat(other: ObservableInput, scheduler: Scheduler): Observable`

串联多个 Observable,并按顺序发出它们的值。  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concat)

> [demo](http://jsbin.com/luteda/12/edit?js,console,output)
就像在 ATM 交易的队伍一样，直到上一个交易完毕，才能开始下一个.如果有一个人一直占着 ATM ，后面的人永远不会有交易的机会.

```javascript
// 每500ms输出一个值，总共输出3个
const observable1 = Rx.Observable.interval(500).take(3);
// 每400ms输出一个值，总共输出2个
const observable2 = Rx.Observable.interval(400).take(2);
// 每700ms输出一个值，总共输出2个
const sourceSelector = Rx.Observable.interval(700).take(2);
// 然后开始将他们串联起来，按队列一个个进行
const source = sourceSelector.concat(observable1,observable2);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// 0 // 1 // 0 // 1 // 2 // 0 // 1 // Complete!
```
>> Marble diagrams:
```
sourceSelector: -------0-------1|
observable1:    -----0-----1-----2|
observable2:    ----0----1|
                sourceSelector.concat(observable1,observable2)
latest:         -------0-------1-----0-----1-----2----0----1|
```
#### concatAll
#### signature: `concatMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable`

针对嵌套Observable,可转换高阶Observable为一阶Observable.  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatAll)
>[demo](http://jsbin.com/luteda/13/edit?js,console,output)
combineAll()有类似的效果，不过它更高级，具有`project` 可以处理接受后的参数。

```javascript
// 延迟2000ms执行
const startInterval = Rx.Observable.timer(2000);
// 2000ms后开始发送数据，但输出的是高阶的 Observable
const sourceSelector = startInterval.mapTo(Rx.Observable.of(3,2,1));
// 将高阶的 Observable 转为一阶 Observable.
const source = sourceSelector.concatAll();

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// 3 // 2 // 1 // Complete!
```

#### concatMap
##### signature: `concatMap(project: function, resultSelector: function): Observable`

处理 Observable 之间的映射。相等于：`map` -> `concat`  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatMap)
> [demo](http://jsbin.com/luteda/14/edit?js,console,output)
参数1: 可以接受 source 发出的值，然后处理返回新的Observable.
```javascript
// 每500ms发送一个值，总共发送2次。
const startInterval = Rx.Observable.interval(500).take(2);
// 单纯输出(2,1).
const sourceSelector = Rx.Observable.of(2,1);
// 一个处理函数，接收 sourceSelector 输出值，返回一个 Observable.这里只是单纯返回了 startInterval.
const project = x => startInterval;
// 将高阶的 Observable 转为一阶 Observable.内部开始处理多个 Observable.
const source = sourceSelector.concatMap(project);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// 0 // 1 // 0 // 1 // Complete!
```
>> Marble diagrams:
```
sourceSelector: (2,1)|
startInterval:  -----0-----1|
                sourceSelector.concat(observable1,observable2)
latest:         -----0-----1-----0----1|
```

> [demo](http://jsbin.com/luteda/15/edit?js,console,output)
参数2: 接受 startInterval 发出的值和 project 返回的值，然后处理返回新的 Observable.
```javascript
// 每500ms发送一个值，总共发送2次。
const startInterval = Rx.Observable.interval(500).take(2);
// 单纯输出(2,1).
const sourceSelector = Rx.Observable.of(2,1);
// 一个处理函数，接收 startInterval 输出值，返回一个 Observable.这里只是单纯返回了 sourceSelector.
const project = x => sourceSelector;
// 接受 startInterval 发出的值和 project 返回的值，然后处理返回新的 Observable.
// 此参数可选，如不无，直接返回 project 的返回值。
const resultSelector = (x,y) => [x,y];
// 将高阶的 Observable 转为一阶 Observable.内部开始处理多个 Observable.
const source = startInterval.concatMap(project, resultSelector);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// [2,0] // [2,1] // [1,0] // [1,1] // Complete!
```
>> Marble diagrams:
```
startInterval:  -----0-----1|
sourceSelector: (2,1)|
                sourceSelector.concat(observable1,observable2)
latest:         -----([0,2],[0,1])-----([1,2],[1,1])|
```

#### concatMapTo
##### signature: `concatMapTo(innerObservable: ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable`

处理 Observable 之间的映射。相等于：`mapTo` -> `concat`   
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatMapTo)
> [demo](http://jsbin.com/luteda/16/edit?js,console,output)
如果 sourceSelector 的速度比 startInterval 快，它会导致内存问题。内部观测值聚集在一个无限的缓冲区等待订阅。

```javascript
// 绑定一个点击事件，为每次点击触发 sourceSelector 发出值
const startInterval = Rx.Observable.fromEvent(document, 'click');
// 每400ms发送一个值，总共发送2次。
const sourceSelector = Rx.Observable.interval(400).take(2);
// 接受 startInterval 发出的值和 project 返回的值，然后处理返回新的 Observable.
// 此参数可选。如无，直接返回 sourceSelector整个流的返回。
const resultSelector = (x,y) => [y];
// 将高阶的 Observable 转为一阶 Observable.每次点击输出 sourceSelector 整个流的返回。
// 再将startInterval, sourceSelector 的返回通过 resultSelector处理
const source = startInterval.concatMapTo(sourceSelector, resultSelector);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// [0] // [1] // [0] // [1] ...
```
>> Marble diagrams:
```
// 此处(ccc) 连点 3次鼠标导致队里积压，所有的数据都在缓冲区内，导致内存问题
startInterval:  --c----------(ccc)|
sourceSelector: ----0----0|
                startInterval.concatMapTo(sourceSelector, resultSelector)
latest:         ----[0]----[1]--------------[0]----[1]----[0]----[1]----[0]----[1]|
```

#### count
##### signature: `count(predicate: function(value: T, i: number, source: Observable<T>): boolean): Observable`

计算 source 值的数量，直到 complete.  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-count))
> [demo](http://jsbin.com/luteda/17/edit?js,console,output)
参数唯一(可选)：自定义筛选计数的条件
```javascript
// 这里输出1-7
const sourceSelector = Rx.Observable.range(1, 7);
// 一个筛选的函数，只有能被2整除的 sourceSelector 发出的值才会累加。
const predicate = i => i % 2 === 0;
// 开始计数：筛选出1-7中符合条件的的个数
const source = sourceSelector.count(predicate);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// 3 // Complete!
```

#### debounce
##### signature: `debounce(durationSelector: function(value: T): SubscribableOrPromise): Observable`

仅在一个特定的时间跨度内，由另一个 Observable 发射数据。  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-debounce)
> debounce 不会积压队列，在性能上有很大的帮助。如鼠标连点，滚轮监听，搜索文字输入等.它与 throttle 的区别在 throttle 规定时间内必定发出一次值。
> [demo](http://jsbin.com/luteda/18/edit?js,console,output)
参数唯一: 函数返回一个Observable。如果source发出值的速度大于函数返回的Observable速度的话就会将函数体发出的数据丢掉。

```javascript
// 每1000ms发出数据
const sourceSelector = Rx.Observable.interval(1000);
// 返回一个每200*val(ms)发出数据的 Observable
// 当durationSelector 内的时间超过 sourceSelector的时间时，未来的数据将会被丢掉。
const durationSelector = val => Rx.Observable.timer(val * 200);
// 每次点击进入 durationSelector 经过1000ms,发出 sourceSelector数据
const source = sourceSelector.debounce(durationSelector);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// 0 // 1 // 2 // 3 // 4
```
>> Marble diagrams:
```
sourceSelector:   ----------0----------1---...
durationSelector: s--s----s------s--------s----------s--...
                  sourceSelector.debounce(durationSelector)
latest:           0--1----2------3-------4-----------()--...   
    超出sourceSelector时间，还未取到未来值，就开始新的一轮_|
```

#### debounceTime
##### signature: `debounceTime(dueTime: number, scheduler: Scheduler): Observable`

忽略 sourceSelector 某段时间内的 发送的值。  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-debounceTime)
> [demo](http://jsbin.com/luteda/20/edit?js,console,output)
参数1：一个忽略的时间间隔; 它与 throttleTime 的区别在 throttleTime 规定时间内必定发出一次值。
```javascript
// 每次点击发出一次数据
const sourceSelector = Rx.Observable.fromEvent(document, 'click');
// 每次 sourceSelector 发出数据，都需要等待500ms。
// 没有队列的概念，在等待的过程中无论 sourceSelector 触发多少次，都不会加入队列。
const source = sourceSelector.debounceTime(500);

source.subscribe({
  next: next => console.log(next.type),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// click // click
```
>> Marble diagrams:
```
sourceSelector:   --c----------(c,c,c)|
                  sourceSelector.debounceTime(500)
latest:           -------e---------------e|
```

#### defaultIfEmpty
##### signature: `defaultIfEmpty(defaultValue: any): Observable`

当 Observable 为空时，使用这个设定的默认值，否则值为 `null` 。  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-defaultIfEmpty)
> [demo](http://jsbin.com/luteda/21/edit?js,console,output)
参数唯一：直接填写默认值

```javascript
// 无值，进入complete 状态。 与 of() 同机制
const sourceSelector = Rx.Observable.empty();
// 捕捉无值，发出默认值
const source = sourceSelector.defaultIfEmpty('默认值:empty');

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// 默认值:empty  // Complete!
```

#### delay
##### signature: `delay(delay: number | Date, scheduler: Scheduler): Observable`

延迟 Observable emit 的时间。  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-delay)
> [demo](http://jsbin.com/luteda/22/edit?js,console,output)
参数：可直接延迟的 多少ms，也可以时日期型，指定日期触发。

```javascript
// 数据源发出数据 `start`
const sourceSelector = Rx.Observable.of('start');
// 测试二个不同的延迟方式
const source = Rx.Observable.merge(
  // 无延迟直接发出
  sourceSelector,
  // 延迟 1000ms 发出
  sourceSelector.delay(1000),
  // 延迟 现在时间+2000ms 发出
  sourceSelector.delay(new Date(new Date().getTime() + 2000))
);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// start // start // start // Complete!
```

#### delayWhen
##### signature: `delayWhen(delayDurationSelector: function(value: T): Observable, subscriptionDelay: Observable): Observable`

像`delay`,但它的时间是根据指定的函数返回的 Observable 决定延迟 emit 的时间。  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-delayWhen)

> [demo](http://jsbin.com/luteda/23/edit?js,console,output)
参数：一个函数，返回一个Observable.

```javascript
// 每秒发出一次值
const sourceSelector = Rx.Observable.interval(1000);
// 在3s后发出值
const delayDurationSelector = () => Rx.Observable.timer(3000);
// 在3s后，开始进入 sourceSelector 发出值
const source = sourceSelector.delayWhen(delayDurationSelector);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// 0 // 1 // 2 ...
```
>> Marble diagrams:
```
sourceSelector:   ----------0----------1----------2---...
                  sourceSelector.delayWhen(delayDurationSelector)
latest:           ----------------------------------------0----------1----------2--...
```

#### dematerialize
##### signature: `dematerialize(): Observable`

把 notification object 变成 notification values  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-dematerialize)
> [demo](http://jsbin.com/luteda/24/edit?js,console,output) 

```javascript
// 发出 next notification 和 error notification
const source = Rx.Observable
  .from([
    Rx.Notification.createNext('SUCCESS'),
    Rx.Notification.createError('ERROR!')
  ])
  // 把 notification object 变成 notification values
  .dematerialize();
source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// SUCCESS // ERROR: 'ERROR!
```
#### distinct
##### signature: `distinct(keySelector: function, flushes: Observable): Observable`

只有当前的值与之前所有的值都不同，才发出值;它们对比的是堆地址，所以处理对象时需要对比他们的value. 
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-distinct)
> [demo](http://jsbin.com/luteda/25/edit?js,console,output)
针对常量可直接调用，因为它们堆地址都一样。

```javascript
// 输出数据
const sourceSelector = Rx.Observable.of(1,2,4,4,3,3,2);
// 筛选出数据相同的项
const source = sourceSelector.distinct();

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// 1 // 2 // 4 // 3 // Complete!
```
> [demo](http://jsbin.com/luteda/27/edit?html,js,output)
针对对象，使用参数1：可以选择对比的数据

```javascript
// 输出数据
const sourceSelector = Rx.Observable.of({name:'a'},{name:'b'},{name:'a'},{name:'a'});
// 确定比对条件，以name的value 值为对比对象
const keySelector = val => val.name;
// 筛选出sourceSelector_ 发出的数据中 name 相同的对象
const source = sourceSelector.distinct(keySelector);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// {name:'a'} // {name:'b'} // Complete!
```

#### distinctUntilChanged
##### signature: `distinctUntilChanged(compare: function): Observable`

只有当前的值与上个值不同，才发出值  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-distinctUntilChanged)
> [demo](http://jsbin.com/luteda/28/edit?html,js,output)
默认无参数：针对常量
```javascript
// 输出数据
const sourceSelector = Rx.Observable.of(1,2,4,4,3,3,2);
// 筛选出前个数据和后一个数据相同的值，过滤之
const source = sourceSelector.distinctUntilChanged();

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// 1 // 2 // 4 // 3 // 2 // Complete!
```
> [demo](http://jsbin.com/luteda/29/edit?js,console,output)
针对对象，参数二：自定义筛选条件
```javascript
// 输出数据
const sourceSelector = Rx.Observable.of({name:'a'},{name:'b'},{name:'b'},{name:'a'});
// 确定比对条件，当对比条件返回 `false` 将输出当前值
const keySelector = (pre,next) => pre.name === next.name;
// 筛选出sourceSelector_ 发出的数据中 name 相同的对象
const source = sourceSelector.distinctUntilChanged(keySelector);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// {name:'a'} // {name:'b'} // {name:'a'} // Complete!
```

#### distinctUntilKeyChanged
##### signature: `distinctUntilKeyChanged(key: string, compare: function): Observable`

可以选择比对对象的某一个 key 值，key 值下的 value 不相同时才发出值  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-distinctUntilKeyChanged)
> [demo](http://jsbin.com/luteda/30/edit?js,console,output)
参数1：可以针对对象，选择Key值
```javascript
// 输出数据
const sourceSelector = Rx.Observable.of({name:'a'},{name:'b'},{name:'b'},{name:'a'});
// 过滤掉数据中前一个和后一个数据 name 相同的对象
const source = sourceSelector.distinctUntilKeyChanged('name');

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// {name:'a'} // {name:'b'} // {name:'a'} // Complete!
```
> [demo](http://jsbin.com/luteda/31/edit?js,console,output)
参数2：可以自定义筛选的方法
```javascript
// 输出数据
const sourceSelector = Rx.Observable.of({name:'a1'},{name:'b1'},{name:'b2'},{name:'a1'});
// 只对比第一个字符是否相等，相等则过滤之
const compare = (x, y) => x.substring(0,1) === y.substring(0,1);
// 将name的value值传递到 compare,然后通过 compare来过滤不需要的数据。
const source = sourceSelector.distinctUntilKeyChanged('name',compare);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// {name:'a1'} // {name:'b1'} // {name:'a1'} // Complete!
```

#### do
##### signature: `do(nextOrObserver: Observer | function, error: function, complete: function): Observable`

显式地进行某些 action, 和subscribe 一样拥有 next, error, complete三个参数  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-do)
> [demo](http://jsbin.com/luteda/32/edit?js,console,output)

```javascript
const sourceSelector = Rx.Observable.of(1,2);

// 通过 do ，显式地打印某些值
const source = sourceSelector
  .do(val => console.log(`BEFORE MAP: ${val}`))
  .map(val => val + 10)
  .do(val => console.log(`AFTER MAP: ${val}`));

// `do` 是不会 emit 值
source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// BEFORE MAP: 1 // AFTER MAP: 11 // 11 // BEFORE MAP: 2 // AFTER MAP: 12 // 12
```

#### elementAt
##### signature: `elementAt(index: number, defaultValue: T): Observable`

在source中指定索引处发出单个值，随后进入 complete.  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-elementAt)
> [demo](http://jsbin.com/luteda/33/edit?js,console,output)
参数: 在source中取指定索引的值，取不到则进入异常状态
```javascript
// 每秒发出一个值
const sourceSelector = Rx.Observable.of(1,2,3,4,5);
// 只取源的第三个值，取到就进入 complete ，否则就进入 error
const source = sourceSelector.elementAt(3);

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// 4 // Complete!
```

#### every
##### signature: `every(predicate: function, thisArg: any): Observable`

检测是否「所有 emit 的值」都符合某个条件。  
[official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-every)
> [demo](http://jsbin.com/luteda/34/edit?js,console,output)
参数：判断是否原有值 进入函数体，都为true! 如果全都符合就返回 true,否则就返回 false
```javascript
// emit 5个值
const sourceSelector = Rx.Observable.of(1, 2, 3, 4, 5);
const example = sourceSelector.every(val => val % 2 === 0);
example.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// false // Complete!

// emit 5个值
const sourceSelectorTwo = Rx.Observable.of(2, 4, 6, 8, 10);
// 是否每个值都是偶数
const exampleTwo = sourceSelectorTwo.every(val => val % 2 === 0);

exampleTwo.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});
// true // Complete!
```

#### expand
##### signature: `expand(project: function, concurrent: number, scheduler: Scheduler): Observable`

递归地调用给定的函数。  
([demo](http://jsbin.com/fuxocepazi/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-expand))

```javascript
// emit 2
const source = Rx.Observable.of(2)

const example = source
  .expand(val => {
    // 2, 3, 4, 5
    console.log(`Passed value: ${val}`)
    // 3, 4, 5, 6
    return Rx.Observable.of(1 + val)
  })
  // 只调用 5 次
  .take(5)
  
/*
* RESULT: 2
* Passed value: 2
* RESULT: 3
* Passed value: 3
* RESULT: 4
* Passed value: 4
* RESULT: 5
* Passed value: 5
* RESULT: 6
* Passes value: 6
*/

// 输出：2, 3, 4, 5, 6
const subscribe = exmaple.subscribe(val => console.log(`RESULT: ${val}`))
```

#### filter
##### signature: `filter(select: Function, thisArg: any): Observable`

只返回符合给定条件的值。  
([demo](http://jsbin.com/gaqojobove/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-filter))

```javascript
// emit (1, 2, 3, 4, 5)
const source = Rx.Observable.from([1, 2, 3, 4, 5])
// 过滤掉不是偶数的值
const example = source.filter(num => num % 2 === 0)
// 输出：Even Number: 2, Even Number: 4
const subscribe = example.subscribe(val => console.log(`Even number: ${val}`))

// emit ({ name: 'Joe', age: 31 }, { name: 'Bob', age: 25 })
const sourceTwo = Rx.Observable.from([{ name: 'Joe', age: 31 }, { name: 'Bob', age: 25 }]
// 过滤掉30岁以下的
const exampleTwo = sourceTwo.filter(person => person.age >= 300)
// 输出：Over 30: Joe
const subscribeTwo = exampleTwo.subscribe(val => console.log(`Over 30: ${val.name}`))
```

#### first
##### signature: `first(predicate: function, select: function)`

emit 第一个值，或者第一个符合给定条件的值。  
([demo](http://jsbin.com/poloquxuja/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-first))

```javascript
const source = Rx.Observable.from([1, 2, 3, 4, 5])
// 没有传任何参数，那么就 emit 第一个值
const example = source.first()
// 输出：First Value: 1
const subscribe = example.subscribe(val => console.log(`First Value: ${val}`))

// emit 第一个符合给定条件的值
const exampleTwo = source.first(num => num === 5)
// 输出：First to pass test: 5
const subscribe = exampleTwo.subscribe(val => console.log(`First to pass test: ${val}`))

// 传递可选参数 project function
const exampleThree = source.first(
  num => num % 2 === 0,
  (result, index) => `First even: ${result} is at index: ${index}`
)
// 输出：First even: 2 is at index 1
const subscribeThree = exampleThree.subscribe(val => console.log(val))
```

#### groupBy
##### signature: `groupBy(keySelector: Function, elementSelector: Function): Observable`

按照给定的值，分组到 Observable。  
([demo](http://jsbin.com/zibomoluru/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-groupBy))

```javascript
const people = [{name: 'Sue', age:25},{name: 'Joe', age: 30},{name: 'Frank', age: 25}, {name: 'Sarah', age: 35}];
const source = Rx.Observable.from(people)
// 按年龄分组
const example = source
  .groupBy(person => person.age)
  // 每个分组作为数组返回
  .flatMap(group => group.reduce((acc, curr) => [...acc, curr], []))
  
/*
* 输出：
* [{age: 25, name: 'Sue'}, {age: 25, name: 'Frank'}]
* [{age: 30, name: 'joe'}]
* [{age: 35, name: 'Sarah'}]
*/

const subscribe = example.subscribe(val => console.log(val))
```

#### ignoreElements
##### signature: `ignoreElements(): Observable`

忽略所有的东西，除了 complete 和 error 。  
([demo](http://jsbin.com/luyufeviqu/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-ignoreElements))

```javascript
// 每隔500ms emit 值
const source = Rx.Observable.interval(100)
// 忽略一切东西除了 complete
const example = source
  .take(5)
  .ignoreElements()
// 输出：'COMPLETE!'
const subscribe = example.subscribe(
  val => console.log(`NEXT: ${val}`),
  val => console.log(`ERROR: ${val}`),
  () => console.log(`COMPLETE`)
)

// 忽略一切东西除了 error
const error = source
  .flatMap(val => {
    if (val === 4) return Rx.Observable.throw(`ERROR AT ${val}`)
    return Rx.Observable.of(val)
  })
  .ignoreElements()
  
// 输出：ERROR: ERROR at 4
const subscribeTwo = error.subscribe(
  val => console.log(`NEXT: ${val}`),
  err => console.log(`ERROR: ${err}`),
  () => console.log('SECOND COMPLETE')
)
```

#### last
##### signature: `last(predicate: function): Observable`

emit 最后一个值，或者最后一个通过 test 的值。  
([demo](http://jsbin.com/xidufijuku/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-last))

```javascript
const source = Rx.Observable.from([1, 2, 3, 4, 5])
// 没有传参数，emit 最后一个值
const example = source.last()
// 输出："Last value: 5"
const subscribe = example.subscribe(val => console.log(`Last value: ${val}`))

// emit 最后一个偶数
const exampleTwo = source.last(num => num % 2 === 0)
// 输出：Last to pass test: 4
const subscribeTwo = exampleTwo.subscribe(val => console.log(`Last to pass test: ${val}`))
```

#### map
#### signature: `map(project: Function, thisArg: any): Observable`

把每个值都应用到 project function ，映射为新的值。  
([demo](http://jsbin.com/vegagizedo/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-map))

```javascript
// emit (1, 2, 3, 4, 5)
const source = Rx.Observable.of([1, 2, 3, 4, 5])
// 每个值都加10
const example = source.map(val => val + 10)
// 输出：11, 12, 13, 14, 15
const subscribe = example.subscribe(val => console.log(val))


// emit ({name: 'Joe', age: 30}, {name: 'Frank', age: 20},{name: 'Ryan', age: 50})
const sourceTwo =  Rx.Observable.from([{name: 'Joe', age: 30}, {name: 'Frank', age: 20},{name: 'Ryan', age: 50}]);
// 获取每个人的名字
const exmapleTwo = sourceTwo.map(person => person.name)
// 输出："Joe", "Frank", "Ryan"
const subscribeTwo = exampleTwo.subscribe(val => console.log(val))
```

#### mapTo
##### signature: `mapTo(value: any): Observable`

每一次都映射（map）为一个常量。  
([demo](http://jsbin.com/yazusehahu/1/edit?js,console,output) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mapTo))

```javascript
const source = Rx.Observable.interval(2000)
// 每个值都映射为一个常量
const example = source.mapTo('HELLO WORLD!')
// 输出：'HELLO WORLD!'...'HELLO WORLD!'...'HELLO WORLD!'...
const subscribe = example.subscribe(val => console.log(val))


// 每次点击 document 时都 emit
const clickSource = Rx.Observable.fromEvent(document, 'click')
// 把所有的 emission 都设为一个值
const exampleTwo = clickSource.mapTo('GOODBYE WORLD!')
// 输出：(click)'GOODBYE WORLD!'...
const subscribeTwo = exampleTwo.subscribe(val => console.log(val))
```

#### merge
##### signature: `merge(input: Observable): Observable`

把多个 Observable 压扁为一个 Observable 。  
([demo](http://jsbin.com/wicubemece/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-merge))

```javascript
// 每隔2.5s emit 值
const first = Rx.Observable.interval(2500)
// 每隔2s emit 值
const second = Rx.Observable.interval(2000)
// 每隔1.5s emit 值
const third = Rx.Observable.interval(1500)
// 每隔1s emit 值
const fourth = Rx.Observable.interval(1000)

// 把多个 Observable 合并为一个单独的 Observable
const example = Rx.Observable.merge(
  first.mapTo('FIRST'),
  second.mapTo('SECOND'),
  third.mapTo('THIRD'),
  fourth.mapTo('FOURTH')
)

// 输出：'FOURTH', 'THIRD', 'SECOND', 'FOURTH', 'FIRST', 'THIRD', 'FOURTH'...
const subscribe = example.subscribe(val => console.log(val))

// merge 可以当作 Observable instance 的一个方法
const exampleTwo = first.merge(fourth)
// 输出：0, 1, 0, 2...
const subscribeTwo = exampleTwo.subscribe(val => console.log(val))
```

#### mergeMap
##### signature: `mergeMap(project: function: Observable, resultSelector: function: any, concurrent: number): Observable`

把 source 的值先 map 到 inner Observable ，最后压扁返回。简而言之：`map` => `mergeAll` 。  
([demo](http://jsbin.com/haxobidino/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap))

```javascript
const source = Rx.Observable.of('Hello')
// map 到 inner Observable ，并且 flatten 。
const example = source.mergeMap(val => Rx.Observable.of(`${val} World!`)
// 输出：Hello World!
const subscribe = example.subscribe(val => console.log(val))

// mergeMap 也可以 emit Promise
const myPromise = val => new Promise(resolve => resolve(`${val} World from Promise!`))
// map 到 promise ，然后 emit 最后结果
const exampleTwo = source.mergeMap(val => myPromise(val))
// 输出：Hello World From Promise!
const subscribeTwo = exampleTwo.subscribe(val => console.log(val))

/*
* 你提供第2个参数，他可以接收 source 传来的值，然后在 inner Observable emit
*/
const exampleThree = source
  .mergeMap(val => myPromise(val),
    (valueFromSource, valueFromPromise) => {
      return `Source: ${valueFromSource}, Promise: ${valueFromPromise}`
    }
  )
  
// 输出：Source: Hello, Promise: Hello World From Promise!
const subscribeThree = exampleThree.subscribe(val => console.log(val))
```

#### pluck
##### signature: `pluck(properties: ...args): Observable`

挑选出嵌套的属性（nested property）。  
([demo](http://jsbin.com/netulokasu/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-pluck))

```javascript
const source = Rx.Observable.from([
  { name: 'Joe', age: 30 },
  { name: 'Sarah', age: 35 },
])

// 抓取所有的名字（name）
const example = source.pluck('name')
// 输出："Joe", "Sarch"
const subscribe = example.subscribe(val => console.log(val))

const sourceTwo = Rx.Observable.from([
  { name: 'Joe', age: 30, job: { title: 'Developer', language: 'JavaScript' }},
  // 如果没有找到 `job` 的话，就会返回 undefined
  { name: 'Sarah', age: 25 },
])
// 抓取在 `job` 里面的 `title`
const exampleTwo = sourceTwo.pluck('job', 'title')
// 输出：'Developer', undefined
const subscribeTwo = exampleTwo.subscribe(val => console.log(val))
```

#### publish
##### signature: `publish() : ConnectableObservable`

什么事情都不做，直到调用 `connect` ，共享 source 。  
([demo](http://jsbin.com/laguvecixi/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-publish))

```javascript
const source = Rx.Observable.interval(1000)
const example = source
  // side effect
  .do(() => console.log('Do something'))
  // 直到调用 connect() ，否则什么事情都不会发生
  .publish()
  
/*
 * source 不会 emit 值，直到调用 connect 方法
 * 输出：（5s 后）
 * 'Do Something'
 * 'Subscriber One: 0'
 * 'Subscriber Two: 0'
 * 'Do something'
 * 'Subscriber One: 1'
 * 'Subscriber Two: 1'
 */
const subscribe = example.subscribe(val => console.log(val))
const subscribeTwo = example.subscribe(val => console.log(val))

// 5秒后调用 connect 方法，这会引起 source 开始 emit 值
setTimeout(() => {
  example.connect()
}, 5000)
```

#### race
##### signature: `race(): Observable`

让第一个 Observable emit 。

([demo](http://jsbin.com/goqiwobeno/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-race))

```javascript
// 让第一个 Observable emit
const example = Rx.Observable.race(
  Rx.Observable.interval(1500),
  Rx.Observable.interval(1000).mapTo('1s won!'),
  Rx.Observable.interval(2000),
  Rx.Observable.interval(2500)
)
// 输出：'1s won!'...'1s won!'...
const subscribe = example.subscribe(val => console.log(val))
```

#### repeat
##### signature: `repeat(scheduler: Scheduler, count: number): Observable`

指定 source 重复的次数。  
([demo](http://jsbin.com/lexabovuqa/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-repeat))

```javascript
// emit 'Repeat this!'
const source = Rx.Observable.of('Repeat this')
// 重复 source emit 的值3次
const example = source.repeat(3)
// 输出：Repeat this! ... Repeat this! ... Repeat this
const subscribe = example.subscribe(val => console.log(val))

const sourceTwo = Rx.Observable.interval(1000)
// 取前5个值，重复2次
const exampleTwo = source.take(5).repeat(2)
// 输出：0,1,2,3,4 ... 0,1,2,3,4
const subscribeTwo = exampleTwo.subscribe(val => console.log(val))
```

#### retry
##### signature: `retry(number: number): Observable`

当发生 error 的时候，指定 retry 的次数。  
([demo](http://jsbin.com/yovacuxuqa/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-retry))

```javascript
const source = Rx.Observable.interval(1000)
const example = source
  .flatMap(val => {
    // 抛出 error
    if (val > 5) {
      return Rx.Observable.throw('Errro!')
    }
    return Rx.Observable.of(val)
  })
  // retry 2 times on error
  .retry(2)
  
/*
 * 输出：
 * 0..1..2..3..4..5..
 * 0..1..2..3..4..5..
 * 0..1..2..3..4..5..
 * Error! Retried 2 times when quit!
 */
const subscribe = example
  .subscribe({
    next: val => console.log(val),
    error: val => console.log(`${va}: Retried 2 times when quit!`)
  })
```

#### retryWhen
##### signature: `etryWhen(receives: notificationHandler, the: scheduler): Observable`

在额外的逻辑的 retry 。  
([demo](http://jsbin.com/miduqexalo/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-retryWhen))

```javascript
const source = Rx.Observable.interval(1000)
const example = source
  .map(val => {
    if (val > 5) {
      throw val
    }
    return val
  })
  .retryWhen(errors => errors
    .do(val => console.log(`Value ${val} was too high!`)
    .delayWhen(val => Rx.Observable.timer(val * 1000))
  )
  
/*
 * 输出：
 * 0
 * 1
 * 2
 * 3
 * 4
 * 5
 * Value 6 was too high!
 * ... wait 5s then repeat
 */
const subscribe = example.subscribe(console.log)
```

#### sample
##### signature: `sample(sampler: Observable): Observable`

当给定的 Observable emit 的时候，返回 source 最新的一个样本（sample）。  
([demo](http://jsbin.com/wifaqipuse/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-sample))

```javascript
// 每隔1s emit 值
const source = Rx.Observable.interval(1000)
// 每隔2s ，返回 source 最新的值
const example = source.sample(Rx.Observble.interval(2000))
// 输出：2..4..6..8
const subscribe = example.subscribe(val => console.log(val))


const sourceTwo = Rx.Observable.zip(
  Rx.Observable.from(['Joe', 'Frank', 'Bo']),
  Rx.Observable.interval(2000)
)
// 每隔2.5s ，返回 sourceTwo 的最新值
const exampleTwo = sourceTwo.sample(Rx.Observable.interval(2500))
// 输出：['Joe', 0]...['Frank', 1]...
const subscribeTwo = exampleTwo.subscribe(console.log)
```

#### scan
##### signature: `scan(accumulator: function, seed: any): Observable`

reducer / 累加器  
([demo](http://jsbin.com/jopikihuvu/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-scan))

```javascript
const testSubject = new Rx.Subject()
// 最简单的 scan 的例子，从零开始累加
const basicScan = testSubject
  .startWith(0)
  .scan((acc, curr) => acc + curr)
// 输出累加后的值
const subscribe = basiScan.subscribe(val => console.log('Accumulated total: ', val))

testSubject.next(1) // 1
testSubject.next(2) // 3
testSubject.next(3) // 6

const testSubjectTwo = new Rx.Subject()
const objectScan = testSubject.scan((acc, curr) => Object.assign({}, acc, curr), {})
const subscribe = objectScan.subscribe(val => console.log('Accumulated object: ', val))

testSubject.next({ name: 'Joe' }) // { name: 'Joe' }
testSubject.next({ age: 30 }) // { name: 'Joe', age: 30 }
testSubject.next({ favoriteLanguage: 'JavaScript' }) // { name: 'Joe', age: 30, favoriteLanguage: 'JavaScript' }
```

#### share
##### signature: `share(): Observable`

在多个 subscriber 中共享 observable 。  
([demo](http://jsbin.com/jobiyomari/1/edit?js,console) | [dcos](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-share))

```javascript
const source = Rx.Observable.timer(1000)
const example = source
  .do(() => console.log('*** SIDE EFFECT ***'))
  .mapTo('*** RESULT ***')
  
/*
 * 如果不 share 的话，SIDE EFFECT 会执行两次
 * 输出：
 * *** SIDE EFFET ***
 * *** RESULT ***
 * *** SIDE EFFET ***
 * *** RESULT ***
*/
const subscribe = example.subscribe(console.log)
const subscribeTwo = example.subscribe(console.log)

// 在 subscriber 中共享 observable
const shareExample = example.share()

/*
 * 如果 share 的话，SIDE EFFECT 只会执行一次
 * 输出：
 * *** SIDE EFFECT ***
 * *** RESULT ***
 * *** RESULT ***
 */
const subscribeThree = shareExample.subscribe(console.log)
const subscribeFour = shareExample.subscribe(console.log)
```

#### single
##### signature: `signature: single(a: Function): Observable`

emit 符合条件的一个单独的值。  
([demo](http://jsbin.com/solecibuza/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-single))

```javascript
// emit (1,2,3,4,6)
const source = Rx.Observable.of([1,2,3,4,5])
// emit 符合条件的一个 value 
const example = source.single(val => val === 4)
// 输出：4
const subscribe = example.subscribe(console.log)
```

#### skip
##### signature: `skip(the: Number): Observable`

跳过指定数量的 emitted value 。  
([demo](http://jsbin.com/hacepudabi/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-skip))

```javascript
const source = Rx.Observable.interval(1000)
// 跳过前5个 emitted value 
const example = source.skip(5)
// 输出：5..6..7..8...
const subscribe = example.subscribe(console.log)
```

#### skipUntil
##### signature: `skipUntil(the: Observable): Observable`

跳过 source emit 的值，直到 inner Observable emit 。  
([demo](http://jsbin.com/tapizososu/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-skipUntil))

```javascript
const source = Rx.Observable.interval(1000)
// 跳过 source emit 的值，直到 inner Observable emit 。
const example = source.skipUntil(Rx.Observable.timer(6000))
// 输出：5...6...7...8...
const subscribe = example.subscribe(console.log)
```

#### skipWhile
##### signature: `skipWhile(predicate: Function): Observable`

跳过 source emit 的值，直到给定的条件为 false 。  
([demo]() | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-skipWhile))

```javascript
const source = Rx.Observable.interval(1000)
const example = source.skipWhile(val => val < 5)
// 输出：5...6...7...8.......
const subscribe = example.subscribe(console.log)
```

#### startWith
##### signature: `startWith(an: Values): Observable`

指定第一个 emit 的值。  
([demo](http://jsbin.com/jeyakemume/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-startWith))

```javascript
const source = Rx.Observable.of([1, 2, 3])
const example = source.startWith(0)
// 输出：0,1,2,3
const subscribe = example.subscribe(console.log)

const sourceTwo = Rx.Observable.of('World! ', 'Goodbye', 'World!')
const exampleTwo = sourceTwo
  .startWith('Hello')
  .scan((acc, curr) => `${acc} ${curr}`)
  
// 输出：
// Hello
// Hello Wrold!
// Hello World! Goodybe
// Hello World! Goodbye World!
const subscribe = exmapleTwo.subscribe(console.log)
```

#### switchMap
##### signature: `switchMap(a: Observable): Observable`

当 source emit 的时候，切换到 inner Observable ，并且 emit 他已经 emit 过的值。  
([demo](http://jsbin.com/decinatisu/1/edit?js,console,output) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap))

```javascript
const source = Rx.Observable.timer(0, 5000)
// 切换到 inner Observable ，emit 已经 emit 过的值
const example = source.switchMap(() => Rx.Observable.interval(500))
// 输出：0,1,2,3,4,5,6,7,8,9.....0,1,2,3,4,5,6,7,8,9
const subscribe = example.subscribe(console.log)

const sourceTwo = Rx.Observable.fromEvent(document, 'click')
// 如果下一个 click 在 3s 内发生的话，不会产生新的 msg('Hello, I made it!')
const exampleTwo = sourcwTwo.switchMap(val => Rx.Observable.interval(3000).mapTo('Hello, I made it!'))
// 输出：(click)...3s...'Hello, I made it!'...(click)...2s(click)...
const subscribeTwo = exampleTwo.subscribe(console.log)
```

#### window
##### signature: `window(windowBoundaries: Observable): Observable`

类似于 `buffer` ，但是返回的是 nested Observable 。  
([demo](http://jsbin.com/jituvajeri/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-window))

```javascript
// 马上 emit ，然后每隔1s emit
const source = Rx.Observable.timer(0, 1000)
const example = source
  .window(Rx.Observable.interval(3000))
  
const count = example.scan((acc, curr) => acc + 1, 0)
  
/*
 * window 1:
 * 0
 * 1
 * 2
 * window 2:
 * 3
 * 4
 * 5
*/
const subscribe = count.subscribe(val => console.log(`Window ${val}:`))
const subscribeTwo = example.mergeAll().subscribe(val => console.log(val))
```

#### windowCount
##### signature: `windowCount(windowSize: number, startWindowEvery: number): Observable`

source emit 的值是 Observable ，emit 的间隔是指定的时间。  
([demo](http://jsbin.com/nezuvacexe/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-windowCount))

```javascript
// 每隔1s emit
const source = Rx.Observable.interval(1000)
const example = source
  // 每隔4个值就开始新的 window
  .windowCount(4)
  .do(() => console.log('NEW WINDOW!'))
  
const subscribeTwo = example
  // window emit 的是 nested Observable
  .mergeAll()
  .sbuscribe(console.log)
/*
 * 输出：
 * NEW WINDOW!
 * 0
 * 1
 * 2
 * 3
 * NEW WINDOW!
 * 4
 * 5
 * 6
 * 7
*/
```

#### windowTime
##### signature: `windowTime(windowTimeSpan: number, windowCreationInterval: number, scheduler: Scheduler): Observable`

跟 `bufferTime` 一样，除了 emit 的值是 nested Observable 而不是一个 array 。  
([demo](http://jsbin.com/mifayacoqo/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-windowTime))

```javascript
const source = Rx.Observable.timer(0, 1000)
const example = source
  // 每隔3s开始一个新的 window
  .windowTime(3000)
  .do(() => console.log('New Window!'))
  
const subscribe = example
  // window emit 的值为 nested Observable
  .mergeAll()
  
/*
 * 输出
 * New Window:
 * 0
 * 1
 * 2
 * New Window:
 * 3
 * 4
 * 5
 */
 .subscribe(console.log)
```

#### windowToggle
##### signature: `windowToggle(openings: Observable, closingSelector: function(value): Observable): Observable`

跟 `bufferTime` 一样，除了 emit 的值是 nested Observable 而不是一个 array 。  
([demo](http://jsbin.com/xasofupuka/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-windowToggle))

```javascript
const source = Rx.Observable.timer(0, 1000)
// 在第5s的时候 toggle window
const toggle = Rx.Observable.interval(5000)
const example = source
  // 每隔5s 打开 window
  .windowToggle(toggle, val => Rx.Observable.interval(val * 1000))
  .do(() => console.log('New Window!'))
  
const subscribe = example
  // window emit 的值为 nested Observable
  .mergeAll()
  
/*
 * New Window!
 * New Window!
 * 10
 * New Window!
 * 15
 * 16
 * ...
 */
```

#### windowWhen
##### signature: `windowWhen(closingSelector: function(): Observable): Observable`

跟 `bufferWhen` 一样，除了 emit 的值是 nested Observable 而不是一个 array 。  
([demo](http://jsbin.com/tuhaposemo/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-windowWhen))

```javascript
const source = Rx.Observable.timer(0, 1000)
const example = source
  // 每隔5s就关闭wndow，并且 emit 从 source 中缓冲好的值
  .windowWhen(val => Rx.Observable.interval(5000))
  .do(() => console.log('New Window!'))
  
const subscribe = example
  .mergeAll()
  /*
   * New Window!
   * 0
   * 1
   * 2
   * 3
   * 4
   * New Window!
   * 5
   * 6
   * 7 
   * 8
   * 9
   */
    .subscribe(console.log)
```

#### withLatestFrom
##### signature: `withLatestFrom(other: Observable, project: Function): Observable`

当 source emit 的时候，同时也返回另一个 Obserable 最近 emit 的那个值。  
([demo](http://jsbin.com/xehucaketu/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-withLatestFrom))

```javascript
const source = Rx.Observable.interval(5000)
const secondSource = Rx.Observable.interval(1000)
const example = source
  .withLatestFrom(secondSource)
  .map(([first, second]) => `First Source(5s): ${first} Second Source(1s): ${second}`)
  
/*
 * First Source(5s): 0 Second Source(1s): 4
 * First Source(5s): 1 Second Source(1s): 9
 * First Source(5s): 2 Second Source(1s): 14
 */
const subscribe = example.subscribe(console.log)


// withLastest 比 source 慢
const exampleTwo = secondSource
  .withLatestFrom(source)
  .map(([first, second]) => `Source(1s): ${first} Latest from(5s): ${second}`)
  
/*
 * Source(1s): 4 Latest Lastest from(5s): 0
 * Source(1s): 5 Latest Lastest from(5s): 0
 * Source(1s): 6 Latest Lastest from(5s): 0
 */
const subscribeTwo = exampleTwo.subscribe(console.log)
```

#### zip
##### signature: `zip(observables: *): Observable`

等到所有的 Observable 都 emit 之后，才作为数组返回。  
([demo](http://jsbin.com/torusemimi/1/edit?js,console) | [official docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-zip))

```javascript
const sourceOne = Rx.Observable.of('Hello')
const sourceTwo = Rx.Observable.of('World')
const sourceThree = Rx.Observable.of('Goodbye')
const sourceFour = Rx.Observable.of('World!')
// 等到所有的 Observable 都 emit 之后，才把它们作为数组 emit 出去
const example = Rx.Observable
  .zip(
    sourceOne,
    sourceTwo.delay(1000),
    sourceThree.delay(2000),
    sourceFour.delay(3000)
  )
// 输出：['Hello', 'World', 'Goodbye', 'World!']
const subscribe = example.subscribe(console.log)

// 每隔1s emit
const interval = Rx.Observable.interval(1000)
// 当一个 Observable complete 后，再也不会 emit 任何值
const exampleTwo = Rx.Observable
  .zip(
    interval,
    iterval.take(2)
  )
// 输出：[0, 0]...[1,1]
const subscribeTwo = exampleTwo.subscribe(console.log)
```