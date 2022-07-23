import selectors from './selectors.js';
const {
  newsList,
} = selectors;

export const preload = {
  circle: '<img class="overlay-img" src="./img/preload.svg">',
  overlay: document.createElement('li'),

  show() {
    this.overlay.classList.add('overlay');
    this.overlay.innerHTML = this.circle;
    newsList.append(this.overlay);
  },
  remove() {
    this.overlay.remove();
  },
};
