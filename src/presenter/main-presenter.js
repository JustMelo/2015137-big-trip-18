import RoutePointPresenter from './route-point-presenter.js';
import RoutePointNewPresenter from './route-point-new-presenter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import HeaderInfoView from '../view/header-info-view.js';
import SortView from '../view/sort-view.js';
import RouteListView from '../view/route-points-list-view.js';
import NoRoutePointView from '../view/no-route-point-view.js';
import LoadingView from '../view/loading-view.js';
import RouteNewButtonView from '../view/route-new-button.js';
import { filterRoutes } from '../utils/filter.js';
import { checkInitState } from '../utils/common.js';
import {
  remove,
  render,
  RenderPosition
} from '../framework/render.js';
import {
  FilterType,
  SortType,
  UpdateType,
  UserAction,
  TimeLimit,
} from '../const.js';
import {
  sortRoutesByDate,
  sortRoutesByPrice,
  sortRoutesByTime
} from '../utils/sort.js';

const headerInfoElement = document.querySelector('.trip-main');
const sortElement = document.querySelector('.trip-events');

export default class MainPresenter {
  #routeModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #noRoutesComponent = null;
  #sortComponent = null;
  #routeNewButtonComponent = null;
  #headerComponent = null;
  #loadingComponent = new LoadingView();
  #routeListComponent = new RouteListView();
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  #routePointNewPresenter = null;
  #routePointPresenter = new Map();

  #currentFilterType = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY;
  #isLoading = true;

  #initData = {
    POINT: false,
    DESTINATIONS: false,
    OFFERS: false,
  };

  constructor(routeModel, destinationsModel, offersModel, filterModel) {
    this.#routeModel = routeModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#routePointNewPresenter = new RoutePointNewPresenter(this.#routeListComponent.element, this.#handleViewAction);

    this.#routeModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get routePoints() {

    this.#currentFilterType = this.#filterModel.filter;
    const routes = this.#routeModel.routePoints;
    const filteredRoutes = filterRoutes(this.#currentFilterType, routes);

    switch(this.#currentSortType) {

      case (SortType.DAY):
        return [...filteredRoutes].sort(sortRoutesByDate);

      case (SortType.TIME):
        return [...filteredRoutes].sort(sortRoutesByTime);

      case (SortType.PRICE):
        return [...filteredRoutes].sort(sortRoutesByPrice);

    }
    return filteredRoutes;
  }

  init = () => {
    this.#renderBoard();
  };

  #renderBoard = () => {
    this.#renderRouteList();

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderNewRouteButton();

    if (this.routePoints.every((point) => point.isArchive)) {
      this.#renderNoRoutes();
      return;
    }

    this.#renderRoutes();
    this.#renderHeader();
    this.#renderSort();
  };

  #createRoutePoint = (cb) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#routePointNewPresenter.init(cb, this.#destinationsModel.destinations, this.#offersModel.offers);
  };

  #renderNewRouteButton = () => {
    this.#routeNewButtonComponent = new RouteNewButtonView();
    this.#routeNewButtonComponent.setClickHandler(this.#handleNewRouteButtonClick);
    render(this.#routeNewButtonComponent, headerInfoElement);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, sortElement, RenderPosition.AFTERBEGIN);
  };

  #renderNoRoutes = () => {
    this.#noRoutesComponent = new NoRoutePointView(this.#currentFilterType);
    render(this.#noRoutesComponent, this.#routeListComponent.element);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#routeListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderRouteList = () => {
    render(this.#routeListComponent, sortElement);
  };

  #renderHeader = () => {
    this.#headerComponent = new HeaderInfoView( this.#routeModel.routePoints, this.#destinationsModel.destinations, this.#offersModel.offers );
    render(this.#headerComponent, headerInfoElement, RenderPosition.AFTERBEGIN);
  };

  #renderRoutes = () => {
    if (this.routePoints.every((point) => point.isArchive)) {
      this.#renderNoRoutes();
      return;
    }

    this.routePoints.forEach((routePoint) => {
      this.#renderRoutePoint([routePoint, this.#destinationsModel.destinations, this.#offersModel.offers]);
    });
  };

  #renderRoutePoint = (routePointData) => {
    const currentRoutePoint = routePointData[0];

    const routePointPresenter = new RoutePointPresenter(
      this.#routeListComponent.element,
      this.#handleViewAction,
      this.#handleModeChange
    );

    routePointPresenter.init(routePointData);
    this.#routePointPresenter.set(currentRoutePoint.id, routePointPresenter);
  };

  #clearBoard = ({resetSortType = false} = {}) => {

    this.#routePointNewPresenter.destroy();
    this.#routePointPresenter.forEach((element) => element.destroy());
    this.#routePointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#headerComponent);

    if (this.#noRoutesComponent) {
      remove(this.#noRoutesComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #handleModeChange = () => {
    this.#routePointNewPresenter.destroy();
    this.#routePointPresenter.forEach((element) => element.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {

      case UserAction.UPDATE_ROUTE:
        this.#routePointPresenter.get(update.id).setSaving();

        try {
          await this.#routeModel.updateRoute(updateType, update);
        }
        catch(err) {
          this.#routePointPresenter.get(update.id).setAborting();
        }

        break;

      case UserAction.ADD_ROUTE:
        this.#routePointPresenter.setSaving();

        try {
          await this.#routeModel.addRoute(updateType, update);
        }
        catch(err) {
          this.#routePointPresenter.setAborting();
        }

        break;

      case UserAction.DELETE_ROUTE:
        this.#routePointPresenter.get(update.id).setDeleting();

        try {
          await this.#routeModel.deleteRoute(updateType, update);
        }
        catch(err) {
          this.#routePointPresenter.get(update.id).setAborting();
        }

        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {

      case UpdateType.PATCH:
        this.#routePointPresenter.get(data.id).init(data);
        break;

      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderRoutes();
        this.#renderHeader();
        this.#renderSort();
        break;

      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderRoutes();
        this.#renderHeader();
        this.#renderSort();
        break;

      case UpdateType.INIT:
        this.#initData[data] = !this.#initData[data];

        if (checkInitState(this.#initData))
        {
          this.#isLoading = false;
          remove(this.#loadingComponent);
          this.#renderBoard();
        }
        break;
    }
  };

  #handleSortTypeChange = (sort) => {
    if (this.#currentSortType === sort) {
      return;
    }
    this.#currentSortType = sort;
    this.#clearBoard();
    this.#renderRoutes();
    this.#renderSort();
  };

  #handleNewRouteButtonClick = () => {
    this.#createRoutePoint(this.#handleNewRouteFormClose);
    this.#routeNewButtonComponent.element.disabled = true;
  };

  #handleNewRouteFormClose = () => {
    this.#routeNewButtonComponent.element.disabled = false;
  };
}
