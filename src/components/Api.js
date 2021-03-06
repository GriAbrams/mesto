export default class Api {
  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _sendRequest(link, params) {
    return fetch(link, params)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserInfo() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    });
  }

  getInitialCards() {
    return this._sendRequest(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    });
  }

  editUserInfo(data) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  addNewCard(data) {
    return this._sendRequest(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  deleteCard(cardId) {
    return this._sendRequest(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  putCardLike(cardId) {
    return this._sendRequest(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  deleteCardLike(cardId) {
    return this._sendRequest(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  editUserAvatar(data) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })
    });
  }
}