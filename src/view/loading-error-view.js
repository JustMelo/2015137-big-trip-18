import AbstractView from '../framework/view/abstract-view.js';

const createLoadingErrorTemplate = () => (
  `<p class="loading-error__no-data">
    Loading error, try refreshing the page.
  </p>`
);

export default class LoadingErrorView extends AbstractView {

  get template() {
    return createLoadingErrorTemplate();
  }
}
