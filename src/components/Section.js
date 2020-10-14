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

  addItemAppend(elem) {
    this._container.append(elem);
  } 

  addItemPrepend(elem) {
    this._container.prepend(elem);
  }
}