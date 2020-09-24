import {openPopup, imgPopup, popupTitle, popupImage} from './utils.js';

export default class Card {
  constructor (card, cardSelector) {
    this._title = card.name;
    this._image = card.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate = () => {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  _cardDeleteBtn = () => {
    this._element.remove();
  }

  _cardLikeBtn = () => {
    this._element.querySelector('.card__btn_action_like').classList.toggle('card__btn_active');
  }

  _openImage = () => {
    openPopup(imgPopup);
    popupTitle.textContent = this._title;
    popupImage.src = this._image;
    popupImage.alt = this._title;
  }

  _setEventListeners = () => {
    this._element.querySelector('.card__btn_action_delete').addEventListener('click', this._cardDeleteBtn);

    this._element.querySelector('.card__btn_action_like').addEventListener('click', this._cardLikeBtn);

    this._element.querySelector('.card__img').addEventListener('click', this._openImage);
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.card__img');

    this._element.querySelector('.card__title').textContent = this._title;
    cardImage.src = this._image;
    cardImage.alt = this._title;

    return this._element;
  }
}