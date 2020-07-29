// Задание переменных
let editBtn = document.querySelector('.profile__btn_action_edit');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__close-btn');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');

// Событие при нажатии на кнопку редактирования профиля
function openPopup() {
  popup.classList.add('popup_opened');
  // Заполнение полей формы значениями "Имя" и "О себе", отображенными на странице
  nameInput.setAttribute('value', name.textContent);
  jobInput.setAttribute('value', job.textContent);
}
editBtn.addEventListener('click', openPopup);

// Событие при нажатии на кнопку закрыть окно
function closePopup() {
  popup.classList.remove('popup_opened');
}
closeBtn.addEventListener('click', closePopup);

// Событие отправки формы
let formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
    evt.preventDefault();
    // Получение значений полей 
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    // Вставка значений полей в элементы на странице
    name.textContent = nameValue;
    job.textContent = jobValue;
    // Закрытие окна при клипе на кнопку сохранить
    closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);
