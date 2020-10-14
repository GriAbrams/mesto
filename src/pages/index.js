// Импорт модулей
import './index.css';

import {popupElements} from '../utils/constants.js';
import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js'

let myId = '';

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

// Экземпляр класса UserInfo
const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');

// Экземпляр класс PopupWithImage для открытия просмотра карточки
const imgPopup = new PopupWithImage('.popup_action_opened-img');
imgPopup.setEventListeners();

// Экземпляр класса Popup для окна подтверждения удаления
const confirmPopup = new PopupWithSubmit('.popup_action_confirm', {
  handleSubmit: (cardId, card) => {
    api.deleteCard(cardId)
      .then(() => {
        card.deleteCard();
      }).catch((err) => console.log(err))
      .finally(() => {
        confirmPopup.close();
      });
  }
});
confirmPopup.setEventListeners();

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
    handleDeleteIconClick: (cardId, card) => {
      confirmPopup.open(cardId, card);
    }
  });
  return place.generateCard();
}

// Экземпляр класса Section для отрисовки карточек
const cardList = new Section({
  renderer: (item) => {
    cardList.addItemAppend(createCard(item));
  }
}, '.elements');

// Загрузка первоначального состояния страницы
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    myId = userData._id;
    cardList.renderItems(cards);
  }).catch((err) => console.log(err));

// Экземпляр класс PopupWithForm для добавления новой карточки
const addPopup = new PopupWithForm('.popup_action_add', {
  formSubmit: (inputValues) => {
    addPopup.startLoading();
    api.addNewCard(inputValues)
      .then((data) => {
        cardList.addItemPrepend(createCard(data));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        addPopup.finishLoading();
        addPopup.close();
      });
  }
});
addPopup.setEventListeners();
// Открытие окна добавления карточки
addBtn.addEventListener('click', () => {
  addFormValidation.toggleButtonState();
  addPopup.open();
});

// Экземпляр класса PopupWithForm для окна редактирования информации о пользователе
const editPopup = new PopupWithForm('.popup_action_edit', {
  formSubmit: (inputValues) => {
    editPopup.startLoading();
    api.editUserInfo(inputValues)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        editPopup.finishLoading();
        editPopup.close();
      });
  }
});
editPopup.setEventListeners();
// Открытие окна редактирования профиля
editBtn.addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  userNameInput.value = user.name;
  aboutInput.value = user.about;
  editFormValidation.toggleButtonState();
  editPopup.open();
});

// Экземпляр класс PopupWithForm для окна редактирования аватара
const avatarPopup = new PopupWithForm('.popup_action_avatar', {
  formSubmit: (userLink) => {
    avatarPopup.startLoading();
    api.editUserAvatar(userLink)
      .then((data) => {
        userInfo.setUserAvatar(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        avatarPopup.finishLoading();
        avatarPopup.close();
      });
  }
});
avatarPopup.setEventListeners();
// Открытие окна редактирования аватара
avatarBtn.addEventListener('click', () => {
  avatarFormValidation.toggleButtonState();
  avatarPopup.open();
});