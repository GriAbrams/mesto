export const imgPopup = document.querySelector('.popup_action_opened-img');
export const popupTitle = imgPopup.querySelector('.popup__title');
export const popupImage = imgPopup.querySelector('.popup__img');

export const openPopup = (mod) => {
  mod.classList.add('popup_action_opened');
}

export const closePopup = (mod) => {
  mod.classList.remove('popup_action_opened');
}