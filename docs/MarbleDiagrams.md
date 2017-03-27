# Marble diagrams
将订购的Observable的视图，我们称之为Marble diagrams。
## [基本语法](#)
> `-` 表示时间
```
-------...
```
> 大写 `X` 表示发生错误
```
---------X
```
> `|` 表示Observable结束
```
----------|
```
> `()` 表示同步发出
```
(1,2,3,4)|
```

## [举例](#)
### 案例一
每个 500ms 发出
```javascript
const source = Observable.interval(500);
```
> 此时的 `source` 的Marble diagrams就像这样
```
    -----0-----1-----2--...
```

### 案例二
同步发出
```javascript
const source = Observable.of(1,2,3);
```
> 此时的 `source` 的Marble diagrams就像这样
```
(1,2,3)|
```
### 案例三
通过 `Map` 改造发出
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
### 案例四
通过 `timer` 创建不同时间发出，再通过 `Map` 改造
```javascript
const source = Observable.timer(100,300);
source.map( x => x+1);
```
> 此时的 `source` 的Marble diagrams就像这样
```
source: -0---1---2---3--...
        map(x => x+1)
newest: -1---2---3---4--...
```