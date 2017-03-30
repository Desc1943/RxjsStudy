# Operator

Observable 有许多创建实例的方法，称为 creation operator。

下面列出 RxJS 常用的 creation operator：
* [startWith](#startWith)
* [map](#map)
* [mapTo](#mapTo)
* [filter](#filter)
* [first](#first)
* [last](#last)
* [skip](#skip)
* [take](#take)
* [takeLast](#takeLast)
* [takeUntil](#takeUntil)
>  UI 互动相关
* [delay](#delay)
* [delayWhen](#delayWhen)
> 性能优化 （比较常用到的如滚动条，输入，连续点击）
* [throttle](#throttle) (只要达到条件必定会执行一次)
* [throttleTime](#throttleTime)
* [debounce](#debounce) (如果条件时间内执行完，直接发送值。否则直到执行完毕，再达到该时间才发送值。)
* [debounceTime](#debounceTime)
* [distinct](#distinct)
* [distinctUntilChanged](#distinctUntilChanged)
> transformation operators 
* [scan](#scan)
* [buffer](#buffer)
* [bufferTime](#bufferTime)
* [bufferCount](#bufferCount)
> * [bufferToggle](#bufferToggle)
> * [bufferWhen](#bufferWhen)
> 处理 Observable Operator
* [concat](#concat)
* [concatAll](#concatAll)
* [merge](#merge)
* [combineLatest](#combineLatest)
* [withLatestFrom](#withLatestFrom)
* [zip](#zip)
> 错误处理
* [catch](#catch)
* [retry](#retry)
* [retryWhen](#retryWhen)
* [repeat](#repeat)

### [startWith](#)
startWith 可以初始化第一次发出的数据。
```javascript
const source = Observable.interval(500);
source.startWith(100);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source: -----0-----1-----2--...
        startWith(100)
newest: 100-----0-----1-----2--...
```

### [map](#)
map 方法会将 `Observable` 上一次发送的值作为 callback 参数，然后返回一个新的值重新发送出去。
```javascript
const source = Observable.interval(500);
source.map( x => x+1);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source: -----0-----1-----2--...
        map(x => x+1)
newest: -----1-----2-----3--...
```

### [mapTo](#)
mapTo 方法会将 `Observable` 上一次发送的值全部改写为统一值。
```javascript
const source = Observable.interval(500);
source.mapTo(2);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source: -----0-----1-----2--...
        mapTo(2)
newest: -----2-----2-----2--...
```

### [filter](#)
filter 方法会将 `Observable` 上一次发送的值作为参数传入 callback , callback 回传的值为 `true` 时发出，否则过滤。
```javascript
const source = Observable.interval(500);
source.filter( x => x%2 === 0 );
```
> 此时的 `source` 的Marble diagrams就像这样
```
source: -----0-----1-----2--...
        filter( x => x%2 ===0 )
newest: -----0----- -----2--...
```

### [first](#)
first 方法只会取得 `Observable` 第一次发出的值，然后直接进入 complete 状态。
```javascript
const source = Observable.interval(500);
source.first();
```
> 此时的 `source` 的Marble diagrams就像这样
```
source: -----0-----1-----2--...
        first()
newest: -----0|
```

### [last](#)
last 方法只会取得 `Observable` 最后一次发出的值。
> 注意：last 必须等待 Observable 执行完成时才执行
```javascript
const source = Observable.interval(500).take(3);
source.last();
```
> 此时的 `source` 的Marble diagrams就像这样
```
source: -----0-----1-----2|
        last()
newest: ----- ----- -----2|
```

### [skip](#)
skip 方法有一个数值(Number)参数，会跳过相应数值的 `Observable` 发出的值。
```javascript
const source = Observable.interval(500);
source.skip(2);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source: -----0-----1-----2--...
        skip(2)
newest: ----- ----- -----2--...
```

### [take](#)
take 方法有一个数值(Number)参数，会取相应数值的 `Observable` 发出的值，然后直接进入 complete 状态。
```javascript
const source = Observable.interval(500);
source.take(2);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source: ----0----1----2--...
        take(2)
newest: ----0----1|
```

### [takeLast](#)
takeLast 与 take 相反，取最后发出几个参数。
> 注意：takeLast 必须等待 Observable 执行完成时才执行，且执行的结果都是同步发出的。
```javascript
const source = Observable.interval(500).take(4);
source.takeLast(2);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source: -----0-----1-----2-----3--...
        takeLast(2)
newest: ----- ----- ----- -----(2,3)|
```

### [takeUntil](#)
takeUntil 常会使用到，会在某一个条件满足时直接让 `Observable` 进入 complete 状态。
> 还记得之前的 `unsubscribe` 吗？一般我们不会使用它，而是使用 `takeUntil`
```javascript
const source = Observable.interval(500);
const click = Observable.fromEvent(document.body, 'click');
source.takeUntil(click);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source: -----0-----1-----2--...
click:  ----- ----- ---c
newest: -----0-----1---|
```

### [delay](#)
delay 可以延迟 Observable 一开始发送的元素的时间点.可以是 Number(ms) 也可以是 new Date()。
```javascript
const source1 = Observable.interval(200);
const source = source1.delay(500);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source1: --0--1--2--3--4--5--6-...
         delay(500)
source:  -------0--1--2---3-...
```

### [delayWhen](#)
delayWhen 作用跟 delay 很像。最大的差别在于 delayWhen 可以影响到每一个元素，且需要传一个 callback 并回传一个 Observable 。
> callback 影响的时间是总体时间，如果设置的时间比当前累计时间短，则按照source1设置的规定时间发送数据。
```javascript
const source1 = Observable.interval(200);
const source = source1.delayWhen(x => Observable.interval(200 * x * x));
```
> 此时的 `source` 的Marble diagrams就像这样
```
source1: --0--1--2--3--4--5--6-...
         delayWhen(x => Observable.interval(200 * x * x))
source:  --0----1------2--------3--...
```

### [distinct](#)
distinct 可以直接调用也可以通过传入 callback 来选择性筛选。而且它还存在第二个参数 Observable 关于某个间歇性发出数据，这时候它会将 `distinct` 用来对比的 Set 清空，重新比对。不过通常我们使用 [distinctUntilChanged](#distinctUntilChanged) 来完成
> 直接调用，筛选默认传递的值
```javascript
const source = Observable.from([1,2,3,1,4,2]);
source.distinct();
```
>> 此时的 `source` 的Marble diagrams就像这样
```
source: (1,2,3,1,4,2)|
        distinct()
newest: (1,2,3,4)|
```
> 传入 callback 时,选择性的过滤。由于比对的都是内存地址，所以 callback很有必要！
```javascript
const source = Observable.from([{name:'a'},{name:'c'},{name:'a'},{name:'b'}]);
source.distinct(o => o.name);
```
>> 此时的 `source` 的Marble diagrams就像这样
```
source: ({name:'a'},{name:'c'},{name:'a'},{name:'b'})|
        distinct(o => o.name)
newest: ({name:'a'},{name:'c'},{name:'b'})|
```

### [distinctUntilChanged](#)
distinctUntilChanged 直接调用。比较的值是二个相邻的值，如果相同过滤之。
```javascript
const source = Observable.from([1,2,1,4,4,2,2]);
source.distinctUntilChanged();
```
>> 此时的 `source` 的Marble diagrams就像这样
```
source: (1,2,1,4,4,2,2)|
        distinctUntilChanged()
newest: (1,2,1,4,2)|
```

### [scan](#)
Observable 版本的 reduce。reduce方法需要传入2个参数，一个是 callback ，另一个(**可选**)是起始状态。
> scan 与 reduce 最大的区别在于 scan 一定会回传一个 Observable 实例，而 reduce 最后回传的值可能是任何数据类型。
```javascript
const source = Observable.from('hello')
  .zip(Observable.interval(500), (x, y) => x);
source.scan((origin, next) => origin + next, '_');
```
> 此时的 `source` 的Marble diagrams就像这样
```
source: -----h-----e-----l-----l-----0|
        scan((origin, next) => origin + next, '_')
newest: -----(_h)-----(_he)-----(_hel)-----(_hell)-----(_hello)|
```

### [buffer](#)
buffer 参数发出数据为基准。接收一个 Observable 参数，每次这个参数每次发出数据时，会将主体此时间内发送的数据转为数组。
> 同一时刻时，主体发出的数据不会被转为那一时刻的数组。
```javascript
const source1 = Observable.interval(200);
const source2 = Observable.interval(600);
const source = source1.buffer(source2);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source1: --0--1--2--3--4--5--6--7-...
source2: ------0------1------2---...
         source1.buffer(source2);
source:  ------([0,1])------([2,3,4])------([5,6,7])--...
```

### [bufferTime](#)
bufferTime 以时间为基准。接收一个 Number(ms) 参数，每次达到时间间隔会将主体此时间内发送的数据转为数组。
> 我们可以利用 bufferTime 做一些时间过滤，比如搜索，鼠标连点等
```javascript
const source1 = Observable.interval(200);
const source = source1.bufferTime(600);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source1: --0--1--2--3--4--5--6--7-...
         source1.bufferTime(600);
source:  ------([0,1])------([2,3,4])------([5,6,7])--...
```

### [bufferCount](#)
bufferCount 数量为基准。接收一个 Number 参数，主体发送的数据数量达到这个数量就将其转为数组。
```javascript
const source1 = Observable.interval(200);
const source = source1.bufferCount(3);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source1: --0--1--2--3--4--5--6--7--8-...
         source1.bufferCount(3)
source:  ------([0,1,2])------([3,4,5])------([6,7,8])--...
```

### [throttle](#)
throttle 参数发出数据为基准。接收一个 Observable 参数，每次这个参数每次发出数据时，会将主体此时间内最后的数据发出。
> 每次主体产生新值都会替代 cache 中的缓存值。只有持续的事件完毕才会触发。
```javascript
const source1 = Observable.fromEvent(document, 'click');
const source = source1.throttle(() => Observable.interval(500));
```
> 持续点了3秒，持续10下结束后，过了500ms才发送值。throttle 与 debounce区别在于期间会发送一次值.
```
source1: ---c---c---c---c---c---c---c---c---c---c|
         source1.throttle(() => Observable.interval(500))
source:  -----(M)-----(M)-----(M)-----(M)-----(M)-----(M)|
```
### [throttleTime](#)
throttleTime 时间为基准。接收一个 Number(ms) 参数，每次达到参数时间间隔就会将主体此时间最后 cache 的数据发送出去。
```javascript
const source1 = Observable.fromEvent(document, 'click');
const source = source1.throttleTime(500);
```
> 持续点了3秒，持续10下结束后，过了500ms才发送值。throttleTime 与 debounceTime 区别在于期间会发送一次值.
```
source1: ---c---c---c---c---c---c---c---c---c---c|
         source1.throttleTime(500)
source:  -----(M)-----(M)-----(M)-----(M)-----(M)-----(M)|
```
### [debounce](#)
debounce 参数发出数据为基准。接收一个 Observable 参数，每次这个参数每次发出数据时，会将主体此时间内最后的数据发出。
> 每次主体产生新值都会替代 cache 中的缓存值。只有持续的事件完毕才会触发。
```javascript
const source1 = Observable.fromEvent(document, 'click');
const source = source1.debounce(() => Observable.interval(500));
```
> 持续点了3秒，持续10下结束后，过了500ms才发送值。throttle 与 debounce区别在于期间会发送值.
```
source1: ---c---c---c---c---c---c---c---c---c---c|
         source1.debounce(() => Observable.interval(500))
source:  -----(M)|
```

### [debounceTime](#)
debounceTime 时间为基准。接收一个 Number(ms) 参数，如果条件在参数时间内执行完，直接发送值。否则直到执行完毕，再达到该时间才发送值。
```javascript
const source1 = Observable.fromEvent(document, 'click');
const source = source1.debounceTime(500);
```
> 持续点了3秒，持续10下结束后，过了500ms才发送值。throttleTime 与 debounceTime 区别在于期间会发送一次值.
```
source1: ---c---c---c---c---c---c---c---c---c---c|
         source1.debounceTime(500)
source:  -----(M)|
```

### [concat](#)
concat 用来将多个 `Observable` 转化为一个 `Observable` 。有点像二维数组，转化为一维数组的感觉。
> 特别说明，`concat` 只会按一个 `Observable` 为单位处理。只有处理完完整的 `Observable` 才会进行下一个。
```javascript
const source1 = Observable.interval(1000).take(2);
const source2 = Observable.of(2,3);
const source3 = Observable.of(4,5);
const source = Observable.concat(source1, source2, source3);
// 或者 source = source.concat(source2, source3);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source1: -----0-----1|
source2: (2,3)|
source3: (4,5)|
          concat()
newest: -----0-----1(2,3)(4,5)|
```

### [concatAll](#)
同 concat ，但有些许不一样，直接看案例就知道了。
```javascript
const click = Observable.fromEvent(document.body, 'click');
const source = click.map( e => Observable.of(1,2,3));
source.concatAll();
```
> 此时的 `source` 的Marble diagrams就像这样
```
click:  ---c----------c----...
        map( e => Observable.of(1,2,3))
source: ---O----------O----...
           |          |
           (1,2,3)|   (1,2,3)|
        concatAll()
newest: ---(1,2,3)----------(1,2,3)----...
```
> 同 concat 必须等待前一次 Observable 完成，才能执行下一个。
```javascript
const obs1 = Observable.interval(200).take(4);
const obs2 = Observable.interval(400).take(2);
const obs3 = Observable.interval(1000).take(1);
const source = Observable.of(obs1, obs2, obs3);
source.concatAll();
```
> 此时的 `source` 的Marble diagrams就像这样
```
source: (O1, O2, O3)|
         /    |    \
 -0-1-2-3| --0--1| -----0|
        concatAll()
newest: -0-1-2-3--0--1-----0|
```

### [merge](#)
concat 的并行版本。同样用于合并多个 Observable。
```javascript
const source1 = Observable.interval(1000).take(2);
const source2 = Observable.interval(1000).take(3);
const source3 = Observable.of(4,5);
const source = Observable.merge(source1, source2, source3);
// 或者 source = source.merge(source2, source3);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source1: -----0-----1|
source2: -----0-----1-----2|
source3: (4,5)|
          merge()
newest: (4,5)-----00-----11-----2|
```

### [combineLatest](#)
combineLatest 可以合并多个 Observable 对象。每添加一个 Observable 就会在 callback 添加一个参数表示 Observable 送出的值。
> 不管是 source 还是 newest 送出值來，只要另一方曾有送出过值(有最后的值)，就会执行 callback 并送出新的值，这就是 combineLatest。
```javascript
const source1 = Observable.interval(500).take(4);
const source2 = Observable.interval(1000).take(3);
const source = Observable.combineLatest(source1, source2, (x,y) => x+y);
// 或者 source = source1.combineLatest(source2, (x,y) => x+y);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source1: -0-1-2-3|
source2: --0--1--2|
         combineLatest(source1, source2, (x,y) => x+y);
newest: --01-2-34--5|
```
combineLatest 常用在运算多个因子的结果，例如最常见的 BMI 计算，我们身高变化时就拿上一次的体重计算新的 BMI，当体重变化时就拿上一次的身高计算 BMI，這就很适合用 combineLatest 来处理！

### [withLatestFrom](#)
withLatestFrom 类似 combineLatest ,但它具有主从关系。只有主的 Observable 发出新数据时，它才会执行 `callback` 。
```javascript
const source1 = Observable.interval(500).take(4);
const source2 = Observable.interval(1000).take(3);
const source = source1.withLatestFrom(source2, (x,y) => x+y);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source:  --0--1--2|
source1: -0-1-2-3|
         withLatestFrom(source1, source2 (x,y) => x+y);
newest: --1--2--4|
```

### [zip](#)
zip 它会取出 所有 Observable 的相同位数的数据，进行处理。一旦有 Observable 无数据发送，即结束。
> 建议平时不要乱使用 `zip` ，因为 `zip` 必须 `cache` 没处理的元素。但两个 Observable 一个快，一个慢，就会造成 `cache` 很多元素，等待比较慢的 Observable 很可能造成内存泄露。
```javascript
const source1 = Observable.interval(500).take(4);
const source2 = Observable.interval(1000).take(3);
const source = Observable.zip(source1, source2, (x,y) => x+y);
// 或者 source = source1.zip(source2, (x,y) => x+y);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source1: -0-1-2-3|
source2: --0--1--2|
         zip(source1, source2 (x,y) => x+y);
newest: --0--2--4|
```
