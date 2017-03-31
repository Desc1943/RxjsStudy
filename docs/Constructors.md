# [Method Summary](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)
| Method | Parameter| Return |
|----------|--------------------|----------|
|[$$observable]|() <br/>一个互操作点es7-observable定义的规范: https://github.com/zenparsing/es-observable|Observable|
|***audit***|(durationSelector: function(value: T): SubscribableOrPromise)<T> <br/>忽略上下文的Observable的间隔，而遵从参数内的Observable的间隔|Observable|
|***auditTime***|(duration: number, scheduler: Scheduler) <br/>忽略上下文的Observable的间隔，而遵从参数内Number(ms)间隔|Observable<T>|
|***buffer***|(closingNotifier: Observable<any>) <br/>接收一个 Observable 参数，每次这个参数发送数据时，会将主体此时间内`cache`的数据转为数组发送。|Observable<T[]>|
|***bufferCount***|(bufferSize: number, startBufferEvery: number) <br/>参数一：当发送数据个数达到时发送，参数二：开始的位置（它的倍数）|Observable<T[]>|
|***bufferTime***|(bufferTimeSpan: number, bufferCreationInterval: number, maxBufferSize: number, scheduler: Scheduler) <br/>参数一：首次取值间隔。参数二：往后间隔。参数三：每次取值的个数|	Observable<T[]>|
|***bufferToggle***|(openings: SubscribableOrPromise<O>, closingSelector: function(value: O): SubscribableOrPromise) <br/>|	Observable<T[]>|
|***bufferWhen***|(closingSelector: function(): Observable) <br/>类似`bufferTime`.但运作方式不同。开始会创建缓冲区，每次调用`callback`它会关闭缓冲区时。然后发送数据，又立即打开一个新的缓冲区并重复该过程。|	Observable<T[]>|

|***constructor***||``|__|	
catch(selector: function): Observable
Catches errors on the observable to be handled by returning a new observable or throwing an error.
|***constructor***||``|__|	
combineAll(project: function): Observable
Converts a higher-order Observable into a first-order Observable by waiting for the outer Observable to complete, then applying combineLatest.
|***constructor***||``|__|	
combineLatest(other: ObservableInput, project: function): Observable
Combines multiple Observables to create an Observable whose values are calculated from the latest values of each of its input Observables.
|***constructor***||``|__|	
concat(other: ObservableInput, scheduler: Scheduler): Observable
Creates an output Observable which sequentially emits all values from every given input Observable after the current Observable.
|***constructor***||``|__|	
concatAll(): Observable
Converts a higher-order Observable into a first-order Observable by concatenating the inner Observables in order.
|***constructor***||``|__|	
concatMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable
Projects each source value to an Observable which is merged in the output Observable, in a serialized fashion waiting for each one to complete before merging the next.
|***constructor***||``|__|	
concatMapTo(innerObservable: ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable
Projects each source value to the same Observable which is merged multiple times in a serialized fashion on the output Observable.
|***constructor***||``|__|	
count(predicate: function(value: T, i: number, source: Observable<T>): boolean): Observable
Counts the number of emissions on the source and emits that number when the source completes.
|***constructor***||``|__|	
debounce(durationSelector: function(value: T): SubscribableOrPromise): Observable
Emits a value from the source Observable only after a particular time span determined by another Observable has passed without another source emission.
|***constructor***||``|__|	
debounceTime(dueTime: number, scheduler: Scheduler): Observable
Emits a value from the source Observable only after a particular time span has passed without another source emission.
|***constructor***||``|__|	
defaultIfEmpty(defaultValue: any): Observable
Emits a given value if the source Observable completes without emitting any next value, otherwise mirrors the source Observable.
|***constructor***||``|__|	
delay(delay: number | Date, scheduler: Scheduler): Observable
Delays the emission of items from the source Observable by a given timeout or until a given Date.
|***constructor***||``|__|	
delayWhen(delayDurationSelector: function(value: T): Observable, subscriptionDelay: Observable): Observable
Delays the emission of items from the source Observable by a given time span determined by the emissions of another Observable.
|***constructor***||``|__|	
dematerialize(): Observable
Converts an Observable of Notification objects into the emissions that they represent.
|***constructor***||``|__|	
distinct(keySelector: function, flushes: Observable): Observable
Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
|***constructor***||``|__|	
distinctUntilChanged(compare: function): Observable
Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
|***constructor***||``|__|	
distinctUntilKeyChanged(key: string, compare: function): Observable
Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item, using a property accessed by using the key provided to check if the two items are distinct.
|***constructor***||``|__|	
do(nextOrObserver: Observer | function, error: function, complete: function): Observable
Perform a side effect for every emission on the source Observable, but return an Observable that is identical to the source.
|***constructor***||``|__|	
elementAt(index: number, defaultValue: T): Observable
Emits the single value at the specified index in a sequence of emissions from the source Observable.
|***constructor***||``|__|	
every(predicate: function, thisArg: any): Observable
Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
|***constructor***||``|__|	
exhaust(): Observable
Converts a higher-order Observable into a first-order Observable by dropping inner Observables while the previous inner Observable has not yet completed.
|***constructor***||``|__|	
exhaustMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable
Projects each source value to an Observable which is merged in the output Observable only if the previous projected Observable has completed.
|***constructor***||``|__|	
expand(project: function(value: T, index: number), concurrent: number, scheduler: Scheduler): Observable
Recursively projects each source value to an Observable which is merged in the output Observable.
|***constructor***||``|__|	
filter(predicate: function(value: T, index: number): boolean, thisArg: any): Observable
Filter items emitted by the source Observable by only emitting those that satisfy a specified predicate.
|***constructor***||``|__|	
find(predicate: function(value: T, index: number, source: Observable<T>): boolean, thisArg: any): Observable<T>
Emits only the first value emitted by the source Observable that meets some condition.
|***constructor***||``|__|	
findIndex(predicate: function(value: T, index: number, source: Observable<T>): boolean, thisArg: any): Observable
Emits only the index of the first value emitted by the source Observable that meets some condition.
|***constructor***||``|__|	
first(predicate: function(value: T, index: number, source: Observable<T>): boolean, resultSelector: function(value: T, index: number): R, defaultValue: R): Observable<T | R>
Emits only the first value (or the first value that meets some condition) emitted by the source Observable.
|***constructor***||``|__|	
forEach(next: Function, PromiseCtor: PromiseConstructor): Promise
|***constructor***||``|__|	
groupBy(keySelector: function(value: T): K, elementSelector: function(value: T): R, durationSelector: function(grouped: GroupedObservable<K, R>): Observable<any>): Observable<GroupedObservable<K, R>>
Groups the items emitted by an Observable according to a specified criterion, and emits these grouped items as GroupedObservables, one GroupedObservable per group.
|***constructor***||``|__|	
ignoreElements(): Observable
Ignores all items emitted by the source Observable and only passes calls of complete or error.
|***constructor***||``|__|	
isEmpty(): Observable
If the source Observable is empty it returns an Observable that emits true, otherwise it emits false.
|***constructor***||``|__|	
last(predicate: function): Observable
Returns an Observable that emits only the last item emitted by the source Observable.
|***constructor***||``|__|	
letProto(func: *): Observable<R>
|***constructor***||``|__|	
lift(operator: Operator): Observable
Creates a new Observable, with this Observable as the source, and the passed operator defined as the new observable's operator.
|***constructor***||``|__|	
map(project: function(value: T, index: number): R, thisArg: any): Observable<R>
Applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable.
|***constructor***||``|__|	
mapTo(value: any): Observable
Emits the given constant value on the output Observable every time the source Observable emits a value.
|***constructor***||``|__|	
materialize(): Observable<Notification<T>>
Represents all of the notifications from the source Observable as next emissions marked with their original types within Notification objects.
|***constructor***||``|__|	
max(comparer: Function): Observable
The Max operator operates on an Observable that emits numbers (or items that can be compared with a provided function), and when source Observable completes it emits a single item: the item with the largest value.
|***constructor***||``|__|	
merge(other: ObservableInput, concurrent: number, scheduler: Scheduler): Observable
Creates an output Observable which concurrently emits all values from every given input Observable.
|***constructor***||``|__|	
mergeAll(concurrent: number): Observable
Converts a higher-order Observable into a first-order Observable which concurrently delivers all values that are emitted on the inner Observables.
|***constructor***||``|__|	
mergeMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any, concurrent: number): Observable
Projects each source value to an Observable which is merged in the output Observable.
|***constructor***||``|__|	
mergeMapTo(innerObservable: ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any, concurrent: number): Observable
Projects each source value to the same Observable which is merged multiple times in the output Observable.
|***constructor***||``|__|	
mergeScan(accumulator: function(acc: R, value: T): Observable<R>, seed: *, concurrent: number): Observable<R>
Applies an accumulator function over the source Observable where the accumulator function itself returns an Observable, then each intermediate Observable returned is merged into the output Observable.
|***constructor***||``|__|	
min(comparer: Function): Observable<R>
The Min operator operates on an Observable that emits numbers (or items that can be compared with a provided function), and when source Observable completes it emits a single item: the item with the smallest value.
|***constructor***||``|__|	
multicast(subjectOrSubjectFactory: Function | Subject, selector: Function): Observable
Returns an Observable that emits the results of invoking a specified selector on items emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
|***constructor***||``|__|	
observeOn(scheduler: *, delay: *): Observable<R> | WebSocketSubject<T> | Observable<T>
|***constructor***||``|__|	
pairwise(): Observable<Array<T>>
Groups pairs of consecutive emissions together and emits them as an array of two values.
|***constructor***||``|__|	
partition(predicate: function(value: T, index: number): boolean, thisArg: any): [Observable<T>, Observable<T>]
Splits the source Observable into two, one with values that satisfy a predicate, and another with values that don't satisfy the predicate.
It's like filter, but returns two Observables: one like the output of filter, and the other with values that did not pass the condition.

|***constructor***||``|__|	
pluck(properties: ...string): Observable
Maps each source value (an object) to its specified nested property.
|***constructor***||``|__|	
publish(selector: Function): *
Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called before it begins emitting items to those Observers that have subscribed to it.
|***constructor***||``|__|	
publishBehavior(value: *): ConnectableObservable<T>
|***constructor***||``|__|	
publishLast(): ConnectableObservable<T>
|***constructor***||``|__|	
publishReplay(bufferSize: *, windowTime: *, scheduler: *): ConnectableObservable<T>
|***constructor***||``|__|	
race(): Observable
Returns an Observable that mirrors the first source Observable to emit an item from the combination of this Observable and supplied Observables.
|***constructor***||``|__|	
reduce(accumulator: function(acc: R, value: T, index: number): R, seed: R): Observable<R>
Applies an accumulator function over the source Observable, and returns the accumulated result when the source completes, given an optional seed value.
|***constructor***||``|__|	
repeat(count: number): Observable
Returns an Observable that repeats the stream of items emitted by the source Observable at most count times.
|***constructor***||``|__|	
repeatWhen(notifier: function(notifications: Observable): Observable): Observable
Returns an Observable that mirrors the source Observable with the exception of a complete.
|***constructor***||``|__|	
retry(count: number): Observable
Returns an Observable that mirrors the source Observable with the exception of an error.
|***constructor***||``|__|	
retryWhen(notifier: function(errors: Observable): Observable): Observable
Returns an Observable that mirrors the source Observable with the exception of an error.
|***constructor***||``|__|	
sample(notifier: Observable<any>): Observable<T>
Emits the most recently emitted value from the source Observable whenever another Observable, the notifier, emits.
|***constructor***||``|__|	
sampleTime(period: number, scheduler: Scheduler): Observable<T>
Emits the most recently emitted value from the source Observable within periodic time intervals.
|***constructor***||``|__|	
scan(accumulator: function(acc: R, value: T, index: number): R, seed: T | R): Observable<R>
Applies an accumulator function over the source Observable, and returns each intermediate result, with an optional seed value.
|***constructor***||``|__|	
sequenceEqual(compareTo: Observable, comparor: function): Observable
Compares all values of two observables in sequence using an optional comparor function and returns an observable of a single boolean value representing whether or not the two sequences are equal.
|***constructor***||``|__|	
share(): Observable<T>
Returns a new Observable that multicasts (shares) the original Observable.
|***constructor***||``|__|	
single(predicate: Function): Observable<T>
Returns an Observable that emits the single item emitted by the source Observable that matches a specified predicate, if that Observable emits one such item.
|***constructor***||``|__|	
skip(count: Number): Observable
Returns an Observable that skips the first count items emitted by the source Observable.
|***constructor***||``|__|	
skipUntil(notifier: Observable): Observable<T>
Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
|***constructor***||``|__|	
skipWhile(predicate: Function): Observable<T>
Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds true, but emits all further source items as soon as the condition becomes false.
|***constructor***||``|__|	
startWith(values: ...T, scheduler: Scheduler): Observable
Returns an Observable that emits the items you specify as arguments before it begins to emit items emitted by the source Observable.
|***constructor***||``|__|	
subscribeOn(scheduler: Scheduler): Observable<T>
Asynchronously subscribes Observers to this Observable on the specified IScheduler.
|***constructor***||``|__|	
switch(): Observable<T>
Converts a higher-order Observable into a first-order Observable by subscribing to only the most recently emitted of those inner Observables.
|***constructor***||``|__|	
switchMap(project: function(value: T, ?index: number): ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable
Projects each source value to an Observable which is merged in the output Observable, emitting values only from the most recently projected Observable.
|***constructor***||``|__|	
switchMapTo(innerObservable: ObservableInput, resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any): Observable
Projects each source value to the same Observable which is flattened multiple times with switch in the output Observable.
|***constructor***||``|__|	
take(count: number): Observable<T>
Emits only the first count values emitted by the source Observable.
|***constructor***||``|__|	
takeLast(count: number): Observable<T>
Emits only the last count values emitted by the source Observable.
|***constructor***||``|__|	
takeUntil(notifier: Observable): Observable<T>
Emits the values emitted by the source Observable until a notifier Observable emits a value.
|***constructor***||``|__|	
takeWhile(predicate: function(value: T, index: number): boolean): Observable<T>
Emits values emitted by the source Observable so long as each value satisfies the given predicate, and then completes as soon as this predicate is not satisfied.
|***constructor***||``|__|	
throttle(durationSelector: function(value: T): SubscribableOrPromise): Observable<T>
Emits a value from the source Observable, then ignores subsequent source values for a duration determined by another Observable, then repeats this process.
|***constructor***||``|__|	
throttleTime(duration: number, scheduler: Scheduler): Observable<T>
Emits a value from the source Observable, then ignores subsequent source values for duration milliseconds, then repeats this process.
|***constructor***||``|__|	
timeInterval(scheduler: *): Observable<TimeInterval<any>> | WebSocketSubject<T> | Observable<T>
|***constructor***||``|__|	
timeout(due: number, scheduler: Scheduler): Observable<R> | WebSocketSubject<T> | Observable<T>
|***constructor***||``|__|	
timeoutWith(due: *, withObservable: *, scheduler: *): Observable<R> | WebSocketSubject<T> | Observable<T>
|***constructor***||``|__|	
timestamp(scheduler: *): Observable<Timestamp<any>> | WebSocketSubject<T> | Observable<T>
|***constructor***||``|__|	
toArray(): Observable<any[]> | WebSocketSubject<T> | Observable<T>
|***constructor***||``|__|	
toPromise(PromiseCtor: *): Promise<T>
Converts an Observable sequence to a ES2015 compliant promise.
|***constructor***||``|__|	
window(windowBoundaries: Observable<any>): Observable<Observable<T>>
Branch out the source Observable values as a nested Observable whenever windowBoundaries emits.
|***constructor***||``|__|	
windowCount(windowSize: number, startWindowEvery: number): Observable<Observable<T>>
Branch out the source Observable values as a nested Observable with each nested Observable emitting at most windowSize values.
|***constructor***||``|__|	
windowToggle(openings: Observable<O>, closingSelector: function(value: O): Observable): Observable<Observable<T>>
Branch out the source Observable values as a nested Observable starting from an emission from openings and ending when the output of closingSelector emits.
|***constructor***||``|__|	
windowWhen(closingSelector: function(): Observable): Observable<Observable<T>>
Branch out the source Observable values as a nested Observable using a factory function of closing Observables to determine when to start a new window.
|***constructor***||``|__|	
withLatestFrom(other: ObservableInput, project: Function): Observable
Combines the source Observable with other Observables to create an Observable whose values are calculated from the latest values of each, only when the source emits.
|***constructor***||``|__|	
zipAll(project: *): Observable<R> | WebSocketSubject<T> | Observable<T>
|***constructor***||``|__|	
zipProto(observables: *): Observable<R>