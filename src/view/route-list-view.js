import AbstractView from '../framework/view/abstract-view.js';

const createNewRoutListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class RouteListView extends AbstractView {

  get template() {
    return createNewRoutListTemplate();
  }
}
