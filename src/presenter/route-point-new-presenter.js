import { ROUTE_BLANK } from '../const.js';
import RouteEditorView from '../view/route-editor-view.js';
import { UserAction, UpdateType } from '../const.js';
import { remove, render, RenderPosition } from '../framework/render';
import { isEscapeKey } from '../utils/common.js';

export default class RoutePointNewPresenter {
  #routeListContainer = null;
  #changeData = null;
  #routeEditComponent = null;
  #destroyCallback = null;
  #routeBlank = ROUTE_BLANK;

  constructor(routeListContainer, changeData) {
    this.#routeListContainer = routeListContainer;
    this.#changeData = changeData;
  }

  init = (cb, destinations, offers) => {
    this.#destroyCallback = cb;

    if (this.#routeEditComponent !== null) {
      return;
    }

    this.#routeEditComponent = new RouteEditorView(this.#routeBlank, destinations, offers);
    this.#routeEditComponent.setEditSubmitHandler(this.#handleFormSubmit);
    this.#routeEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#routeEditComponent, this.#routeListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  destroy = () => {
    if (this.#routeEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#routeEditComponent);
    this.#routeEditComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  setSaving = () => {
    this.#routeEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#routeEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#routeEditComponent.shake(resetFormState);
  };

  #handleFormSubmit = (route) => {
    this.#changeData(
      UserAction.ADD_ROUTE,
      UpdateType.MINOR,
      route,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
