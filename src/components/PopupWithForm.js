import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, { formSubmit }) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitBtn = this._popupSelector.querySelector('.popup__btn_action_save');
    this._startLoadingText = 'Сохранение...';
    this._finishLoadingText = 'Сохранить';
  }

  _getInputValues() {
    const inputValues = {}
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  startLoading() {
    this._submitBtn.textContent = this._startLoadingText;
  }

  finishLoading() {
    this._submitBtn.textContent = this._finishLoadingText;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }
}