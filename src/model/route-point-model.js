import Observable from '../framework/observable.js';
import { UpdateType, InitData, InitDataError } from '../const.js';
import dayjs from 'dayjs';

export default class RoutePointModel extends Observable {
  #routeApiService = null;
  #routePoints = [];

  constructor (routeApiService) {
    super();
    this.#routeApiService = routeApiService;
  }

  get routePoints() {
    return this.#routePoints;
  }

  init = async () => {
    try
    {
      const routePoints = await this.#routeApiService.routePoints;
      this.#routePoints = routePoints.map(this.#adaptToClient);
      this._notify(UpdateType.INIT, InitData.POINT);
    }
    catch (err)
    {
      this.#routePoints = [];
      this._notify(UpdateType.INIT, InitDataError.POINT);
    }
  };

  updateRoute = async (updateType, update) => {
    const index = this.#routePoints.findIndex((route) => route.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting route');
    }

    try {
      const response = await this.#routeApiService.updateRoute(update);
      const updatedRoute = this.#adaptToClient(response);

      this.#routePoints =
      [
        ...this.#routePoints.slice(0, index),
        updatedRoute,
        ...this.#routePoints.slice(index + 1),
      ];

      this._notify(updateType, updatedRoute);
    }
    catch(err) {
      throw new Error('Can\'t update route');
    }
  };

  addRoute = async (updateType, update) => {
    try {
      const response = await this.#routeApiService.addRoute(update);
      const newRoute = this.#adaptToClient(response);

      this.#routePoints =
      [newRoute, ...this.#routePoints];

      this._notify(updateType, update);
    }
    catch(err) {
      throw new Error('Can\'t add route');
    }
  };

  deleteRoute = async (updateType, update) => {
    const index = this.#routePoints.findIndex((route) => route.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting route');
    }

    try {
      await this.#routeApiService.deleteRoute(update);

      this.#routePoints = [
        ...this.#routePoints.slice(0, index),
        ...this.#routePoints.slice(index + 1),
      ];

      this._notify(updateType);
    }
    catch(err) {
      throw new Error('Can\'t delete route');
    }
  };

  #adaptToClient = (route) => {
    const adaptedRoute = {...route,
      basePrice: route['base_price'],
      dateFrom: dayjs(route[('date_from')]),
      dateTo: dayjs(route[('date_to')]),
      isFavorite: route['is_favorite'],
    };

    delete adaptedRoute['isSaving'];
    delete adaptedRoute['isDisabled'];
    delete adaptedRoute['base_price'];
    delete adaptedRoute['date_from'];
    delete adaptedRoute['date_to'];
    delete adaptedRoute['is_favorite'];

    return adaptedRoute;
  };
}
