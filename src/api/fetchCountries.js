// import { Notify } from "notiflix/build/notiflix-notify-aio";

export const BASE_URL = 'https://restcountries.com/v3.1/name';

export const fetchCountries = url => {
  return fetch(
    `${BASE_URL}/${url}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
    return response.json();
  });
};