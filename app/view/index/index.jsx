import Rx from 'rxjs/Rx';

var clicks = Rx.Observable.fromEvent(document, 'click');
var higherOrder = Rx.Observable.interval(200).take(8).map((ev) => {
  console.log(ev);
  return clicks.map(x => ev);
});
var source = higherOrder.combineAll();

source.subscribe({
  next: next => console.log(next),
  error: error => console.error(`Error: ${error}`),
  complete: () => console.info('Complete!')
});