import {fetchRequest} from './data.js';
import {preload} from './preload.js';
import {renderHeadlines} from './renderHeadlines.js';
import {searchNews} from './renderSearchNews.js';
import selectors from './selectors.js';
const {
  form,
} = selectors;

export const initHeadlinesNews = () => {
  preload.show();
  return Promise.all([
    fetchRequest('https://newsapi.org/v2/top-headlines?country=ru', {
      callback(err, data) {
        if (data.articles.length > 8) {
          data.articles.length = 8;
        }
        console.log(data);
        return renderHeadlines(err, data);
      },
      headers: {
        'X-Api-Key': '7fcb267efc184ba8b930f3fa70abb669',
      },
    })]);
};

export const initSearchNews = () => {
  preload.show();
  return Promise.all([
    fetchRequest(`https://newsapi.org/v2/everything?q=${form.search.value}`, {
      callback(err, data) {
        if (data.articles.length > 8) {
          data.articles.length = 8;
        }
        return searchNews(err, data);
      },
      headers: {
        'X-Api-Key': '7fcb267efc184ba8b930f3fa70abb669',
      },
    }),

    fetchRequest('https://newsapi.org/v2/top-headlines?country=ru', {
      callback(err, data) {
        if (data.articles.length > 4) {
          data.articles.length = 4;
        }
        return renderHeadlines(err, data);
      },
      headers: {
        'X-Api-Key': '7fcb267efc184ba8b930f3fa70abb669',
      },
    })]);
};
