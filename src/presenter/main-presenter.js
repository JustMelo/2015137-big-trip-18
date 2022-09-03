import RoutePointPresenter from './route-point-presenter.js';
import HeaderInfoView from '../view/header-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import RouteListView from '../view/route-points-list-view.js';
import NoRoutePointView from '../view/no-route-point-view.js';
import {render, RenderPosition} from '../framework/render.js';
import { updateItem } from '../utils.js';

const headerInfoElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const sortElement = document.querySelector('.trip-events');

export default class MainPresenter {
  #routeModel = null;
  #routePoints = null;
  #destinations = null;
  #offersData = null;

  #routeListComponent = new RouteListView();
  #filterComponent = new FilterView();
  #sortComponent = new SortView();

  #routePointPresenter = new Map();

  constructor(routeModel) {
    this.#routeModel = routeModel;
  }

  init = () => {
    this.#routePoints = [...this.#routeModel.routePoints];
    this.#destinations = [...this.#routeModel.destinationPoints];
    this.#offersData = [...this.#routeModel.offersData];
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

  #handleFavoriteChange = (updatedRoutePoint) => {
    this.#routePoints = updateItem(this.#routePoints, updatedRoutePoint);
    this.#routePointPresenter.get(updatedRoutePoint.id).init([updatedRoutePoint, this.#destinations, this.#offersData]);
  };

  #handleModeChange = () => {
    this.#routePointPresenter.forEach((element) => element.resetView());
  };

  #renderFilter = () => {
    render(this.#filterComponent, filterElement, RenderPosition.AFTERBEGIN);
  };

  #renderSort = () => {
    render(this.#sortComponent, sortElement, RenderPosition.AFTERBEGIN);
  };

  #renderNoRoutes = () => {
    render(new NoRoutePointView(), this.#routeListComponent.element);
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

  #clearRoutePointList = () => {
    this.#routePointPresenter.forEach((element) => element.destroy());
    this.#routePointPresenter.clear();
  };
}
