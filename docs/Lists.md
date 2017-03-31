## [Public Static](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)
| Method | Parameter  | Return |
|----------|----------|----------|
|[bindCallback]()|(__func__: function, __selector__: function, __scheduler__: Scheduler)|function(...params: *): Observable|
|[bindNodeCallback]()|(__func__: function, __selector__: function, __scheduler__: Scheduler)|function(...params: *): Observable|
|[combineLatest]()|(__observable1__: ObservableInput, __observable2__: ObservableInput, __project__: function, scheduler: Scheduler)|Observable|
|[concat]()|(__input1__: ObservableInput, __input2__: ObservableInput, __scheduler__: Scheduler)|Observable|
|[create]()|(__onSubscription__: function(observer: Observer): TeardownLogic): |Observable|
|[defer]()|(__observableFactory__: function(): SubscribableOrPromise): |Observable|		
|[empty]()|(__scheduler__: Scheduler): |Observable|		
|[forkJoin]()|(__sources__: *): |any|		
|[from]()|(__ish__: ObservableInput<T>, __scheduler__: Scheduler): |Observable<T>|	
|[fromEvent]()|(__target__: EventTargetLike, __eventName__: string, __options__: EventListenerOptions, __selector__: SelectorMethodSignature<T>)|Observable<T>|	
|[fromEventPattern]()|(__addHandler__: function(handler: Function): any, __removeHandler__: function(handler: Function, signal?: any): void, __selector__: function(...args: any): T)|Observable<T>|
|[fromPromise]()|(__promise__: Promise<T>, __scheduler__: Scheduler)|Observable<T>|	
|[interval]()|(__period__: number, __scheduler__: Scheduler)|Observable|	
|[merge]()|(__observables__: ...ObservableInput, __concurrent__: number, __scheduler__: Scheduler)|Observable|	
|[never]()|()|Observable|	
|[of]()|(__values__: ...T, __scheduler__: Scheduler): |Observable<T>|	
|[range]()|(__start__: number, __count__: number, __scheduler__: Scheduler)|Observable|	
|[throw]()|(__error__: any, __scheduler__: Scheduler)|Observable|	
|[timer]()|(__initialDelay__: number/Date, __period__: number, __scheduler__: Scheduler)|Observable|
|[webSocket]()|(__urlConfigOrSource__: string/WebSocketSubjectConfig)|WebSocketSubject|	
|[zip]()|(__observables__: *)|Observable<R>|	