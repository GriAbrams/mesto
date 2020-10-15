import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, { formSubmit }) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitBtn = this._popupSelector.querySelector('.popup__btn_action_save');
  }

  _getInputValues() {
    const inputValues = {}
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  startLoading(buttonText) {
    this._submitBtn.textContent = buttonText;
  }

  finishLoading(buttonText) {
    this._submitBtn.textContent = buttonText;
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