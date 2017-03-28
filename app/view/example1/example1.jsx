import { Observable } from 'rxjs';

const body = document.body;
const box = document.getElementById('box');
const mouseDown = Observable.fromEvent(box, 'mousedown');
const mouseUp = Observable.fromEvent(body, 'mouseup');
const mouseMove = Observable.fromEvent(body, 'mousemove');

mouseDown.map(e => mouseMove.takeUntil(mouseUp))
  .concatAll()
  .withLatestFrom(mouseDown, (m,d) => {
    return {
      x: m.clientX - d.offsetX,
      y: m.clientY - d.offsetY
    }
  })
  .subscribe(pos => {
    box.style.left = `${pos.x}px`;
    box.style.top = `${pos.y}px`;
  });