// const axios = require('axios').default;
import axios from "axios";

const BASE_URL = 'https://pixabay.com';
const API_KEY = '33057565-d3f4ca79a5c4be950c2fc9706';

export async function fetchPictures (query, page) {
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: 40,
    });

    try {
      const response = await axios.get(`${BASE_URL}/api/?${searchParams}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  } 