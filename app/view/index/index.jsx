import { Observable, Subject } from 'rxjs';

const source = Observable.zip(Observable.timer(1000,500),Observable.of(1,2,31,3,1), (x,y) => y);

















source.subscribe({
  next: value => {
    console.log('next:', value);
  },
  complete: () => {
    console.log(`complete!!!`);
  },
  error: error => {
    console.log(`error:`, error);
  }
});