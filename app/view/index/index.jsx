import { Observable, Subject } from 'rxjs';

var click =Observable.fromEvent(document.body, 'click');
var source = click.map(e =>Observable.interval(1000));

var example = source.mergeAll(2)
  .subscribe({
  next: (value) => { console.log(value); },
  error: (err) => { console.log('Error: ' + err); },
  complete: () => { console.log('complete'); }
});

/*
const add = document.querySelector('#add');
const min = document.querySelector('#min');
const content = document.querySelector('content');

const addClick = Observable.fromEvent(add, 'click').mapTo(1);
const minClick = Observable.fromEvent(min, 'click').mapTo(-1);
Observable
  .empty()
  .startWith(4)
  .merge(addClick, minClick)
  .scan((origin, next) => origin + next, 0)
  .subscribe(console.log);*/
