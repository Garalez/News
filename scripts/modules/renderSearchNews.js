import selectors from './selectors.js';
const {
  form,
  newsTitle,
  searchSection,
} = selectors;

export const searchNews = (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const template = document.createDocumentFragment();

  if (searchSection.children.length < 1) {
    const createTitle = document.createElement('h2');
    createTitle.classList.add('news__title', 'container');
    createTitle.textContent = newsTitle.textContent;
    newsTitle.parentNode.replaceChild(createTitle, newsTitle);
  }

  while (searchSection.children.length > 0) {
    searchSection.lastChild.remove();
  }

  searchSection.insertAdjacentHTML('afterbegin', `
    <h1 class="search__title container">По вашему запросу “${form.search.value}” найдено 8 результатов</h1>
    <span class="search__underline underline"></span>
    <div class="search__wrapper container">
      <ul class="search__list">
      </ul>
    </div>
    <span class="search__underline underline"></span>
  `);

  const searchNews = data.articles.map(item => {
    const time = item.publishedAt.replace(/[a-zа-яё]/gi, ` `);
    const newsItem = document.createElement('li');
    newsItem.classList.add('search__item');

    newsItem.insertAdjacentHTML('afterbegin', `
      <img class="search__item-img" src="${item.urlToImage}" alt="Фото новости">
      <div class="search__item-links">
        <a class="search__item-title" target="_blank" href="${item.url}">${item.description}</a>
        <a class="search__item-arrow" target="_blank" href="${item.url}"></a>
      </div>
      <p class="search__item-subtitle">${item.title}</p>
      <div class="search__item-info">
        <p class="search__item-date">${time}</p>
        <p class="search__item-author">${item.author}</p>
      </div>
    `);

    return newsItem;
  });
  template.append(...searchNews);

  return template;
};
