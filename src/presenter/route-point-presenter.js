import { render, replace } from '../framework/render.js';
import RouteEditorView from '../view/route-editor-view.js';
import RoutePointView from '../view/route-point-view.js';
import { isEscapeKey } from '../utils.js';

export default class RoutePointPresenter {
  #routeListComponent = null;
  #routePointComponent = null;
  #pointEditorComponent = null;
  #routePointData = null;

  constructor(routeListComponent) {
    this.#routeListComponent = routeListComponent;
  }

  init = (routePointData) => {
    this.#routePointData = routePointData;

    this.#routePointComponent = new RoutePointView(...routePointData);
    this.#pointEditorComponent = new RouteEditorView(...routePointData);

    this.#routePointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditorComponent.setEditSubmitHandler(this.#handleFormSubmit);
    this.#pointEditorComponent.setCancelClickHandler(this.#handleCancleClick);

    render(this.#routePointComponent, this.#routeListComponent);
  };

  #replacePointToEditor = () => {
    replace(this.#routePointComponent, this.#pointEditorComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #replaceEditorToPoint = () => {
    replace(this.#pointEditorComponent, this.#routePointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceEditorToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleEditClick = () => {
    this.#replacePointToEditor();
  };

  #handleFormSubmit = () => {
    this.#replaceEditorToPoint();
  };

  #handleCancleClick = () => {
    this.#replaceEditorToPoint();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}
