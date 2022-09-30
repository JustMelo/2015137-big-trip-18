import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import RoutePointModel from './model/route-point-model.js';
import DestinationModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';

const routeModel = new RoutePointModel();
const destinationsModel = new DestinationModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(routeModel, filterModel);
const mainPresenter = new MainPresenter(routeModel, destinationsModel, offersModel, filterModel);

mainPresenter.init();
filterPresenter.init();
