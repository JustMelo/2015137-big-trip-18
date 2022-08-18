import { generateRoutePoint } from '../mock/route-point.js';
import { createAllDestinations } from '../mock/destination.js';
import { AllOffers } from '../mock/offersData.js';

export default class RoutePointModel {
  routePoints = Array.from({length: 7}, generateRoutePoint);
  destinationPoints = createAllDestinations();
  offersData = AllOffers;

  getRoutePoints = () => this.routePoints;
  getDestinationPoints = () => this.destinationPoints;
  getOffersData = () => this.offersData;
}
