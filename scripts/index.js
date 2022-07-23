import {initHeadlinesNews, initSearchNews} from './modules/initNews.js';
import {preload} from './modules/preload.js';
import selectors from './modules/selectors.js';
const {
  form,
  newsList,
} = selectors;

const init = () => {
  initHeadlinesNews().then(data => {
    preload.remove();
    newsList.append(data[0]);
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    newsList.innerHTML = '';
    initSearchNews().then(data => {
      preload.remove();
      const searchList = document.querySelector('.search__list');
      searchList.append(data[0]);
      newsList.append(data[1]);
    });
  });
};

init();
