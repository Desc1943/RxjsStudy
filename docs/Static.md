## [Public Constructor](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)
| Method | Parameter  | Memo |
|----------|----------|----------|
|***constructor***|(subscribe: Function)|_~~未知~~_(See:`null`)|

## [Public Static](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)
| Method | Parameter  | Memo |
|----------|----------|----------|
|***bindCallback***|(func: function, selector: function, scheduler: Scheduler): function(...params: *): Observable|_绑定使用中间方法_(See:`bindNodeCallback,from,fromPromise`)|
|***bindNodeCallback***|(func: function, selector: function, scheduler: Scheduler): function(...params: *): Observable|_有些像bindCallback,但它返回一个`callback`，返回 Observable_(See:`bindCallback,from,frimPromise`)|
|***combineLatest***|(observable1: ObservableInput, observable2: ObservableInput, project: function, scheduler: Scheduler): Observable|_可以合并多个Observable,**多个Observable发送数据方式特殊**。_(See:`combineAll,merge,withLatestFrom`)|
***concat***|(input1: ObservableInput, input2: ObservableInput, scheduler: Scheduler): Observable|>_合并多个Observable值，非并行（merge）。_(See:`concatAll,concatMap,concatMapTo`)|
***create***|(onSubscription: function(observer: Observer): TeardownLogic): Observable|_创建一个Observable实例，参数Observer拥有next，error,complete方法_(See:`empty,never,of,throw`)|
***defer***|(observableFactory: function(): SubscribableOrPromise): Observable|_创建一个Observable实例_(See:`create`)|		
***empty***|(scheduler: Scheduler): Observable|_啥也不做，直接结束。_(See:`create,never,of,throw`)|		
***forkJoin***|(sources: *): any|_~~未知~~_|		
***from***|(ish: ObservableInput<T>, scheduler: Scheduler): Observable<T>|_将数组元素或字符串，依次输出（类似of）_(See:`create,fromEvent,fromEventPattern,fromPromise`)|	
***fromEvent***|(target: EventTargetLike, eventName: string, options: EventListenerOptions, selector: SelectorMethodSignature<T>): Observable<T>|_绑定一个事件_(See:`from,fromPattern`)|	
***fromEventPattern***|(addHandler: function(handler: Function): any, removeHandler: function(handler: Function, signal?: any): void, selector: function(...args: any): T): Observable<T>|_创建一个元素的绑定事件，但同时传入一个移除元素绑定事件_(See:`from,fromEvent`)|
***fromPromise***|(promise: Promise<T>, scheduler: Scheduler): Observable<T>|_可以异步处理，将传回的值转为Observable_（See：`bindCallback,from`）|	
***interval***|(period: number, scheduler: Scheduler): Observable|_定期发送一个数据_（See：`timer,delay`）|	
***merge***|(observables: ...ObservableInput, concurrent: number, scheduler: Scheduler): Observable|_合并多个Observable值，并行（非并行：concat）。_（See：`mergeAll,mergeMap,mergeMapTop,mergeScan`）|	
***never***|(): Observable|_什么也没做，单纯传出一个Observable,但不想empty使程序直接进入complete状态_（See：`create,empty,of,throw`）|	
***of***|(values: ...T, scheduler: Scheduler): Observable<T>|_单纯将参数按顺序返回（一组数据使用from）_（See：`create,empty,never,throw`）|	
***range***|(start: number, count: number, scheduler: Scheduler): Observable|_传入开始值和结束值，输出期间的值_（See：`timer,interval`）|	
***throw***|(error: any, scheduler: Scheduler): Observable|_直接使Observable进入error状态_（See：`create,empty,never,of`）|	
***timer***|(initialDelay: number/Date, period: number, scheduler: Scheduler): Observable|_一个时间间隔(ms)或具体Date,但又二个参数，前一个表示第一次发送数据的间隔_（See：`interval,delay`）|
***webSocket***|(urlConfigOrSource: string/WebSocketSubjectConfig): WebSocketSubject|_包装一个给外部浏览的服务_（See：`null`）|	
***zip***|(observables: *): Observable<R>|_它可以将多个Observable传递进去加工，返回一个包装后的数据(针对同一位数据一起加工，一旦其中一个无数据，过程就终结)_（See：`null`）|	