import { Observable } from 'rxjs';

const video = document.getElementById('video');
const anchor = document.getElementById('anchor');
const body = document.body;
const mouseDown = Observable.fromEvent(video, 'mousedown');
const mouseUp = Observable.fromEvent(document, 'mouseup');
const mouseMove = Observable.fromEvent(document, 'mousemove');

function isAddFixed() {
  if (anchor.getBoundingClientRect().bottom < 0) {
    video.classList.add('video-fixed');
  } else {
    video.classList.remove('video-fixed');
  }
}
// 判断滚动条
Observable.fromEvent(document, 'scroll')
  .startWith(isAddFixed())
  .subscribe(() => {
    isAddFixed()
  });
// 判断拖拽
mouseDown.map(() => mouseMove.takeUntil(mouseUp))
  .filter(() => video.classList.contains('video-fixed'))
  .concatAll()
  .withLatestFrom(mouseDown, (m, d) => {
    console.log(m);
    const wdith = window.innerWidth - video.getBoundingClientRect().width;
    const height = window.innerHeight - video.getBoundingClientRect().height;
    const x = m.clientX - d.offsetX;
    const y = m.clientY - d.offsetY;
    return {
      x: x < 0 ? 0 : (x > wdith ? wdith : x),
      y: y < 0 ? 0 : (y > height ? height : y)
    }
  })
  .subscribe(pos => {
    video.style.left = `${pos.x}px`;
    video.style.top = `${pos.y}px`;
  });