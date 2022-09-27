import FilterView from '../view/filter-view.js';
import { render, replace, remove } from '../framework/render.js';
import { FilterType, UpdateType } from '../const.js';
import { getPassedRoutes, getUpcomingRoutes } from '../utils/filter';

const filterElement = document.querySelector('.trip-controls__filters');

export default class FilterPresenter {
  #routeModel = null;
  #filterModel = null;

  #filterComponent = null;

  constructor (routeModel, filterModel) {
    this.#routeModel = routeModel;
    this.#filterModel = filterModel;

    this.#routeModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const routes = this.#routeModel.routePoints;

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'everything',
        count: routes.length,
      },
      {
        type: FilterType.PAST,
        name: 'past',
        count: getPassedRoutes(routes).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'future',
        count: getUpcomingRoutes(routes).length,
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, filterElement);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
