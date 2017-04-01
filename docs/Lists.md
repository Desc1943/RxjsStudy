## [Method](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)
| Method | Parameter  | Return |
|----------|----------|----------|
|[audit](#audit)|__durationSelector__: function(value: T): SubscribableOrPromise|Observable<T>|
|[auditTime](#audittime)|__duration__: number,<br/> __scheduler__: Scheduler|Observable<T>|
|[buffer](#buffer)|__closingNotifier__: Observable<any>|Observable<T[]>|
|[bufferCount](#buffercount)|__bufferSize__: number,<br/> __startBufferEvery__: number|Observable<T[]>|
|[bufferTime](#buffertime)|__bufferTimeSpan__: number,<br/> __bufferCreationInterval__: number,<br/> __maxBufferSize__: number,<br/> __scheduler__: Scheduler|Observable<T[]>|
|[bufferToggle](#buffertoggle)|__openings__: SubscribableOrPromise<O>,<br/> __closingSelector__: function(value: O): SubscribableOrPromise|Observable<T[]>|
|[bufferWhen](#bufferwhen)|__closingSelector__: function(): Observable|Observable<T[]>|
|[catch](#catch)|__selector__: function|Observable|
|[combineAll](#combineall)|__project__: function|Observable|
|[combineLatest](#combinelatest)|__other__: ObservableInput,<br/> __project__: function|Observable|
|[concat](#concat)|__other__: ObservableInput,<br/> __scheduler__: Scheduler|Observable|
|[concatAll](#concatall)|()|Observable|
|[concatMap](#concatmap)|__project__: function(value: T, ?index: number): ObservableInput,<br/> __resultSelector__: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any|Observable|
|[concatMapTo](#concatmapto)|__innerObservable__: ObservableInput,<br/> __resultSelector__: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any|Observable|
|[count](#count)|__predicate__: function(value: T, i: number, source: Observable<T>): boolean|Observable|
|[debounce](#debounce)|__durationSelector__: function(value: T): SubscribableOrPromise|Observable|
|[debounceTime](#debouncetime)|__dueTime__: number,<br/> __scheduler__: Scheduler|Observable|
|[defaultIfEmpty](#defaultifempty)|__defaultValue__: any|Observable|
|[delay](#delay)|__delay__: number/Date,<br/> __scheduler__: Scheduler|Observable|
|[delayWhen](#delaywhen)|__delayDurationSelector__: function(value: T): Observable,<br/> __subscriptionDelay__: Observable|Observable|
|[dematerialize](#dematerialize)|()|Observable|
|[distinct](#distinct)|__keySelector__: function,<br/> __flushes__: Observable|Observable|
|[distinctUntilChanged](#distinctuntilchanged)|__compare__: function|Observable|
|[distinctUntilKeyChanged](#distinctuntilkeychanged)|__key__: string,<br/> __compare__: function|Observable|
|[do](#do)|__nextOrObserver__: Observer/function, error: function,<br/> __complete__: function|Observable|
|[elementAt](#elementat)|__index__: number,<br/> __defaultValue__: T|Observable|
|[every](#every)|__predicate__: function,<br/> __thisArg__: any|Observable|
|[exhaust](#exhaust)|()|Observable|
|[exhaustMap](#exhaustmap)|__project__: function(value: T, ?index: number): ObservableInput,<br/> __resultSelector__: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any|Observable|
|[expand](#expand)|__project__: function(value: T, index: number),<br/> __concurrent__: number,<br/> __scheduler__: Scheduler|Observable|
|[filter](#filter)|__predicate__: function(value: T, index: number): boolean,<br/> __thisArg__: any|Observable|
|[find](#find)|predicate: __function__(value: T, index: number, source: Observable<T>): boolean,<br/> __thisArg__: any|Observable<T>|
|[findIndex](#findindex)|__predicate__: function(value: T, index: number, source: Observable<T>): boolean,<br/> __thisArg__: any|Observable|
|[first](#first)|__predicate__: function(value: T, index: number, source: Observable<T>): boolean,<br/> __resultSelector__: function(value: T, index: number): R, defaultValue: R|Observable<T/R>|
|[forEach](#foreach)|__next__: Function,<br/> __PromiseCtor__: PromiseConstructor|Promise|
|[groupBy](#groupby)|__keySelector__: function(value: T): K,<br/> __elementSelector__: function(value: T): R,<br/> __durationSelector__: function(grouped: GroupedObservable<K, R>): Observable<any>|Observable<GroupedObservable<K, R>>|
|[ignoreElements](#ignoreelements)|()|Observable|
|[isEmpty](#isempty)|()|Observable|
|[last](#last)|__predicate__: function|Observable|
|[letProto](#letproto)|__func__: *|Observable<R>|
|[lift](#lift)|__operator__: Operator|Observable|
|[map](#map)|__project__: function(value: T, index: number): R,<br/> __thisArg__: any|Observable<R>|
|[mapTo](#mapto)|__value__: any|Observable|
|[materialize](#materialize)|()|Observable<Notification<T>>|
|[max](#max)|__comparer__: Function|Observable|
|[merge](#merge)|__other__: ObservableInput,<br/> __concurrent__: number,<br/> __scheduler__: Scheduler|Observable|
|[mergeAll](#mergeall)|__concurrent__: number|Observable|
|[mergeMap](#mergemap)|__project__: function(value: T, ?index: number): ObservableInput,<br/> __resultSelector__: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any,<br/> __concurrent__: number|Observable|
|[mergeMapTo](#mergemapto)|__innerObservable__: ObservableInput,<br/> __resultSelector__: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any,<br/> __concurrent__: number|Observable|
|[mergeScan](#mergescan)|__accumulator__: function(acc: R, value: T): Observable<R>,<br/> __seed__: *,<br/> __concurrent__: number|Observable<R>|
|[min](#min)|__comparer__: Function|Observable<R>|
|[multicast](#multicast)|__subjectOrSubjectFactory__: Function/Subject, selector: Function|Observable|
|[observeOn](#observeon)|__scheduler__: *,<br/> __delay__: *| Observable<R>/WebSocketSubject<T>/Observable<T>|
|[pairwise](#pairwise)|()|Observable<Array<T>>|
|[partition](#partition)|__predicate__: function(value: T, index: number): boolean,<br/> __thisArg__: any| [Observable<T>, Observable<T>]|
|[pluck](#pluck)|__properties__: ...string|Observable|
|[publish](#publish)|__selector__: Function|*|
|[publishBehavior](#publishbehavior)|__value__: *|ConnectableObservable<T>|
|[publishLast](#publishlast)|()|ConnectableObservable<T>|
|[publishReplay](#publishreplay)|__bufferSize__: *,<br/> __windowTime__: *,<br/> __scheduler__: *|ConnectableObservable<T>|
|[race](#race)|()|Observable|
|[reduce](#reduce)|__accumulator__: function(acc: R, value: T, index: number): R,<br/> __seed__: R|Observable<R>|
|[repeat](#repeat)|__count__: number|Observable|
|[repeatWhen](#repeatwhen)|__notifier__: function(notifications: Observable): Observable|Observable|
|[retry](#retry)|__count__: number|Observable|
|[retryWhen](#retrywhen)|__notifier__: function(errors: Observable): Observable|Observable|
|[sample](#sample)|__notifier__: Observable<any>|Observable<T>|
|[sampleTime](#sampletime)|__period__: number,<br/> __scheduler__: Scheduler|Observable<T>|
|[scan](#scan)|__accumulator__: function(acc: R, value: T, index: number): R,<br/> __seed__: T/R|Observable<R>|
|[sequenceEqual](#sequenceequal)|__compareTo__: Observable,<br/> __comparor__: function|Observable|
|[share](#share)|()|Observable<T>|
|[single](#single)|__predicate__: Function|Observable<T>|
|[skip](#skip)|__count__: Number|Observable|
|[skipUntil](#skipuntil)|__notifier__: Observable|Observable<T>|
|[skipWhile](#skipwhile)|__predicate__: Function|Observable<T>|
|[startWith](#startwith)|__values__: ...T,<br/> __scheduler__: Scheduler|Observable|
|[subscribeOn](#)|__scheduler__: Scheduler|Observable<T>|
|[switch](#switch)|()|Observable<T>|
|[switchMap](#switchmap)|__project__: function(value: T, ?index: number): ObservableInput,<br/> __resultSelector__: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any|Observable|
|[switchMapTo](#switchmapto)|__innerObservable__: ObservableInput,<br/> __resultSelector__: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any|Observable|
|[take](#take)|__count__: number|Observable<T>|
|[takeLast](#takelast)|__count__: number|Observable<T>|
|[takeUntil](#takeuntil)|__notifier__: Observable|Observable<T>|
|[takeWhile](#takewhile)|__predicate__: function(value: T, index: number): boolean|Observable<T>|
|[throttle](#throttle)|__durationSelector__: function(value: T): SubscribableOrPromise|Observable<T>|
|[throttleTime](#throttletime)|__duration__: number,<br/> __scheduler__: Scheduler|Observable<T>|
|[timeInterval](#timeinterval)|__scheduler__: *|Observable<TimeInterval<any>>/WebSocketSubject<T>/Observable<T>|
|[timeout](#timeout)|__due__: number,<br/> __scheduler__: Scheduler|Observable<R>/WebSocketSubject<T>/Observable<T>|
|[timeoutWith](#timeoutwith)|__due__: *,<br/> __withObservable__: *,<br/> __scheduler__: *|Observable<R>/WebSocketSubject<T>/Observable<T>|
|[timestamp](#timestamp)|__scheduler__: *|Observable<Timestamp<any>>/WebSocketSubject<T>/Observable<T>|
|[toArray](#toarray)|()| Observable<any[]>/WebSocketSubject<T>/Observable<T>|
|[toPromise](#topromise)|__PromiseCtor__: *|Promise<T>|
|[window](#window)|__windowBoundaries__: Observable<any>| Observable<Observable<T>>|
|[windowCount](#)|__windowSize__: number,<br/> __startWindowEvery__: number|Observable<Observable<T>>|
|[windowToggle](#windowtoggle)|__openings__: Observable<O>,<br/> __closingSelector__: function(value: O): Observable|Observable<Observable<T>>|
|[windowWhen](#windowwhen)|__closingSelector__: function(): Observable|Observable<Observable<T>>|
|[withLatestFrom](#withlatestfrom)|__other__: ObservableInput,<br/> __project__: Function|Observable|
|[zipAll](#zipall)|__project__: *|Observable<R>/WebSocketSubject<T>/Observable<T>|
|[zipProto](#zipproto)|__observables__: *s|Observable<R>|

### [audit](#)
> (durationSelector: function(value: T): SubscribableOrPromise): Observable<T>

忽略由另一个可观察确定的持续时间的源值，然后从源可见的最新值中释放，然后重复此过程。
> 就像auditTime，但沉默持续时间是由最新的观察确定。
```javascript
Observable.interval(500).audit(() => Observable.fromEvent(document, 'click'));
// 1 // 3
```
> 此时 Marble diagrams:
```
Obs1:   -----0-----1-----2-----3-----4--...
Obs2:   ----------c----------c|
        Obs1.audit(() => Obs2)
source: ----------1----------3|
```
> See: [auditTime](#audittime), [debounce](#debounce), [delayWhen](#delaywhen), [sample](#sample), [throttle](#throttle)

### [auditTime](#)
> (duration: number, scheduler: Scheduler): Observable<T>

忽略持续时间(ms)的源值，然后从可观察源发出最新值，然后重复此过程。
> 就像audit，但沉默持续时间是由传参 Number(ms) + 忽略的时间(ms)。
```javascript
Observable.interval(200).auditTime(400);
// 2 // 5 // 8 ...
```
> 此时 Marble diagrams:
```
Obs1:   --0--1--2--3--4--5--6--7--8-...
        auditTime(400)
source: ------2------5------8--|
```
> See: [audit](#audit), [debounceTime](#debouncetime), [delay](#delay), [sampleTime](#sampletime), [throttleTime](#throttletime)

### [buffer](#)
> (closingNotifier: Observable<any>): Observable<T[]>

将过去的值作为数组收集，并且只有当另一个观察到的发射时才发出该数组。
> 取值为 Obs1 持续时间内发送的数据 cache 与 Obs2 时间间隔内的 开区间值。所以，但二点间有值则不取。
```javascript
Observable.interval(200).buffer(() => Observable.interval(400));
// [0] // [1,2] // [3,4] ...
```
> 此时 Marble diagrams:
```
Obs1:   --0--1--2--3--4--5--6--7--8-...
Obs2:   ----0----1----2----3----4--...
        Obs1.buffer(Obs2)
source: ----([0])----([1,2])----([3,4])--...
```
> See: [bufferCount](#buffercount), [bufferTime](#buffertime), [bufferToggle](#buffertoggle), [bufferWhen](#bufferwhen), [window](#window)

### [bufferCount](#)
> (bufferSize: number, startBufferEvery: number): Observable<T[]>

缓冲源观测值直到尺寸最大命中缓存了。
> 参数一：取的个数。 参数二：开始取的范围（以倍数增长,简单理解 0*200*4, 1*200*4...）
```javascript
Observable.interval(200).bufferCount(2,4);
// [0,1] // [4,5] // [8,9] ...
```
> 此时 Marble diagrams:
```
Obs1:   --0--1--2--3--4--5--6--7--8-...
        bufferCount(2,4)
source: ----([0,1])--------([4,5])--------([8,9])...
```
> See: [buffer](#buffer), [bufferTime](#buffertime), [bufferToggle](#buffertoggle), [bufferWhen](#bufferwhen), [pairwise](#pairwise)
, [windowCount](#windowcount)

### [bufferTime](#)
> (bufferTimeSpan: number, bufferCreationInterval: number, maxBufferSize: number, scheduler: Scheduler): Observable<T[]>

将过去的值作为数组收集，并定期发送这些数组。
> 像 `buffer` ，但它传入的是 Number(ms)
```javascript
Observable.interval(200).bufferTime(400);
// [0] // [1,2] // [3,4] ...
```
> 此时 Marble diagrams:
```
Obs1:   --0--1--2--3--4--5--6--7--8-...
Obs2:   ----0----1----2----3----4--...
        Obs1.buffer(Obs2)
source: ----([0])----([1,2])----([3,4])--...
```
> See: [buffer](#buffer), [bufferCount](#buffercount), [bufferToggle](#buffertoggle), [bufferWhen](#bufferwhen)

### [bufferToggle](#)
> (openings: SubscribableOrPromise<O>, closingSelector: function(value: O): SubscribableOrPromise): Observable<T[]>

缓冲源观测值结束时,发出 closingSelector 输出。
> 每次发出就会关闭 cache 等待下一次开启。切换业务逻辑使用？
```javascript
Observable.interval(200).bufferToggle(
  Observable.interval(400).startWith('s'), 
  x => {console.log(x)}
  );
// s // 0 // [3,4] ...
```
> 此时 Marble diagrams:
```
Obs1:   --0--1--2--3--4--5--6--7--8-...
Obs2:   ----0----1----2----3----4--...
        Obs1.buffer(Obs2)
source: ----([0])----([1,2])----([3,4])--...
```
> See: [buffer](#buffer), [bufferCount](#buffercount), [bufferToggle](#buffertoggle), [bufferWhen](#bufferwhen)
