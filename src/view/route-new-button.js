import AbstractView from '../framework/view/abstract-view.js';

const createNewRouteButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class RouteNewButtonView extends AbstractView {
  get template() {
    return createNewRouteButtonTemplate();
  }

  setClickHandler = (cb) => {
    this._callback.click = cb;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
