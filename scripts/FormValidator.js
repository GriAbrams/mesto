export class FormValidator {
  constructor (popupElements, formElement) {
    this._formSelector = popupElements.formSelector;
    this._inputSelector = popupElements.inputSelector;
    this._submitButtonSelector = popupElements.submitButtonSelector;
    this._inactiveButtonClass = popupElements.inactiveButtonClass;
    this._inputErrorClass = popupElements.inputErrorClass;
    this._errorClass = popupElements.errorClass;
    this._formElement = formElement;
  }

  _showInputError = (input, errorMessage) => {
    const error = this._formElement.querySelector(`#${input.id}-error`);

    input.classList.add(this._inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._errorClass);
  }

  _hideInputError = (input) => {
    const error = this._formElement.querySelector(`#${input.id}-error`);

    input.classList.remove(this._inputErrorClass);
    error.textContent = '';
    error.classList.remove(this._errorClass);
  }

  _isValid = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState = (inputList, button) => {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._inactiveButtonClass);
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute('disabled', false);
    }
  }

  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const button = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, button);

    inputList.forEach( (input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState(inputList, button);
      });
    });
  }

  enableValidation = () => {
    const formList = Array.from(this._formElement.querySelectorAll(this._formSelector));
  
    formList.forEach( (form) => {
      this._setEventListeners(form);
    });
  }
}