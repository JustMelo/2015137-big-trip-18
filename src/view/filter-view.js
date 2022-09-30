import AbstractView from '../framework/view/abstract-view.js';

const getFilters = (filter, currentFilterType) => filter.map( (elem) => {
  const {type, name, count} = elem;

  return (
    `
      <div class="trip-filters__filter">
        <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${count === 0 ? 'disabled' : ''}
        ${type === currentFilterType ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
      </div>
    `
  );
}).join('');

const createNewFiltersElementTemplate = (filter, currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">
    ${getFilters(filter, currentFilterType)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createNewFiltersElementTemplate(this.#filters, this.#currentFilter);
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
