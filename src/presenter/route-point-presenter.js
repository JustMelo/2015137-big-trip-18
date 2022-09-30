import RouteEditorView from '../view/route-editor-view.js';
import RoutePointView from '../view/route-point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import { Mode, UpdateType, UserAction } from '../const.js';

export default class RoutePointPresenter {
  #routeListComponent = null;
  #routePointComponent = null;
  #pointEditorComponent = null;

  #changeData = null;
  #changeMode = null;
  #routePointData = null;

  #mode = Mode.DEFAULT;

  constructor(routeListComponent, changeData, changeMode) {
    this.#routeListComponent = routeListComponent;

    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (routePointData) => {
    this.#routePointData = routePointData[0];

    const prevRoutePointComponent = this.#routePointComponent;
    const prevEditorComponent = this.#pointEditorComponent;

    this.#routePointComponent = new RoutePointView(...routePointData);
    this.#pointEditorComponent = new RouteEditorView(...routePointData);

    this.#routePointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#routePointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditorComponent.setEditSubmitHandler(this.#handleFormSubmit);
    this.#pointEditorComponent.setCancelClickHandler(this.#handleCancleClick);
    this.#pointEditorComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevRoutePointComponent === null || prevEditorComponent === null) {
      render(this.#routePointComponent, this.#routeListComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#routePointComponent, prevRoutePointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditorComponent, prevEditorComponent);
    }

    remove(prevRoutePointComponent);
    remove(prevEditorComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditorComponent.reset(this.#routePointData);
      this.#closeEditor();
    }
  };

  #openEditor = () => {
    replace(this.#pointEditorComponent, this.#routePointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #closeEditor = () => {
    replace(this.#routePointComponent, this.#pointEditorComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#pointEditorComponent.reset(this.#routePointData);
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#closeEditor();
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_ROUTE,
      UpdateType.MINOR,
      {...this.#routePointData, isFavorite: !this.#routePointData.isFavorite},
    );
  };

  #handleEditClick = () => {
    this.#openEditor();
  };

  #handleFormSubmit = (routePoint) => {
    this.#changeData(
      UserAction.UPDATE_ROUTE,
      UpdateType.MINOR,
      routePoint,
    );
    this.#closeEditor();
  };

  #handleCancleClick = () => {
    this.#pointEditorComponent.reset(this.#routePointData);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#closeEditor();
  };

  #handleDeleteClick = (routePoint) => {
    this.#changeData(
      UserAction.DELETE_ROUTE,
      UpdateType.MINOR,
      routePoint,
    );
  };

  destroy = () => {
    remove(this.#routePointComponent);
    remove(this.#pointEditorComponent);
  };
}
