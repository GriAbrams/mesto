export default class Section {
  constructor ({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(elem, addCard) {
    if (addCard === true) {
      this._container.append(elem);
    } else {
      this._container.prepend(elem);
    }
  }
}