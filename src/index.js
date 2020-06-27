import './styles.css';
import searchApi from './apiService.js';
import photoCard from './templates/card.hbs';
import { error } from '@pnotify/core';

const gallery = document.querySelector('.gallery');
const btnLoad = document.querySelector('.load-btn');
const input = document.querySelector('#search-form');

input.addEventListener('submit', onSubmit);
let page = 1;

function onSubmit(e) {
  page = 1;
  e.preventDefault();
  gallery.innerHTML = '';
  const event = e.currentTarget;
  const inputBtn = event.elements.query;
  if (inputBtn.value) {
    searchApi(inputBtn.value, page, onGetData);
  }
}

function onGetData(data) {
  if (data.hits.length > 0) {
    printList(data.hits);
    btnLoad.style.display = 'inline-block';
  } else {
    onError(data);
    btnLoad.style.display = 'none';
  }
  if (page === 1) {
    window.scrollBy({
      top: 0,
    });
  } else {
    window.scrollBy({
      top: 800,
      left: 100,
      behavior: 'smooth',
    });
  }
}

btnLoad.addEventListener('click', changePage);

function changePage(e) {
  if (btnLoad) {
    page += 1;
    const event = input;
    const inputBtn = event.elements.query;
    searchApi(inputBtn.value, page, onGetData);
  }
}

function printList(dataCard) {
  const cardImg = dataCard.map(elem => photoCard(elem)).join('');
  gallery.insertAdjacentHTML('beforeend', cardImg);
}

function onError() {
  error({
    text: 'Please, try again',
  });
}
