import axios from 'axios';
import Notiflix from 'notiflix';

export const fetchBreeds = () => {
  axios.defaults.headers.common['x-api-key'] =
    'live_h7JJsfByySZqDfFfucqBOcdC7wRIIRUwYKZ320ylF1yn7yxRgU3V5OgOUXSLro4U';
  try {
    return axios
      .get(`https://api.thecatapi.com/v1/breeds`)
      .then(response => response.data);
  } catch (error) {
    Notiflix.Notify.failure(`Error! Page not found`);
  }
};

export const fetchCatByBreed = breedId => {
  try {
    return axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => response.data);
  } catch (error) {
    Notiflix.Notify.failure(`Error! Page not found`);
  }
};
