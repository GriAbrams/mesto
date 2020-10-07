export default class Card {
  constructor (card, cardSelector, { handleCardClick }) {
    this._title = card.name;
    this._image = card.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  _cardDeleteBtn() {
    this._element.remove();
  }

  _cardLikeBtn() {
    this._element.querySelector('.card__btn_action_like').classList.toggle('card__btn_active');
  }

  _setEventListeners() {
    this._element.querySelector('.card__btn_action_delete').addEventListener('click', () => {
      this._cardDeleteBtn()
    });

    this._element.querySelector('.card__btn_action_like').addEventListener('click', () => {
      this._cardLikeBtn()
    });

    this._element.querySelector('.card__img').addEventListener('click', () => {
      this._handleCardClick()
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardImage = this._element.querySelector('.card__img');
    this._cardTitle = this._element.querySelector('.card__title');

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    
    return this._element;
  }
}
