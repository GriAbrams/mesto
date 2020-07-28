// Задание переменных
let editBtn = document.querySelector('.profile__btn_action_edit');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__close-btn');
let saveBtn = document.querySelector('.popup__save-btn');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job')

// Событие при нажатии на кнопку редактирования профиля
editBtn.addEventListener('click', function popupOpen() {
  popup.classList.add('popup_opened');
});

// Событие при нажатии на кнопку закрыть окно
closeBtn.addEventListener('click', function popupClose() {
  popup.classList.remove('popup_opened');
});

// Событие отправки формы
let formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
    evt.preventDefault();
    // Получение информации из полей формы
    let nameInput = document.querySelector('#name').value;
    let jobInput = document.querySelector('#job').value;
    // Вставка полученной информации на сайт
    name.textContent = nameInput;
    job.textContent = jobInput;
}
formElement.addEventListener('submit', formSubmitHandler);

// Закрытие окна редактирования после нажатия на кнопку сохранить
saveBtn.addEventListener('click', function popupClose() {
  popup.classList.remove('popup_opened');
});