export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._closeButton = this._popupSelector.querySelector('.popup__btn_action_close');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target.classList.contains("popup_action_opened")) { 
      this.close(); 
    } 
  }

  open() {
    this._popupSelector.classList.add('popup_action_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }
  
  close() {
    this._popupSelector.classList.remove('popup_action_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    this._popupSelector.addEventListener('click', (evt) => {
      this._handleOverlayClick(evt);
    });
  }
}