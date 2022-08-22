import HeaderInfoView from '../view/header-info-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import RouteListView from '../view/route-points-list-view.js';
import RouteEditorView from '../view/route-editor-view.js';
import RoutePointView from '../view/route-point-view.js';
import {render} from '../render.js';
import { RenderPosition } from '../render.js';
import { isEscapeKey } from '../utils.js';

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

    for (let i = 0; i < this.#routePoints.length; i++) {
      this.#renderRoutePoint([this.#routePoints[i], this.#destinations, this.#offersData]);
    }
  };

  #renderRoutePoint = (routePointData) => {
    const routePointComponent = new RoutePointView(...routePointData);
    const pointEditorComponent = new RouteEditorView(...routePointData);

    const replacePointToEditor = () => {
      this.#routeListComponent.element.replaceChild(pointEditorComponent.element, routePointComponent.element);
    };

    const replaceEditorToPoint = () => {
      this.#routeListComponent.element.replaceChild(routePointComponent.element, pointEditorComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceEditorToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    routePointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditor();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditorComponent.element.querySelector('.event__save-btn').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditorToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditorComponent.element.querySelector('.event__reset-btn').addEventListener('click', () => {
      replaceEditorToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(routePointComponent, this.#routeListComponent.element);
  };
}
