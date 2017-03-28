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
> 处理 Observable Operator
* [concat](#concat)
* [concatAll](#concatAll)
* [merge](#merge)
* [combineLatest](#combineLatest)
* [withLatestFrom](#withLatestFrom)
* [zip](#zip)

## [startWith](#)
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

## [map](#)
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

## [mapTo](#)
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

## [filter](#)
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

## [first](#)
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

## [last](#)
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

## [skip](#)
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

## [take](#)
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

## [takeLast](#)
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

## [takeUntil](#)
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

## [concat](#)
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

## [concatAll](#)
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

## [merge](#)
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

## [combineLatest](#)
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

## [withLatestFrom](#)
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

## [zip](#)
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
