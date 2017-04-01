import Rx from 'rxjs/Rx';
// 可加工回传的参数，返回新的 Observable.
// const project = (x,y,z) => `${x},${y},${z}`;

// 每次点击发出一次数据
const sourceSelector = Rx.Observable.fromEvent(document, 'click');
// 每次 sourceSelector 发出数据，都需要等待500ms。
// 没有队列的概念，在等待的过程中无论 sourceSelector 触发多少次，都不会加入队列。
const source = sourceSelector.debounceTime(500);

source.subscribe(x => console.log(x));
// MouseEvent // MouseEvent