import { PixabayAPI } from './fetchPictures';
import { createGalleryCards } from './gallery-card';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const pixabayAPI = new PixabayAPI();
import Notiflix from 'notiflix';

const formEl = document.querySelector('.search-form');
const galleryListEl = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

// infinite scroll
const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};

let callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // console.log(entry.target);
      observer.unobserve(entry.target);
      onSubmitLoadMore();
    }
  });
};

let observer = new IntersectionObserver(callback, options);

//пошук зображень
async function onSubmitForm(e) {
  e.preventDefault();
  pixabayAPI.query = e.target.elements.searchQuery.value.trim();
  pixabayAPI.page = 1;

  const query = e.target.elements.searchQuery.value;

  if (query.replace(/\s+/g, ' ').trim() === '') {
    Notiflix.Notify.failure('The query must consist of words!');
    e.target.reset();
    galleryListEl.innerHTML = '';
    return;
  }

  try {
    const data = await pixabayAPI.fetchPictures();
    console.log(data);
    if (data.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      e.target.reset();
      galleryListEl.innerHTML = '';
      // loadMoreBtn.classList.add('is-hidden');

      return;
    }
    galleryListEl.innerHTML = createGalleryCards(data);
    gallery.refresh();

    if (data.length >= 40) {
      const item = document.querySelector('a:last-child');
      observer.observe(item);
    }

    // if (data.length >= 40) {
    //   loadMoreBtn.classList.remove('is-hidden');
    // }
    console.dir(data);
  } catch (error) {
    console.log(error);
  }
}

// load more
async function onSubmitLoadMore(e) {
  pixabayAPI.page += 1;

  const data = await pixabayAPI.fetchPictures();

  try {
    galleryListEl.insertAdjacentHTML('beforeend', createGalleryCards(data));
    gallery.refresh();

    let photoCardsAll = document.querySelectorAll('.photo-card');

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (photoCardsAll.length === pixabayAPI.totalHits) {
      // loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }

    if (data.length >= 40) {
      const item = document.querySelector('a:last-child');
      observer.observe(item);
    }
  } catch (error) {
    console.log(error);
  }
}

// SimpleLightbox
let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,

  captions: 'true',
  captionSelector: 'img',
  captionPosition: 'bottom',
});

function onGalleryImgClick(e) {
  e.preventDefault();
  const { target } = e;
  if (target.nodeName !== 'IMG') {
    return;
  }
}

// events
formEl.addEventListener('submit', onSubmitForm);
galleryListEl.addEventListener('click', onGalleryImgClick);
// loadMoreBtn.addEventListener('click', onSubmitLoadMore);
