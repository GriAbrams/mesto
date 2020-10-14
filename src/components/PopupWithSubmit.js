import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor (popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._submitBtn = this._popupSelector.querySelector('.popup__btn_action_save');
  }

  open(cardId, card) {
    this._cardId = cardId;
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._cardId, this._card);
    });
  }
}

