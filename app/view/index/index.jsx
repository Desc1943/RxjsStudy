import { Observable } from 'rxjs';

const source1 = Observable.interval(500).take(4);
const source2 = Observable.interval(1000).take(3);
const source = source1.withLatestFrom(source2, (x,y) => x+y)
  .subscribe({
  next: (value) => { console.log(value); },
  error: (err) => { console.log('Error: ' + err); },
  complete: () => { console.log('complete'); }
});