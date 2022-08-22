import { generateRoutePoint } from '../mock/route-point.js';
import { createAllDestinations } from '../mock/destination.js';
import { ALL_OFFERS } from '../mock/offersData.js';
import { getRandomNumberInRange } from '../utils.js';
import { MAX_POINTS, DESTINATIONS_MID as MIN_POINTS } from '../const.js';

export default class RoutePointModel {
  #routePoints = Array.from({length: getRandomNumberInRange(MIN_POINTS, MAX_POINTS)}, generateRoutePoint);
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
