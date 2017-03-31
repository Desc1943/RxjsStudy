## [Public Static](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)
| Method | Parameter  | Return |
|----------|----------|----------|
|[bindCallback]()|__func__: function,<br/> __selector__: function,<br/> __scheduler__: Scheduler|function(...params: *): Observable|
|[bindNodeCallback]()|__func__: function,<br/> __selector__: function,<br/> __scheduler__: Scheduler|function(...params: *): Observable|
|[combineLatest]()|__observable1__: ObservableInput,<br/> __observable2__: ObservableInput,<br/> __project__: function, scheduler: Scheduler|Observable|
|[concat]()|__input1__: ObservableInput,<br/> __input2__: ObservableInput,<br/> __scheduler__: Scheduler|Observable|
|[create]()|__onSubscription__: function(observer: Observer): TeardownLogic|Observable|
|[defer]()|__observableFactory__: function(): SubscribableOrPromise|Observable|		
|[empty]()|__scheduler__: Scheduler|Observable|		
|[forkJoin]()|__sources__: *|any|		
|[from]()|__ish__: ObservableInput<T>,<br/> __scheduler__: Scheduler|Observable<T>|	
|[fromEvent]()|__target__: EventTargetLike,<br/> __eventName__: string,<br/> __options__: EventListenerOptions,<br/> __selector__: SelectorMethodSignature<T>|Observable<T>|	
|[fromEventPattern]()|__addHandler__: function(handler: Function): any,<br/> __removeHandler__: function(handler: Function, signal?: any): void,<br/> __selector__: function(...args: any): T|Observable<T>|
|[fromPromise]()|__promise__: Promise<T>,<br/> __scheduler__: Scheduler|Observable<T>|	
|[interval]()|__period__: number,<br/> __scheduler__: Scheduler|Observable|	
|[merge]()|__observables__: ...ObservableInput,<br/> __concurrent__: number,<br/> __scheduler__: Scheduler|Observable|	
|[never]()|()|Observable|	
|[of]()|__values__: ...T,<br/> __scheduler__: Scheduler|Observable<T>|	
|[range]()|__start__: number,<br/> __count__: number,<br/> __scheduler__: Scheduler|Observable|	
|[throw]()|__error__: any,<br/> __scheduler__: Scheduler|Observable|	
|[timer]()|__initialDelay__: number/Date,<br/> __period__: number,<br/> __scheduler__: Scheduler|Observable|
|[webSocket]()|__urlConfigOrSource__: string/WebSocketSubjectConfig|WebSocketSubject|	
|[zip]()|__observables__: *|Observable<R>|	