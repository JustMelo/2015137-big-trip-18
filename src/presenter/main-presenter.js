import RoutePointPresenter from './route-point-presenter.js';
import HeaderInfoView from '../view/header-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import RouteListView from '../view/route-points-list-view.js';
import NoRoutePointView from '../view/no-route-point-view.js';
import {render, RenderPosition} from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { FilterType, SortType } from '../const.js';
import { getUpcomingRoutes, getPassedRoutes } from '../utils/filter.js';

import {
  sortRoutesByDate,
  sortRoutesByPrice,
  sortRoutesByTime
} from '../utils/sort.js';

const headerInfoElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const sortElement = document.querySelector('.trip-events');

export default class MainPresenter {
  #routeModel = null;
  #routePoints = null;
  #destinations = null;
  #offersData = null;

  #routeListComponent = new RouteListView();
  #sortComponent = new SortView();

  #routePointPresenter = new Map();

  #originRoutePoints = [];
  #currentFilterType = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY;

  constructor(routeModel) {
    this.#routeModel = routeModel;
  }

  init = () => {
    this.#routePoints = [...this.#routeModel.routePoints];
    this.#destinations = [...this.#routeModel.destinationPoints];
    this.#offersData = [...this.#routeModel.offersData];

    this.#routePoints.sort(sortRoutesByDate);

    this.#originRoutePoints = this.#routePoints;
    this.#renderBoard();
  };

  #renderBoard = () => {
    this.#renderFilter();
    this.#renderRouteList();

    if (this.#routePoints.every((point) => point.isArchive)) {
      this.#renderNoRoutes();
      return;
    }

    this.#renderRouteList();
    this.#renderRoutes();
    this.#renderHeader();
    this.#renderSort();
  };

  #renderFilter = () => {
    const filterComponent = new FilterView(this.#originRoutePoints);

    render(filterComponent, filterElement, RenderPosition.AFTERBEGIN);
    filterComponent.setFilterChangeHandler(this.#handleFilterChange);
  };

  #renderSort = () => {
    render(this.#sortComponent, sortElement, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoRoutes = () => {
    render(new NoRoutePointView(this.#currentFilterType), this.#routeListComponent.element);
  };

  #renderRouteList = () => {
    render(this.#routeListComponent, sortElement);
  };

  #renderHeader = () => {
    render(new HeaderInfoView( this.#routePoints, this.#destinations ), headerInfoElement, RenderPosition.AFTERBEGIN);
  };

  #renderRoutes = () => {
    this.#routePoints.forEach((routePoint) => {
      this.#renderRoutePoint([routePoint, this.#destinations, this.#offersData]);
    });
  };

  #renderRoutePoint = (routePointData) => {
    const routePointPresenter = new RoutePointPresenter(
      this.#routeListComponent.element,
      this.#handleFavoriteChange,
      this.#handleModeChange
    );

    routePointPresenter.init(routePointData);
    this.#routePointPresenter.set(routePointData[0].id, routePointPresenter);
  };

  #clearRoutePoints = () => {
    this.#routePointPresenter.forEach((element) => element.destroy());
    this.#routePointPresenter.clear();
  };

  #handleFavoriteChange = (updatedRoutePoint) => {
    this.#routePoints = updateItem(this.#routePoints, updatedRoutePoint);
    this.#originRoutePoints = updateItem(this.#originRoutePoints, updatedRoutePoint);
    this.#routePointPresenter.get(updatedRoutePoint.id).init([updatedRoutePoint, this.#destinations, this.#offersData]);
  };

  #handleModeChange = () => {
    this.#routePointPresenter.forEach((element) => element.resetView());
  };

  #filterRoutePoints = (filter) => {
    this.#routePoints = this.#originRoutePoints;
    this.#currentSortType = SortType.DAY;
    this.#handleSortTypeChange(this.#currentSortType);

    switch(filter) {
      case (FilterType.FUTURE):
        this.#routePoints = getUpcomingRoutes(this.#routePoints);
        break;
      case (FilterType.PAST):
        this.#routePoints = getPassedRoutes(this.#routePoints);
        break;
    }

    this.#currentFilterType = filter;
  };

  #sortRoutePoints = (sort) => {
    switch(sort) {
      case (SortType.DAY):
        this.#routePoints.sort(sortRoutesByDate);
        break;
      case (SortType.TIME):
        this.#routePoints.sort(sortRoutesByTime);
        break;
      case (SortType.PRICE):
        this.#routePoints.sort(sortRoutesByPrice);
        break;
    }

  };

  #handleFilterChange = (filter) => {
    if (this.#currentFilterType === filter) {
      return;
    }

    this.#sortRoutePoints(SortType.DAY);
    this.#filterRoutePoints(filter);
    this.#clearRoutePoints();
    this.#renderRoutes();
  };

  #handleSortTypeChange = (sort) => {
    if (this.#currentSortType === sort) {
      return;
    }

    this.#currentSortType = sort;
    this.#sortRoutePoints(sort);
    this.#clearRoutePoints();
    this.#renderRoutes();
  };
}
