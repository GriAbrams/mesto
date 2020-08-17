// Массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Создание карточки
const cardsContainer = document.querySelector('.elements');
const createCard = card => {
  const cardElement = document.querySelector('#card-template').content.cloneNode(true);
  // Получение значений массива
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__img').src = card.link;
  cardElement.querySelector('.card__img').alt = card.name;
  //Вставка карточки после предыдущей
  cardsContainer.append(cardElement);
} // Перебор массива карточек
initialCards.forEach(createCard);

// Добавление новой карточки 
const addForm = document.querySelector('.popup__form_add');
const addNewCard = evt => {
  evt.preventDefault();
  // Получение значений полей ввода и создание нового объекта
  const placeNameValue = placeNameInput.value;
  const linkValue = linkInput.value;
  const newCard = {name: placeNameValue, link: linkValue};
  // Вызов функций
  createCard(newCard);
  closePopup(addPopup);
} // Событие при нажатие на Сохранить
addForm.addEventListener('submit', addNewCard);

// Добавление value в форму редактирования
const userName = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');
const userNameInput = document.querySelector('#user-name');
const jobInput = document.querySelector('#job');
const addValueToForm = () => {
  userNameInput.setAttribute('value', userName.textContent);
  jobInput.setAttribute('value', job.textContent);
}

// Добавление placeholder в форму добавления карточки
const placeNameInput = document.querySelector('#place-name');
const linkInput = document.querySelector('#link');
const addPlaceholderToForm = () => {
  placeNameInput.setAttribute('placeholder', 'Название');
  linkInput.setAttribute('placeholder', 'Ссылка на картинку');
}

// Открытие попапа
const openPopup = mod => {
  mod.classList.add('popup_action_opened');
}

// Закрытие по кнопке сохранить
const closePopup = mod => {
  mod.classList.remove('popup_action_opened');
}

// Редактирование данных пользвателя
const editForm = document.querySelector('.popup__form_edit');
const editUserInfo = evt => {
  evt.preventDefault();
  // Получение значений полей ввода
  const userNameValue = userNameInput.value;
  const jobValue = jobInput.value;
  // Вставка полученных данных на сайт
  userName.textContent = userNameValue;
  job.textContent = jobValue;
  // Вызов функций
  closePopup(editPopup);
} // Событие при нажании на Сохранить
editForm.addEventListener('submit', editUserInfo);

// Кнопки
const imgPopup = document.querySelector('.popup_action_opened-img');
const editPopup = document.querySelector('.popup_action_edit');
const addPopup = document.querySelector('.popup_action_add');
const buttons = evt => {
  // Удаление карточки
  if (evt.target.classList.contains('card__btn_action_delete')) {
  const card = evt.target.closest('.card');
  card.remove()
  // Лайк карточки
  } else if (evt.target.classList.contains('card__btn_action_like')) {
    evt.target.classList.toggle('card__btn_active');
  // Открытие большой карточки
  } else if (evt.target.classList.contains('card__img')) {
    const card = evt.target.closest('.card');
    const place = card.querySelector('.card__title');
    const image = card.querySelector('.card__img');
    imgPopup.querySelector('.popup__title').textContent = place.textContent;
    imgPopup.querySelector('.popup__img').src = image.src;
    imgPopup.querySelector('.popup__img').alt = place.textContent
    openPopup(imgPopup);
  // Открытие окна пользователя
  } else if (evt.target.classList.contains('profile__btn_action_edit')) {
    openPopup(editPopup);
    addValueToForm();
  // Открытие окна добавления карточки
  } else if (evt.target.classList.contains('profile__btn_action_add')) {
    openPopup(addPopup);
    addPlaceholderToForm();
  // Закрытие попапов
  } else if (evt.target.classList.contains('popup__btn_action_close')) {
    const popup = evt.target.closest('.popup');
    popup.classList.remove('popup_action_opened');
  }
} // Событие при нажатии на кнопки
document.addEventListener('click', buttons);
