import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import RoutePointModel from './model/route-point-model.js';
import DestinationModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import RoutesApiService from './routes-api-service.js';
import { RequestHandlers } from './const.js';

const routeApiService = new RoutesApiService(RequestHandlers.RequestData.END_POINT, RequestHandlers.RequestData.AUTHORIZATION);

const routeModel = new RoutePointModel(routeApiService);
const destinationsModel = new DestinationModel(routeApiService);
const offersModel = new OffersModel(routeApiService);
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(routeModel, filterModel);
const mainPresenter = new MainPresenter(routeModel, destinationsModel, offersModel, filterModel);

mainPresenter.init();
filterPresenter.init();
destinationsModel.init();
offersModel.init();
routeModel.init();
