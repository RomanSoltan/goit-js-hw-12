import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '47381624-f2c157926f525f6b292de8ebe';

export async function getFetchImg(searchQuery, page = 1) {
  const { data } = await axios(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });
  return data;
}
