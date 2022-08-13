import {createElement} from '../render.js';

const createNewRoutListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class RouteListView {
  getTemplate() {
    return createNewRoutListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
