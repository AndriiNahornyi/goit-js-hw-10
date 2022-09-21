import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

// Variables
const searchInput = document.getElementById('search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

// Listeners
searchInput.addEventListener('input', debounce(getCountryData, DEBOUNCE_DELAY));

// Functions
function getCountryData(event) {
  const countryName = event.target.value.trim();
    cleanMarkup(countryList);
    cleanMarkup(countryInfo);
    if (!countryName) {
    return;
    }  
    fetchCountries(countryName)
    .then(data => {
      if (data.length === 1) {
        markupCountry(data[0]);
      }
        if (data.length >= 2 && data.length <= 10) {
        markupCountries(data);
      } else if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(err => {
      alert(err);
    });
}
// function for 1 country
function markupCountry(countryData) {
    console.log(countryData);
    const { flags, capital, population, name, languages } = countryData;
    const language = Object.values(languages).join(', ');
    const { } = languages;
    return countryInfo.insertAdjacentHTML(
    'beforeend',
    `<div class="countryName"><img src="${flags.svg}" width = "75" alt ="flag"/>
    <span>${name.official}</span></div>
    <ul><li class="list">Capital: ${capital}</li>
    <li class="list">Population: ${population}</li>
    <li class="list">Languages: ${language}</li></ul>
    `
  );
}
// function for 2-10 countries
    function markupCountries(countryData) {
    countryData.map(country => {
    const { flags, name } = country;
    return countryList.insertAdjacentHTML(
      'beforeend',
      `<div class="list"><img src=${flags.svg} width = "30"/>
      <span>${name.official}</span></div>`
    );
  });
}
// function for clean markup 
function cleanMarkup(element) {
    element.innerHTML = '';
}