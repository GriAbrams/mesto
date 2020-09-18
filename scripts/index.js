// Импорт модулей
import {initialCards} from './initialCards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// Контейнер карточек
const cardsContainer = document.querySelector('.elements');
// Попапы
const editPopup = document.querySelector('.popup_action_edit');
const addPopup = document.querySelector('.popup_action_add');
export const imgPopup = document.querySelector('.popup_action_opened-img');
// Данные для открытой картинки
export const popupTitle = imgPopup.querySelector('.popup__title');
export const popupImage = imgPopup.querySelector('.popup__img');
// Данные пользователя
const userName = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job'); 
// Формы попапов
const editForm = document.querySelector('.popup__form_edit');
const addForm = document.querySelector('.popup__form_add');
// Поля ввода
const userNameInput = document.querySelector('#user-name');
const jobInput = document.querySelector('#job');
const placeNameInput = document.querySelector('#place-name');
const linkInput = document.querySelector('#link');
// Кнопки
const editBtn = document.querySelector('.profile__btn_action_edit');
const addBtn = document.querySelector('.profile__btn_action_add');
const closeBtn = document.querySelectorAll('.popup__btn_action_close');

// Элементы формы для валидации
const popupElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn_action_save',
  inactiveButtonClass: 'popup__btn_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}
// Валидация формы редактирования профиля
const editFormValidation = new FormValidator(popupElements, editPopup);
editFormValidation.enableValidation();

// Валидация формы добавления карточки
const addFormValidation = new FormValidator(popupElements, addPopup);
addFormValidation.enableValidation();

// Открытие попапа
export const openPopup = (mod) => {
  mod.classList.add('popup_action_opened');
}

// Закрытие попапа
const closePopup = (mod) => {
  mod.classList.remove('popup_action_opened');
}

// Отрисовка карточек
initialCards.forEach( (item) => {
  const place = new Card(item, '#card-template');
  const cardElement = place.generateCard();

  cardsContainer.append(cardElement);
});

// Открытие/добавление новой карточки
addBtn.addEventListener('click', () => {
  openPopup(addPopup);
});

const addNewCard = (evt) => {
  evt.preventDefault();

  const newCard = {name: placeNameInput.value, link: linkInput.value};
  const submitBtn = evt.target.querySelector('.popup__btn_action_save');

  const place = new Card(newCard, '#card-template');
  const cardElement = place.generateCard();

  cardsContainer.prepend(cardElement);
  addForm.reset();
  submitBtn.setAttribute('disabled', false);
  submitBtn.classList.add(popupElements.inactiveButtonClass);
  closePopup(addPopup);
}
addForm.addEventListener('submit', addNewCard);

// Открытие/редактирование окна профиля
editBtn.addEventListener('click', () => {
  userNameInput.value = userName.textContent;
  jobInput.value = job.textContent;

  openPopup(editPopup);
});

const editUserInfo = (evt) => {
  evt.preventDefault();

  userName.textContent = userNameInput.value;
  job.textContent = jobInput.value;

  closePopup(editPopup);
}
editForm.addEventListener('submit', editUserInfo);

// Закрытие по клике на крестик
closeBtn.forEach( (button) => {
  button.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'))
  });
});

// Закрытие попапов по клавише Esc
const closePopupByEscape = (evt) => {
  const openedPopup = document.querySelector('.popup_action_opened');

  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}
document.addEventListener('keydown', closePopupByEscape);

// Закрытие попапов при клике на оверлей
const clickOverlayClose = (evt) => {
  if (evt.target.classList.contains("popup_action_opened")) { 
    closePopup(evt.target); 
  } 
}
document.addEventListener('click', clickOverlayClose);