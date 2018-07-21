import Utility from './utility';
import { COLOR } from './color';

export default class ScrollPanel {

  constructor(baseDiv, options) {
    this._div = baseDiv;

    this._queue = [];
    let defaultCss = 'margin: 3px; padding: 3px; color: white; background-color: ' + COLOR.green + ';';

    this._defaultCss = Utility.has(options, 'defaultCss') ? options.defaultCss : defaultCss;
    this._isUp = Utility.has(options, 'isUp') ? options.isUp : true;;
    this._maxQueueCapacity = Utility.has(options, 'maxQueueCapacity') ? options.maxQueueCapacity : 50;
  }

  set isUp(isUp) {
    this._isUp = isUp;
  }

  get isUp() {
    return this._isUp;
  }

  set maxQueueCapacity(capacity) {
    this._maxQueueCapacity = capacity;
  }

  get maxQueueCapacity() {
    return this._maxQueueCapacity;
  }

  push(boxDiv) {
    if (this._queue.length > this._maxQueueCapacity) {
      this.pop();
    }

    if (this._isUp) {
      this._div.prepend(boxDiv);
      this._div.scrollBottom = this._div.scrollHeight;
    } else {
      this._div.append(boxDiv);
      this._div.scrollTop = this._div.scrollHeight;
    }
  }

  pop() {
    if (this._queue.length > 0) {
      let f = this._queue.shift();

      this._div.removeChild(f);
    }
  }

  pushText(text, css) {
    let boxDiv = document.createElement('div');

    boxDiv.innerHTML = text;
    boxDiv.style.cssText = css != null ? css : this._defaultCss;
    this.push(boxDiv);
  }
}