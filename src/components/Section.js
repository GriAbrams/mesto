export default class Section {
  constructor ({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(elem, addCard) {
    if (addCard === 'append') {
      this._container.append(elem);
    } else {
      this._container.prepend(elem);
    }
  }
}