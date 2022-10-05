import AbstractView from '../framework/view/abstract-view.js';
import { changeDateToMonthDays } from '../utils/date.js';
import { DESTINATIONS_MAX, DESTINATIONS_MID } from '../const.js';

const getRouteOffersPrice = (routePoints, offers) => {
  let totalOffersPrice = 0;

  routePoints.map( (point) => {
    const offersByType = offers.find( (elem) => elem.type === point.type );

    point.offers.forEach( (id) => {
      const offer = offersByType.offers.find( (elem) => elem.id === id );

      totalOffersPrice += offer.price;
    });
  });

  return totalOffersPrice;
};

const getTotalPrice = (points, offers) => {
  const initialValue = 0;
  let totalPrice = points.reduce((total, currentPoint) => (Number(total) + Number(currentPoint.basePrice)), initialValue);

  const offersValue = getRouteOffersPrice(points, offers);

  totalPrice += offersValue;

  return totalPrice;
};

const getStartDate = (points) => {
  const startDate = changeDateToMonthDays(points[0].dateFrom);
  const endDate = changeDateToMonthDays(points[points.length - 1].dateTo);

  if (startDate.split(' ', 1).toString() === endDate.split(' ', 1).toString()) {
    const dayOfEndDate = endDate.split(' ');
    return `${startDate} - ${dayOfEndDate[1]}`;
  }

  return `${startDate} - ${endDate}`;
};

const getRoutePointsCount = (points, destinations) => {

  const selectedDestinationPoints = points.map( (point) => destinations.find( (elem) => point.destination === elem.id));

  const firstPointName = selectedDestinationPoints[0].name;
  const lastPointName = selectedDestinationPoints[selectedDestinationPoints.length - 1].name;

  if (selectedDestinationPoints.length === DESTINATIONS_MID) {
    return (`${firstPointName} - ${lastPointName}`);
  }

  if (selectedDestinationPoints.length === DESTINATIONS_MAX) {
    const middlePointName = selectedDestinationPoints[1].name;
    return (`${firstPointName} - ${middlePointName} - ${lastPointName}`);
  }

  if (selectedDestinationPoints.length === 1) {
    return (`${firstPointName}`);
  }

  return (`${firstPointName} - ... - ${lastPointName}`);
};

const createNewHeaderInfoTemplate = (routePoints ,destinations, offers) => {

  const points = [...routePoints];
  const allDestinations = [...destinations];

  return (
    `<section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getRoutePointsCount(points, allDestinations)}</h1>
        <p class="trip-info__dates">${getStartDate(points)}</p>
      </div>
      <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${getTotalPrice(points, offers)}</span>
      </p>
    </section>`
  );

};

export default class HeaderInfoView extends AbstractView {

  #routePoints = null;
  #destinations = null;
  #offers = null;

  constructor(routePoints, destinations, offers) {
    super();
    this.#routePoints = routePoints;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createNewHeaderInfoTemplate(this.#routePoints, this.#destinations, this.#offers);
  }
}
