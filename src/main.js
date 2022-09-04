import MainPresenter from './presenter/main-presenter.js';
import RoutePointModel from './model/route-point-model.js';

const routeModel = new RoutePointModel();
const mainPresenter = new MainPresenter(routeModel);

mainPresenter.init();
