// Импорт модулей
import './index.css';

import {
  initialCards,
  popupElements,
  profilePopup,
  newCardPopup,
  userNameInput,
  jobInput,
  editBtn,
  addBtn
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const addFormValidation = new FormValidator(popupElements, newCardPopup);
const editFormValidation = new FormValidator(popupElements, profilePopup);

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
    cardList.addItem(createCard(item, '#card-template'), 'append');
  }
}, '.elements');
cardList.renderItems();

const userInfo = new UserInfo('.profile__name', '.profile__job');

const editPopup = new PopupWithForm('.popup_action_edit', {
  formSubmit: () => {
    userInfo.setUserInfo();
  }
});
editPopup.setEventListeners();

editBtn.addEventListener('click', () => {
  editPopup.open();
  const user = userInfo.getUserInfo();
  userNameInput.value = user.name;
  jobInput.value = user.job;
  editFormValidation.enableValidation();
});

const addPopup = new PopupWithForm('.popup_action_add', {
  formSubmit: (inputs) => {
    cardList.addItem(createCard(inputs, '#card-template'), 'prepend');
  }
});
addPopup.setEventListeners();

addBtn.addEventListener('click', () => {
  addPopup.open();
  addFormValidation.enableValidation();
});