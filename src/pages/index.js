// Импорт модулей
import './index.css';

import {initialCards, popupElements} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const profilePopup = document.querySelector('.popup_action_edit');
const newCardPopup = document.querySelector('.popup_action_add');

const userNameInput = document.querySelector('#user-name');
const jobInput = document.querySelector('#job');

const editBtn = document.querySelector('.profile__btn_action_edit');
const addBtn = document.querySelector('.profile__btn_action_add');

const addFormValidation = new FormValidator(popupElements, newCardPopup);
addFormValidation.enableValidation();

const editFormValidation = new FormValidator(popupElements, profilePopup);
editFormValidation.enableValidation();

const imgPopup = new PopupWithImage('.popup_action_opened-img');
imgPopup.setEventListeners();

const createCard = (item, selector) => {
  const place = new Card(item, selector, {
    handleCardClick: () => {
      imgPopup.open(item.name, item.link);
    }
  });
  const cardElement = place.generateCard();
  return cardElement;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item, '#card-template'), true);
  }
}, '.elements');
cardList.renderItems();

const userInfo = new UserInfo('.profile__name', '.profile__job');

const editPopup = new PopupWithForm('.popup_action_edit', {
  formSubmit: (userValues) => {
    userInfo.setUserInfo(userValues.name, userValues.job);
  }
});
editPopup.setEventListeners();

editBtn.addEventListener('click', () => {
  editPopup.open();
  const user = userInfo.getUserInfo();
  userNameInput.value = user.name;
  jobInput.value = user.job;
  editFormValidation.toggleButtonState();
});

const addPopup = new PopupWithForm('.popup_action_add', {
  formSubmit: (inputs) => {
    cardList.addItem(createCard(inputs, '#card-template'), false);
  }
});
addPopup.setEventListeners();

addBtn.addEventListener('click', () => {
  addPopup.open();
  addFormValidation.toggleButtonState();
});
