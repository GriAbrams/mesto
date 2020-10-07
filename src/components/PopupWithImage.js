import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();

    this._popupTitle = this._popupSelector.querySelector('.popup__title');
    this._popupImage = this._popupSelector.querySelector('.popup__img');
    
    this._popupTitle.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
  }
}