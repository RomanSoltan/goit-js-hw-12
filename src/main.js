import { getFetchImg } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('.loader-js');
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

  if (!searchQuery) {
    iziToast.show({
      message: 'Sorry, the request cannot be empty. Please try again...',
      position: 'topRight',
      closeOnClick: true,
      progressBar: false,
      messageColor: 'white',
      backgroundColor: '#ef4040',
    });
    return;
  }

  loader.style.display = 'block';

  try {
    const data = await getFetchImg(searchQuery, page);

    if (!data.hits.length) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        closeOnClick: true,
        progressBar: false,
        messageColor: 'white',
        backgroundColor: '#ef4040',
      });
      return;
    }
    
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    lightBox.refresh();
    if (page < data.totalHits / 15) {
      loadMoreBtn.classList.replace('load-more-hidden', 'load-more');
    }
  } catch (error) {
    iziToast.show({
      title: 'X',
      message: `${error.message}`,
      position: 'center',
      color: 'red',
    });
  } finally {
    event.target.reset();
    loader.style.display = 'none';
  }
}

async function onLoadMore() {
  page++;
  loadMoreBtn.disabled = true;
  loadMoreBtn.classList.replace("load-more", "load-more-hidden");
  loader.style.display = 'block';

  try {
  
    const data = await getFetchImg(searchQuery, page);
    gallery.insertAdjacentHTML("beforeend", createMarkup(data.hits));
    lightBox.refresh();

    if (page >= data.totalHits / 15) {
      loadMoreBtn.classList.replace("load-more", "load-more-hidden");
      iziToast.show({
        message:
          "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        closeOnClick: true,
        progressBar: false,
        messageColor: 'white',
        backgroundColor: '#ef4040',
      });
    }

    const card = document.querySelector(".gallery-item");
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: "smooth"
    })
  } catch(error) {
    iziToast.show({
      title: 'X',
      message: `${error.message}`,
      position: 'center',
      color: 'red',
    })
  } finally {
    loadMoreBtn.disabled = false;
    loadMoreBtn.classList.replace('load-more-hidden', 'load-more')
    loader.style.display = 'none';
  }
}
