import AbstractView from '../framework/view/abstract-view.js';
import { FilterType, FilterText } from '../const.js';

const displayNoRoutePointTemplate = (filterType) => {

  const checkFilterType = () => {

    if (filterType === FilterType.FUTURE) {
      return FilterText.FUTURE;
    }

    if (filterType === FilterType.PAST) {
      return FilterText.PAST;
    }

    return FilterText.EVERYTHING;
  };

  return (
    `<p class="trip-events__msg">
      ${checkFilterType()}
    </p>`
  );
};

export default class NoRoutePointView extends AbstractView {

  #filterType = null;

  constructor(filterType) {
    super();

    this.#filterType = filterType;
  }

  get template() {
    return displayNoRoutePointTemplate(this.#filterType);
  }
}
