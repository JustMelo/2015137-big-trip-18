import { createElement } from '../render.js';

const displayNoRoutePointTemplate = () => (
  `<p class="trip-events__msg">
    Click New Event to create your first point
  </p>`
);

export default class NoRoutePointView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return displayNoRoutePointTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
