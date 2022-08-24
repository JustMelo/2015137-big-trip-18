import { createAllDestinations } from '../mock/destination.js';
import { ALL_OFFERS } from '../mock/offersData.js';
import { createRoutePoints } from '../mock/route-point.js';

export default class RoutePointModel {
  #routePoints = createRoutePoints();
  #destinationPoints = createAllDestinations();
  #offersData = ALL_OFFERS.slice();

  get routePoints() {
    return this.#routePoints;
  }

  get destinationPoints() {
    return this.#destinationPoints;
  }

  get offersData() {
    return this.#offersData;
  }
}
