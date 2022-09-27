import RouteEditorView from '../view/route-editor-view.js';
import { UserAction, UpdateType } from '../const.js';
import { remove, render } from '../framework/render';
import { isEscapeKey } from '../utils/common.js';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890');

export default class RoutePointNewPresenter {
  #routeListContainer = null;
  #changeData = null;
  #routeEditComponent = null;
  #destroyCallback = null;

  constructor(routeListContainer, changeData) {
    this.#routeListContainer = routeListContainer;
    this.#changeData = changeData;
  }

  init = (cb) => {
    this.#destroyCallback = cb;

    if (this.#routeEditComponent !== null) {
      return;
    }

    this.#routeEditComponent = new RouteEditorView();
    this.#routeEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#routeEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#routeEditComponent, this.#routeListContainer);

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

  #handleFormSubmit = (route) => {
    this.#changeData(
      UserAction.ADD_ROUTE,
      UpdateType.MINOR,
      {
        id: nanoid(),
        destination: nanoid(),
        ...route
      },
    );
    this.destroy();
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
