import {createElement} from '../render.js';

const createNewRoutListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class RouteListView {
  #element = null;

  get template() {
    return createNewRoutListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
