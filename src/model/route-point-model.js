import Observable from '../framework/observable.js';
import { createRoutePoints } from '../mock/route-point.js';

export default class RoutePointModel extends Observable {
  #routePoints = createRoutePoints();

  get routePoints() {
    return this.#routePoints;
  }

  updateRoute = (updateType, update) => {
    const index = this.#routePoints.findIndex((route) => route.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting route');
    }

    this.#routePoints = [
      ...this.#routePoints.slice(0, index),
      update,
      ...this.#routePoints.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addRoute = (updateType, update) => {
    this.#routePoints = [
      update,
      ...this.#routePoints,
    ];

    this._notify(updateType, update);
  };

  deleteRoute = (updateType, update) => {
    const index = this.#routePoints.findIndex((route) => route.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting route');
    }

    this.#routePoints = [
      ...this.#routePoints.slice(0, index),
      ...this.#routePoints.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
