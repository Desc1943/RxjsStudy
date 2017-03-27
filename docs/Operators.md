# Operator

Observable 有许多创建实例的方法，称为 creation operator。

下面列出 RxJS 常用的 creation operator：
* [map](#map)
* [mapTo](#mapTo)
* [filter](#filter)
* [first](#first)
* [take](#take)
* [takeUntil](#takeUntil)
* [concatAll](#concatAll)

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
newest: -----0-----------2--...
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

## [take](#)
take 方法有一个数值(Number)参数，会取相应数值的 `Observable` 发出的值，然后直接进入 complete 状态。
```javascript
const source = Observable.interval(500);
source.take(2);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source: -----0-----1-----2--...
        take(2)
newest: -----0-----1|
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
click:  ---------------c
newest: -----0-----1---|
```

## [concatAll](#)
concatAll 用来将二个 `Observable` 转化为一个 `Observable` 。有点像二维数组，转化为一维数组的感觉。
```javascript
const click = Observable.fromEvent(document.body, 'click');
const source = click.map( e => Observable.of(1,2,3))
  .concatAll();
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
>>* 特别说明，`concatAll` 只会按一个 `Observable` 为一个整体处理。只有处理完完整的 `Observable` 才会进行下一个。
```javascript
const obs1 = Observable.interval(200).take(4);
const obs2 = Observable.interval(400).take(2);
const obs3 = Observable.interval(1000).take(1);
const source = Observable.of(obs1, obs2, obs3)
  .concatAll();
```
> 此时的 `source` 的Marble diagrams就像这样
```
source: (O1, O2, O3)|
         /    |    \
 -0-1-2-3| --0--1| -----0|
        concatAll()
newest: -0-1-2-3--0--1-----0|
```