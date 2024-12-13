import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getApiImg } from './js/pixabay-api';
import {
  createMarkup,
  showMessage,
  showErr,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  loaderAnimation,
} from './js/render-functions';

const form = document.querySelector('.form-js');
const input = document.querySelector('.input-js');
const gallery = document.querySelector('.gallery-js');
const loadMoreBtn = document.querySelector('.load-more-js');

form.addEventListener('submit', handlerSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

let searchQuery;
let page = 1;

let lightBox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captions: true,
  captionsData: 'alt',
});

async function handlerSubmit(event) {
  event.preventDefault();

  page = 1;
  gallery.innerHTML = '';
  searchQuery = input.value.trim();
  hideLoadMoreBtn();

  if (!searchQuery) {
    showMessage('Sorry, the request cannot be empty. Please try again...');
    return;
  }

  loaderAnimation('block');

  try {
    const data = await getApiImg(searchQuery, page);

    if (!data.hits.length) {
      showMessage(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    lightBox.refresh();
    if (page < data.totalHits / 15) {
      showLoadMoreBtn();
    }
  } catch (error) {
    showErr(error.message);
  } finally {
    event.target.reset();
    loaderAnimation('none');
  }
}

async function onLoadMore() {
  page++;
  loadMoreBtn.disabled = true;
  hideLoadMoreBtn();
  loaderAnimation('block');

  try {
    const data = await getApiImg(searchQuery, page);
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    lightBox.refresh();

    if (page >= data.totalHits / 15) {
      hideLoadMoreBtn();
      showMessage("We're sorry, but you've reached the end of search results.");
      return;
    }

    showLoadMoreBtn();

    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    showErr(error.message);
  } finally {
    loadMoreBtn.disabled = false;
    loaderAnimation('none');
  }
}
