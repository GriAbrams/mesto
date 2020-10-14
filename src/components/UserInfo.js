export default class UserInfo {
  constructor (nameSelector, infoSelector, avatarSelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const info = {
      name: this._nameSelector.textContent,
      about: this._infoSelector.textContent
    }
    return info;
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._infoSelector.textContent = data.about;
    this.setUserAvatar(data);
  }

  setUserAvatar(data) {
    this._avatarSelector.src = data.avatar;
  }
}