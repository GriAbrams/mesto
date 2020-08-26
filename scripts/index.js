const cardsContainer = document.querySelector('.elements'); // Контейнер карточек

const editPopup = document.querySelector('.popup_action_edit'); // Попап редактивания
const addPopup = document.querySelector('.popup_action_add'); // Попап добавления карточки
const imgPopup = document.querySelector('.popup_action_opened-img'); // Попап открытой карточки

const userName = document.querySelector('.profile__name'); // Имя пользователя
const job = document.querySelector('.profile__job'); // Профессия

const editForm = document.querySelector('.popup__form_edit'); // Форма редактирования профиля
const addForm = document.querySelector('.popup__form_add'); // Форма добавления

const userNameInput = document.querySelector('#user-name'); // Поле ввода имени пользователя
const jobInput = document.querySelector('#job'); // Поле ввода профессии
const placeNameInput = document.querySelector('#place-name'); // Поле ввода названия карточки
const linkInput = document.querySelector('#link'); // Поле ссылки на картинку

const editBtn = document.querySelector('.profile__btn_action_edit'); // Кнопка редактирования профиля
const addBtn = document.querySelector('.profile__btn_action_add'); // Кнопка добавления карточки
const closeBtn = document.querySelectorAll('.popup__btn_action_close'); // Крестик

// Открытие попапа
const openPopup = mod => {
  mod.classList.add('popup_action_opened');
}

// Закрытие попапа
const closePopup = mod => {
  mod.classList.remove('popup_action_opened');
}

// Создание карточки
const createCard = card => {
  const cardElement = document.querySelector('#card-template').content.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__img');

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  // Кнопка удаления карточки
  const deleteBtn = cardElement.querySelector('.card__btn_action_delete');

  deleteBtn.addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });

  // Лайк карточки
  const likeBtn = cardElement.querySelector('.card__btn_action_like');

  likeBtn.addEventListener('click', evt => {
    evt.target.classList.toggle('card__btn_active');
  });

  // Открытие просмотра карточки
  const cardImg = cardElement.querySelector('.card__img');

  cardImg.addEventListener('click', evt => {
    const card = evt.target.closest('.card');
    const place = card.querySelector('.card__title');
    const image = card.querySelector('.card__img');
    const popupTitle = imgPopup.querySelector('.popup__title');
    const popupImage = imgPopup.querySelector('.popup__img');

    popupTitle.textContent = place.textContent;
    popupImage.src = image.src;
    popupImage.alt = place.textContent;
  
    openPopup(imgPopup);
  });

  return cardElement;
} 

// Отрисовка карточек
initialCards.forEach(card => {
  cardsContainer.append(createCard(card));
});

// Открытие/добавление окна карточки
addBtn.addEventListener('click', () => {
  openPopup(addPopup);
});

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

// Открытие/редактирование окна профиля
editBtn.addEventListener('click', () => {
  userNameInput.setAttribute('value', userName.textContent);
  jobInput.setAttribute('value', job.textContent);

  openPopup(editPopup);
});

const editUserInfo = evt => {
  evt.preventDefault();

  const userNameValue = userNameInput.value;
  const jobValue = jobInput.value;

  userName.textContent = userNameValue;
  job.textContent = jobValue;

  closePopup(editPopup);
}
editForm.addEventListener('submit', editUserInfo);

// Закрытие по клике на крестик
closeBtn.forEach(button => {
  button.addEventListener('click', evt => {
    closePopup(evt.target.closest('.popup'))
  });
});