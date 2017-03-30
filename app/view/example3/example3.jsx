import { Observable } from 'rxjs';

const imgList = document.getElementsByTagName('img');
const movePos = Observable.fromEvent(document, 'mousemove').map(e => ({ x: e.clientX, y: e.clientY }));
Observable.interval(200).take(5)
  .delayWhen( x => {
    console.log(x);
    return Observable.interval(x * 1000);
  })
  .map( x => {
    console.log(x);
  })
  .subscribe(console.log);