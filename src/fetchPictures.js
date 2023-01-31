import axios from 'axios';

export class PixabayAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '33034964-6791c4166c041f83734802d57';

  constructor() {
    this.page = 1, 
    this.query = null,
    this.totalHits = null;
  }

  async fetchPictures() {
    const searchParams = new URLSearchParams({
      q: this.query,
      page: this.page,
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      key: PixabayAPI.API_KEY,
    });

    const response = await axios.get(
      `${PixabayAPI.BASE_URL}?${searchParams}`
    );
    console.log(response);
    this.totalHits = response.data.totalHits;

    return response.data.hits;
  }
}
