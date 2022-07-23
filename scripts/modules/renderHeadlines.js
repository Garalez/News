export const renderHeadlines = (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const template = document.createDocumentFragment();

  const news = data.articles.map(item => {
    const time = item.publishedAt.replace(/[a-zа-яё]/gi, ` `);
    const newsItem = document.createElement('li');
    newsItem.classList.add('news__item');

    newsItem.insertAdjacentHTML('afterbegin', `
      <img class="news__item-img" src="${item.urlToImage}" onerror="this.onerror=null;this.src='/img/dummy.jpg';" alt="Фото новости">
      <div class="news__item-links">
        <a class="news__item-title" target="_blank" href="${item.url}">${item.description}</a>
        <a class="news__item-arrow" target="_blank" href="${item.url}"></a>
      </div>
      <p class="news__item-subtitle">${item.title}</p>
      <div class="news__item-info">
        <p class="news__item-date">${time}</p>
        <p class="news__item-author">${item.author}</p>
      </div>
    `);

    return newsItem;
  });
  template.append(...news);

  return template;
};
