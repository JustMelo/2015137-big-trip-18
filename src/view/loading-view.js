import AbstractView from '../framework/view/abstract-view.js';

const createNoRoutesTemplate = () => (
  `<p class="board__no-tasks">
    Loading...
  </p>`
);

export default class LoadingView extends AbstractView {

  get template() {
    return createNoRoutesTemplate();
  }
}
