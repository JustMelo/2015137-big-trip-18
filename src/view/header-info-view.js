import {createElement} from '../render.js';
import { changeDateToMonthDays } from '../utils.js';

const createNewHeaderInfoTemplate = (routePoints ,destinations) => {
  const points = [...routePoints];
  const allDestinations = [...destinations];

  const getRoutePointsCount = () => {
    const firstPointName = allDestinations[0].name;
    const lastPointName = allDestinations[allDestinations.length - 1].name;

    if (allDestinations.length === 2) {
      return (`${firstPointName} - ${lastPointName}`);
    }

    if (allDestinations.length === 3) {
      const middlePointName = allDestinations[1].name;
      return (`${firstPointName} - ${middlePointName} - ${lastPointName}`);
    }

    return (`${firstPointName} - ... - ${lastPointName}`);
  };

  const getStartDate = () => {
    const startDate = changeDateToMonthDays(points[0].dateFrom);
    const endDate = changeDateToMonthDays(points[0].dateTo);
    if (startDate.split(' ', 1).toString() === endDate.split(' ', 1).toString()) {
      const dayOfEndDate = endDate.split(' ');
      return `${startDate} - ${dayOfEndDate[1]}`;
    }
    return `${startDate} - ${endDate}`;
  };

  const getTotalPrice = () => {
    const initialValue = 0;
    const totalPrice = points.reduce((total, currentPoint) => (Number(total) + Number(currentPoint.basePrice)), initialValue);
    return totalPrice;
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getRoutePointsCount()}</h1>
        <p class="trip-info__dates">${getStartDate()}</p>
      </div>
      <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${getTotalPrice()}</span>
      </p>
    </section>`
  );
};

export default class HeaderInfoView {
  constructor(routePoints, destinations) {
    this.routePoints = routePoints;
    this.destinations = destinations;
  }

  getTemplate() {
    return createNewHeaderInfoTemplate(this.routePoints, this.destinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
