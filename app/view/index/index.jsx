import { Observable } from 'rxjs';


const observable = Observable
  .interval(1000)
  .subscribe({
    next: value => {
      console.log(value);
    },
    complete: () => {
      console.log('complete');
    },
    error: error => {
      console.log(error);
    }
  });
setTimeout(() => {
  observable.unsubscribe();
}, 2000);