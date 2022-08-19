import BoardPresenter from './presenter/main-presenter.js';
import RoutePointModel from './model/route-point-model.js';

const boardPresenter = new BoardPresenter();
const routeModel = new RoutePointModel();

boardPresenter.init(routeModel);
