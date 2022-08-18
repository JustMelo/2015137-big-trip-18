import { generateRoutePoint } from '../mock/route-point.js';
import { createAllDestinations } from '../mock/destination.js';
import { AllOffers } from '../mock/offersData.js';
import { getRandomNumberInRange } from '../utils.js';

const MIN_POINTS = 2;
const MAX_POINTS = 5;

export default class RoutePointModel {
  routePoints = Array.from({length: getRandomNumberInRange(MIN_POINTS, MAX_POINTS)}, generateRoutePoint);
  destinationPoints = createAllDestinations();
  offersData = AllOffers;

  getRoutePoints = () => this.routePoints;
  getDestinationPoints = () => this.destinationPoints;
  getOffersData = () => this.offersData;
}
