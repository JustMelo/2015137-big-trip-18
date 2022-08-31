import RoutePointPresenter from './route-point-presenter.js';
import HeaderInfoView from '../view/header-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import RouteListView from '../view/route-points-list-view.js';
import NoRoutePointView from '../view/no-route-point-view.js';
import {render, RenderPosition} from '../framework/render.js';

const headerInfoElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const sortElement = document.querySelector('.trip-events');

export default class BoardPresenter {
  #routeModel = null;
  #routePoints = null;
  #destinations = null;
  #offersData = null;

  #routeListComponent = new RouteListView();
  #filterComponent = new FilterView();
  #sortComponent = new SortView();

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
    this.#routePoints.forEach((element) => {
      this.#renderRoutePoint([element, this.#destinations, this.#offersData]);
    });
  };

  #renderRoutePoint = (routePointData) => {
    const routePointPresenter = new RoutePointPresenter(this.#routeListComponent.element);
    routePointPresenter.init(routePointData);
  };
}
