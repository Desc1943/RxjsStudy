import { Observable, Subject } from 'rxjs';

Observable.interval(500)
  .bufferWhen(() => Observable.interval(1000))
  .do({
    next: value => {
      console.log('next1:', value);
    },
    complete: () => {
      console.log(`complete1!!!`);
    },
    error: error => {
      console.log(`error1:`, error);
    }
  })
  .subscribe();
// -0-1-2-3-4-5-6-7-8
// - -c- -c- -c- -c
// - - -c- - -c- - -c