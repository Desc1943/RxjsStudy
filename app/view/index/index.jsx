import Rx from 'rxjs/Rx';

const source = Rx.Observable
  .from([
    Rx.Notification.createNext('SUCCESS'),
    Rx.Notification.createError('ERROR!')
  ])
  // 把 notification object 变成 notification values
  .dematerialize();

// 输出：`NEXT VALUE: SUCCESS' 'ERROR VALUE: 'ERROR!'
source.subscribe({
  next: val => console.log(`NEXT VALUE: ${val}`),
  error: val => console.log(`ERROR VALUE: ${val}`),
});


//source.subscribe(val => {console.log(val)});
// 0 // 1 // 2