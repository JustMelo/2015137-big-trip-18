import ApiService from './framework/api-service.js';
import { RequestHandlers } from './const.js';
import dayjs from 'dayjs';

export default class RoutesApiService extends ApiService {
  get routePoints() {
    return this._load({url: RequestHandlers.Type.POINTS_GET})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: RequestHandlers.Type.DESTINATIONS})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: RequestHandlers.Type.OFFERS})
      .then(ApiService.parseResponse);
  }

  updateRoute = async (routPoint) => {
    const response = await this._load({
      url: `${RequestHandlers.Type.POINTS_SEND}${routPoint.id}`,
      method: RequestHandlers.Method.PUT,
      body: JSON.stringify(this.#adaptRouteToServer(routPoint)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };

  addRoute = async (route) => {
    const response = await this._load({
      url: `${RequestHandlers.Type.POINTS_SEND}`,
      method: RequestHandlers.Method.POST,
      body: JSON.stringify(this.#adaptRouteToServer(route)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteRoute = async (route) => {
    const response = await this._load({
      url: `${RequestHandlers.Type.POINTS_SEND}${route.id}`,
      method: RequestHandlers.Method.DELETE,
    });

    return response;
  };

  #adaptRouteToServer = (route) => {

    const adaptedRoute = {...route,
      'base_price': route.basePrice,
      'date_from': dayjs(route.dateFrom).toISOString(),
      'date_to': dayjs(route.dateTo).toISOString(),
      'is_favorite': route.isFavorite,
      'offers': route.offers.filter( (elem) => typeof(elem) === 'number'),
    };

    delete adaptedRoute.basePrice;
    delete adaptedRoute.dateFrom;
    delete adaptedRoute.dateTo;
    delete adaptedRoute.isFavorite;

    return adaptedRoute;
  };
}
