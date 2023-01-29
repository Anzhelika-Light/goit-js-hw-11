export function createGalleryCards(cardInfo) {
  const gallery = cardInfo.map(el => {
    return `<a class="link" href="${el.largeImageURL}"><div class="photo-card">
    <div class="imgBox"><img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" /></div>
  
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${el.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${el.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${el.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${el.downloads}
    </p>
  </div>
</div></a>`;
  });

  return gallery.join('');
}