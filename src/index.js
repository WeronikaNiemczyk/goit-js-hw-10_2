import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

// dane z fetcha użyte do renderowania pola wyboru ras:
// try {
loader.classList.remove('hidden');
fetchBreeds()
  .then(breeds => renderBreeds(breeds))
  .catch(error => Notiflix.Notify.failure(`Error! Page not found`));

// markup html do utworzenia pola wyboru select:
const renderBreeds = breeds => {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');

  // breedSelect.innerHTML = markup;
  breedSelect.insertAdjacentHTML('beforeend', markup);

  loader.classList.add('hidden');
};

// listener, który reaguje na zmiane wartości w select
// funkcja fetchCatByBreed() dostarcza dane do wykorzystania
// przy renderze(poniżej):

addEventListener('change', event => {
  loader.classList.remove('hidden');
  event.preventDefault();

  // console.log('Event target: ', e.target.value);
  fetchCatByBreed(event.target.value)
    .then(catImages => createImage(catImages))
    .catch(error => Notiflix.Notify.failure(`Error! Page not found`));

  // markup karty o kocie:
  const createImage = catImages => {
    // console.log('cat images: ', catImages);
    const markupCat = catImages
      .map(
        catImage =>
          `<h3>${catImage.breeds[0].name}</h3>
          <div><img src="${catImage.url}" alt="${catImage.breeds[0].name}" width="600px"/>
         <p> <b/>Cat description: <br/><br/>${catImage.breeds[0].description}</p>
          <p><b/>Temperament: <br/><br/>${catImage.breeds[0].temperament}</p></div>`
      )
      .join('');
    loader.classList.add('hidden');
    catInfo.innerHTML = markupCat;
    // catInfo.insertAdjacentHTML('beforeend', markupCat);
  };
});
