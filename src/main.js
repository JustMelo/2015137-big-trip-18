import BoardPresenter from './presenter/main-presenter.js';
import RoutePointModel from './model/route-point-model.js';

const routeModel = new RoutePointModel();
const boardPresenter = new BoardPresenter(routeModel);

boardPresenter.init();
