import {createElement} from '../render.js';
import { changeDateFormatView } from '../utils.js';
import { changeDateToMonthDays } from '../utils.js';
import { changeDateToHoursMinutes } from '../utils.js';
import { changeDateToYearsMonthsDays } from '../utils.js';
import { getDateDiff } from '../utils.js';

const ctreateOfferTemplate = (routePoint, offersData) => {
  let offersContainer = '';

  const offerType = offersData.filter((data) => data.type === routePoint.type);
  const offersByType = offerType[0].offers;
  const offersMap = new Map(Object.entries(offersByType));
  routePoint.offers.forEach((offerId) => {
    let currentOfferTitle;
    let currentOfferPrice;
    for (const offer of offersMap) {
      if (offer[1].id === offerId) {
        currentOfferTitle = offer[1].title;
        currentOfferPrice = offer[1].price;
        offersContainer += (
          `<li class="event__offer">
          <span class="event__offer-title">${currentOfferTitle}</span>
          +€&nbsp;
          <span class="event__offer-price">${currentOfferPrice}</span>
        </li>`
        );
      }
    }
  });
  return offersContainer;
};

const createNewRoutePointTemplate = (routePoint, destinations, offersData) => {
  const {basePrice, type, dateFrom, dateTo} = routePoint;
  const destinationPoint = destinations.filter((data) => data.id === routePoint.destination);
  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${changeDateToYearsMonthsDays(dateFrom)}">${changeDateToMonthDays(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationPoint[0].name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${changeDateFormatView(dateFrom)}">${changeDateToHoursMinutes(dateFrom)}</time>
            —
            <time class="event__end-time" datetime="${changeDateFormatView(dateTo)}">${changeDateToHoursMinutes(dateTo)}</time>
          </p>
          <p class="event__duration">${getDateDiff(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${ctreateOfferTemplate(routePoint, offersData)}
        </ul>
        <button class="event__favorite-btn event__favorite-btn--active" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class RoutePointView {
  constructor(routePoint, destinations, offersData) {
    this.routePoint = routePoint;
    this.destinations = destinations;
    this.offersData = offersData;
  }

  getTemplate() {
    return createNewRoutePointTemplate(this.routePoint, this.destinations, this.offersData);
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
