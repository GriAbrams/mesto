const cardsContainer = document.querySelector('.elements'); // Контейнер карточек
const addForm = document.querySelector('.popup__form_add'); // Форма добавления
const editForm = document.querySelector('.popup__form_edit'); // Форма редактирования профиля
const imgPopup = document.querySelector('.popup_action_opened-img'); // Попап большой карточки
const editPopup = document.querySelector('.popup_action_edit'); // Попап редактивания
const addPopup = document.querySelector('.popup_action_add'); // Попап добавления
const userName = document.querySelector('.profile__name'); // Имя пользователя
const job = document.querySelector('.profile__job'); // Профессия
const userNameInput = document.querySelector('#user-name'); // Поле ввода имени пользователя
const jobInput = document.querySelector('#job'); // Поле ввода профессии
const placeNameInput = document.querySelector('#place-name'); // Поле ввода названия карточки
const linkInput = document.querySelector('#link'); // Поле ссылки на картинку

// Создание карточки
const createCard = card => {
  const cardElement = document.querySelector('#card-template').content.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__img').src = card.link;
  cardElement.querySelector('.card__img').alt = card.name;

  return cardElement;
} 

// Отрисовка карточек
initialCards.forEach(card => {
  cardsContainer.append(createCard(card));
});

// Добавление новой карточки 
const addNewCard = evt => {
  evt.preventDefault();

  const placeNameValue = placeNameInput.value;
  const linkValue = linkInput.value;
  const newCard = {name: placeNameValue, link: linkValue};

  cardsContainer.prepend(createCard(newCard));
  closePopup(addPopup);
  addForm.reset()
}
addForm.addEventListener('submit', addNewCard);

// Добавление value в форму редактирования
const addValueToForm = () => {
  userNameInput.setAttribute('value', userName.textContent);
  jobInput.setAttribute('value', job.textContent);
}

// Добавление placeholder в форму добавления карточки
const addPlaceholderToForm = () => {
  placeNameInput.setAttribute('placeholder', 'Название');
  linkInput.setAttribute('placeholder', 'Ссылка на картинку');
}

// Открытие попапа
const openPopup = mod => {
  mod.classList.add('popup_action_opened');
}

// Закрытие попапа
const closePopup = mod => {
  mod.classList.remove('popup_action_opened');
}

// Редактирование данных пользвателя
const editUserInfo = evt => {
  evt.preventDefault();

  const userNameValue = userNameInput.value;
  const jobValue = jobInput.value;

  userName.textContent = userNameValue;
  job.textContent = jobValue;

  closePopup(editPopup);
}
editForm.addEventListener('submit', editUserInfo);

// Кнопки
const buttons = evt => {
  // Удаление карточки
  if (evt.target.classList.contains('card__btn_action_delete')) {
  const card = evt.target.closest('.card');
  card.remove()

  // Лайк карточки
  } else if (evt.target.classList.contains('card__btn_action_like')) {
    evt.target.classList.toggle('card__btn_active');

  // Открытие просмотра карточки
  } else if (evt.target.classList.contains('card__img')) {
    const card = evt.target.closest('.card');
    const place = card.querySelector('.card__title');
    const image = card.querySelector('.card__img');

    imgPopup.querySelector('.popup__title').textContent = place.textContent;
    imgPopup.querySelector('.popup__img').src = image.src;
    imgPopup.querySelector('.popup__img').alt = place.textContent;

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
}
document.addEventListener('click', buttons);
