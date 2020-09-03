// Контейнер карточек
const cardsContainer = document.querySelector('.elements');
// Попапы
const editPopup = document.querySelector('.popup_action_edit');
const addPopup = document.querySelector('.popup_action_add');
const imgPopup = document.querySelector('.popup_action_opened-img');
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

// Открытие попапа
const openPopup = (mod) => {
  mod.classList.add('popup_action_opened');
}

// Закрытие попапа
const closePopup = (mod) => {
  mod.classList.remove('popup_action_opened');
}

// Создание карточки
const createCard = (card) => {
  const cardElement = document.querySelector('#card-template').content.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__img');

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  // Кнопка удаления карточки
  const deleteBtn = cardElement.querySelector('.card__btn_action_delete');

  deleteBtn.addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });

  // Лайк карточки
  const likeBtn = cardElement.querySelector('.card__btn_action_like');

  likeBtn.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__btn_active');
  });

  // Открытие просмотра карточки
  const cardImg = cardElement.querySelector('.card__img');

  cardImg.addEventListener('click', (evt) => {
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
initialCards.forEach( (card) => {
  cardsContainer.append(createCard(card));
});

// Открытие/добавление окна карточки
addBtn.addEventListener('click', () => {
  openPopup(addPopup);
});

const addNewCard = (evt) => {
  evt.preventDefault();

  const placeNameValue = placeNameInput.value;
  const linkValue = linkInput.value;
  const newCard = {name: placeNameValue, link: linkValue};
  const submitBtn = evt.target.querySelector('.popup__btn_action_save');

  cardsContainer.prepend(createCard(newCard));

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

  const userNameValue = userNameInput.value;
  const jobValue = jobInput.value;

  userName.textContent = userNameValue;
  job.textContent = jobValue;

  closePopup(editPopup);
}
editForm.addEventListener('submit', editUserInfo);

// Закрытие по клике на крестик
closeBtn.forEach((button) => {
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