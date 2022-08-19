import HeaderInfoView from '../view/header-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import RouteListView from '../view/route-points-list-view.js';
import RouteEditorView from '../view/route-editor-view.js';
import RoutePointView from '../view/route-point-view.js';
import {render} from '../render.js';
import { RenderPosition } from '../render.js';

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

  init = (routeModel) => {
    this.#routeModel = routeModel;
    this.#routePoints = [...this.#routeModel.routePoints];
    this.#destinations = [...this.#routeModel.destinationPoints];
    this.#offersData = [...this.#routeModel.offersData];

    render(this.#filterComponent, filterElement, RenderPosition.AFTERBEGIN);
    render(new HeaderInfoView(this.#routePoints, this.#destinations), headerInfoElement, RenderPosition.AFTERBEGIN);
    render(this.#routeListComponent, sortElement);
    render(this.#sortComponent, sortElement, RenderPosition.AFTERBEGIN);
    render(new RouteEditorView(this.#destinations[1], this.#routePoints[1]), this.#routeListComponent.element);

    for (let i = 0; i < this.#routePoints.length; i++) {
      render(new RoutePointView(this.#routePoints[i], this.#destinations, this.#offersData), this.#routeListComponent.element);
    }
  };
}
