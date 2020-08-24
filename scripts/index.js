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

  // Кпонка удаления карточки
  const deleteBtn = cardElement.querySelector('.card__btn_action_delete'); // Кнопка удаления
  deleteBtn.addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });

  // Лайк карточки
  const likeBtn = cardElement.querySelector('.card__btn_action_like'); // Кнопка лайка
  likeBtn.addEventListener('click', evt => {
    evt.target.classList.toggle('card__btn_active')
  });

  // Открытие просмотра карточки
  const cardImg = cardElement.querySelector('.card__img'); // Изображение карточки

  cardImg.addEventListener('click', evt => {
    const card = evt.target.closest('.card');
    const place = card.querySelector('.card__title');
    const image = card.querySelector('.card__img');
  
    imgPopup.querySelector('.popup__title').textContent = place.textContent;
    imgPopup.querySelector('.popup__img').src = image.src;
    imgPopup.querySelector('.popup__img').alt = place.textContent;
  
    togglePopup(imgPopup);
  });

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
  togglePopup(addPopup);
  addForm.reset()
}
addForm.addEventListener('submit', addNewCard);

// Добавление value в форму редактирования
const addValueToForm = () => {
  userNameInput.setAttribute('value', userName.textContent);
  jobInput.setAttribute('value', job.textContent);
}

// Открытие/закрытие попапа
const togglePopup = mod => {
  mod.classList.toggle('popup_action_opened');
}

// Открытие окна пользователя
const editBtn = document.querySelector('.profile__btn_action_edit'); // Кнопка редактирования профиля

editBtn.addEventListener('click', () => {
  togglePopup(editPopup);
  addValueToForm();
});
  
// Открытие окна добавления карточки
const addBtn = document.querySelector('.profile__btn_action_add'); // Кнопка добавления карточки

addBtn.addEventListener('click', () => {
  togglePopup(addPopup);
});

// Закрытие при клике на крестик
const closeBtn = evt => {
  if (evt.target.classList.contains('popup__btn_action_close')) {
    const popup = evt.target.closest('.popup');
    popup.classList.remove('popup_action_opened');
  }
}
document.addEventListener('click', closeBtn);

// Редактирование данных пользователя
const editUserInfo = evt => {
  evt.preventDefault();

  const userNameValue = userNameInput.value;
  const jobValue = jobInput.value;

  userName.textContent = userNameValue;
  job.textContent = jobValue;

  togglePopup(editPopup);
}
editForm.addEventListener('submit', editUserInfo);
