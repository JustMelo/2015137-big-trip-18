import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import RoutePointModel from './model/route-point-model.js';
import FilterModel from './model/filter-model.js';

const routeModel = new RoutePointModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(routeModel, filterModel);
const mainPresenter = new MainPresenter(routeModel, filterModel);

mainPresenter.init();
filterPresenter.init();
