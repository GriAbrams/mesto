import {userNameInput, jobInput} from '../utils/constants.js';

export default class UserInfo {
  constructor (nameSelector, infoSelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
  }

  getUserInfo() {
    const info = {
      name: this._nameSelector.textContent,
      job: this._infoSelector.textContent
    }
    return info;
  }

  setUserInfo() {
    this._nameSelector.textContent = userNameInput.value;
    this._infoSelector.textContent = jobInput.value;
  }
}