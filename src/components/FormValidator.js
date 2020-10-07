export default class FormValidator {
  constructor (popupElements, formElement) {
    this._formSelector = popupElements.formSelector;
    this._inputSelector = popupElements.inputSelector;
    this._submitButtonSelector = popupElements.submitButtonSelector;
    this._inactiveButtonClass = popupElements.inactiveButtonClass;
    this._inputErrorClass = popupElements.inputErrorClass;
    this._errorClass = popupElements.errorClass;
    this._formElement = formElement;
  }

  _showInputError(input, errorMessage) {
    this._error = this._formElement.querySelector(`#${input.id}-error`);

    input.classList.add(this._inputErrorClass);
    this._error.textContent = errorMessage;
    this._error.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    this._error = this._formElement.querySelector(`#${input.id}-error`);

    input.classList.remove(this._inputErrorClass);
    this._error.textContent = '';
    this._error.classList.remove(this._errorClass);
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    this._button = this._formElement.querySelector(this._submitButtonSelector);

    if (this._hasInvalidInput()) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.setAttribute('disabled', true);
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.removeAttribute('disabled', false);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formList = Array.from(this._formElement.querySelectorAll(this._formSelector));
  
    this._formList.forEach((form) => {
      this._setEventListeners(form);
    });
  }
}