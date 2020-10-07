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

  setUserInfo(userName, userJob) {
    this._nameSelector.textContent = userName;
    this._infoSelector.textContent = userJob;
  }
}