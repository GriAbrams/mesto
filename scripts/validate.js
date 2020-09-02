const popupElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn_action_save',
  inactiveButtonClass: 'popup__btn_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

const showInputError = (form, input, errorMessage) => {
  const error = form.querySelector(`#${input.id}-error`);

  input.classList.add(popupElements.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(popupElements.errorClass);
}

const hideInputError = (form, input) => {
  const error = form.querySelector(`#${input.id}-error`);

  input.classList.remove(popupElements.inputErrorClass);
  error.textContent = '';
  error.classList.remove(popupElements.errorClass);
}

const isValid = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
}

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(popupElements.inputSelector));
  const button = form.querySelector(popupElements.submitButtonSelector);

  toggleButtonState(inputList, button);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input);
      toggleButtonState(inputList, button);
    });

  toggleButtonState(inputList, button);
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(popupElements.inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(popupElements.inactiveButtonClass);
    button.removeAttribute('disabled', false);
  }
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(popupElements.formSelector));
  
  formList.forEach((form) => {
    setEventListeners(form);
  })
}
enableValidation(popupElements);