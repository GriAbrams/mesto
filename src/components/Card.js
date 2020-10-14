export default class Card {
  constructor (card, cardSelector, myId, { handleCardClick, handleLikeClick, handleDeleteIconClick}) {
    this._title = card.name;
    this._image = card.link;
    this._likes = card.likes;
    this._cardId = card._id;
    this._cardOwnerId = card.owner._id;
    this._myId = myId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  _checkOwner() {
    if (this._cardOwnerId !== this._myId) {
      this._element.querySelector('.card__btn_action_delete').remove();
    }
  }

  updateLikes(data) {
    this._likes = data;
    this._likeCounter.textContent = this._likes.length;
    this._likeBtn.classList.toggle('card__btn_active');
  }

  isLiked(likes) {
    if (likes.find(like => like._id === this._myId)) {
      return true;
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.card__btn_action_delete').addEventListener('click', () => {
      this._handleDeleteIconClick(this._cardId, this);
    });

    this._element.querySelector('.card__btn_action_like').addEventListener('click', () => {
      this._handleLikeClick(this._likes);
    });

    this._element.querySelector('.card__img').addEventListener('click', () => {
      this._handleCardClick();
    });
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._checkOwner();

    this._cardImage = this._element.querySelector('.card__img');
    this._cardTitle = this._element.querySelector('.card__title');
    this._likeBtn = this._element.querySelector('.card__btn_action_like');
    this._likeCounter = this._element.querySelector('.card__like-counter');

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._likeCounter.textContent = this._likes.length;

    if (this.isLiked(this._likes)) {
      this._likeBtn.classList.add('card__btn_active');
    }

    return this._element;
  }
}