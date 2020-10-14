// Импорт модулей
import './index.css';

import {myId, popupElements} from '../utils/constants.js';
import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js'

const profilePopup = document.querySelector('.popup_action_edit');
const newCardPopup = document.querySelector('.popup_action_add');
const avatarEditPopup = document.querySelector('.popup_action_avatar');

const userNameInput = document.querySelector('#user-name');
const aboutInput = document.querySelector('#about');

const editBtn = document.querySelector('.profile__btn_action_edit');
const addBtn = document.querySelector('.profile__btn_action_add');
const avatarBtn = document.querySelector('.profile__avatar-btn');

// Экземпляры класса валидации
const addFormValidation = new FormValidator(popupElements, newCardPopup);
addFormValidation.enableValidation();

const editFormValidation = new FormValidator(popupElements, profilePopup);
editFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(popupElements, avatarEditPopup);
avatarFormValidation.enableValidation();

// Экземпляр класса Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'cff0131c-0138-49c4-8a3e-05b81096baf4',
    'content-type': 'application/json'
  }
});

// Функция отображения загрузки
const renderLoading = (popup, buttonText) => {
  popup.querySelector('.popup__btn_action_save').textContent = buttonText;
}

// Экземпляр класс PopupWithImage для открытия просмотра карточки
const imgPopup = new PopupWithImage('.popup_action_opened-img');
imgPopup.setEventListeners();

// Функция создания карточки
const createCard = (item) => {
  const place = new Card(item, '#card-template', myId, {
    handleCardClick: () => {
      imgPopup.open(item.name, item.link);
    },
    handleLikeClick: (likes) => {
      if (place.isLiked(likes)) {
        api.deleteCardLike(item._id)
          .then((data) => {
            place.updateLikes(data.likes);
          }).catch((err) => console.log(err));
      } else {
        api.putCardLike(item._id)
          .then((data) => {
            place.updateLikes(data.likes);
          }).catch((err) => console.log(err));
        }
    },
    handleDeleteIconClick: (cardId, elem) => {
      confirmPopup.open(cardId, elem);
    }
  });
  const cardElement = place.generateCard();
  return cardElement;
}

// Экземпляр класса Section для отрисовки карточек
const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item), true);
  }
}, '.elements');

// Загрузка карточек с сервера
api.getInitialCards()
  .then((items) => {
    cardList.renderItems(items);
  }).catch((err) => console.log(err));

// Экземпляр класс PopupWithForm для добавления новой карточки
const addPopup = new PopupWithForm('.popup_action_add', {
  formSubmit: (inputValues) => {
    renderLoading(newCardPopup, 'Создание...');
    api.addNewCard(inputValues)
      .then((data) => {
        cardList.addItem(createCard(data), false);
      })
      .catch((err) => console.log(err))
      .finally(renderLoading(newCardPopup, 'Создать'));
  }
});
addPopup.setEventListeners();
// Открытие окна добавления карточки
addBtn.addEventListener('click', () => {
  addPopup.open();
  addFormValidation.toggleButtonState();
});

// Экземпляр класса Popup для окна подтверждения удаления
const confirmPopup = new PopupWithSubmit('.popup_action_confirm', {
  handleSubmit: (cardId, elem) => {
    api.deleteCard(cardId)
      .then(() => {
        elem.remove();
        elem = null;
      }).catch((err) => console.log(err));
  }
});
confirmPopup.setEventListeners();

// Экземпляр класса UserInfo
const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');

// Загрузка информации о пользователе с сервера 
api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
  }).catch((err) => console.log(err));

// Экземпляр класса PopupWithForm для окна редактирования информации о пользователе
const editPopup = new PopupWithForm('.popup_action_edit', {
  formSubmit: (inputValues) => {
    renderLoading(profilePopup, 'Сохранение...');
    api.editUserInfo(inputValues)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => console.log(err))
      .finally(renderLoading(profilePopup, 'Сохранить'));
  }
});
editPopup.setEventListeners();
// Открытие окна редактирования профиля
editBtn.addEventListener('click', () => {
  editPopup.open();
  const user = userInfo.getUserInfo();
  userNameInput.value = user.name;
  aboutInput.value = user.about;
  editFormValidation.toggleButtonState();
});

// Экземпляр класс PopupWithForm для окна редактирования аватара
const avatarPopup = new PopupWithForm('.popup_action_avatar', {
  formSubmit: (userLink) => {
    renderLoading(avatarEditPopup, 'Сохранение...');
    api.editUserAvatar(userLink)
      .then((data) => {
        userInfo.setUserAvatar(data);
      })
      .catch((err) => console.log(err))
      .finally(renderLoading(avatarEditPopup, 'Сохранить'));
  }
});
avatarPopup.setEventListeners();
// Открытие окна редактирования аватара
avatarBtn.addEventListener('click', () => {
  avatarPopup.open();
  avatarFormValidation.toggleButtonState();
});