import AbstractView from '../framework/view/abstract-view.js';
import { getUpcomingRoutes, getPassedRoutes } from '../utils/filter.js';

const createNewFiltersElementTemplate = (routePoints) => {

  const setFutureFilter = () => {
    if (getUpcomingRoutes(routePoints).length === 0) {
      return 'disabled';
    }
    return '';
  };

  const setPastFilter = () => {
    if (getPassedRoutes(routePoints).length === 0) {
      return 'disabled';
    }
    return '';
  };

  return (
    `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked="">
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${setFutureFilter()}>
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${setPastFilter()}>
        <label class="trip-filters__filter-label" for="filter-past">Past</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterView extends AbstractView {
  #routePoints = null;

  constructor (routePoints) {
    super();
    this.#routePoints = routePoints;
  }

  get template() {
    return createNewFiltersElementTemplate(this.#routePoints);
  }

  setFilterChangeHandler = (cb) => {
    this._callback.filterChange = cb;
    this.element.addEventListener('change', this.#filterChangeHandler);
  };

  #filterChangeHandler = (evt) => {
    evt.preventDefault();

    this._callback.filterChange(evt.target.value);
  };

}
