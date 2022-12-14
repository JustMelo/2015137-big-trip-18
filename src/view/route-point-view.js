import AbstractView from '../framework/view/abstract-view.js';
import { getOfferData, getPointAllOffersData } from '../utils/offers.js';
import {
  getDurationFromDates,
  changeDateToYearsMonthsDays,
  changeDateToHoursMinutes,
  changeDateToMonthDays,
  changeFormatToFullDateTime
} from '../utils/date.js';

const getOffers = (routePoint, offersData) => routePoint.offers.map( (offer) => {

  const pointOffersData = getPointAllOffersData(offersData, routePoint.type);

  const [offerTitle, offerPrice] = getOfferData(pointOffersData, offer);

  return (
    `<li class="event__offer">
             <span class="event__offer-title">${offerTitle}</span>
             +€&nbsp;
             <span class="event__offer-price">${offerPrice}</span>
          </li>`
  );
}).join('');

const setIsFavoriteButton = (isFavorite) => {

  if (isFavorite) {
    return 'event__favorite-btn--active';
  }

  return '';
};

const createNewRoutePointTemplate = (routePoint, destinations, offersData) => {

  const {basePrice, type, dateFrom, dateTo, isFavorite} = routePoint;
  const destinationPoint = destinations.find((data) => data.id === routePoint.destination);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${changeDateToYearsMonthsDays(dateFrom)}">${changeDateToMonthDays(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationPoint.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${changeFormatToFullDateTime(dateFrom)}">${changeDateToHoursMinutes(dateFrom)}</time>
            —
            <time class="event__end-time" datetime="${changeFormatToFullDateTime(dateTo)}">${changeDateToHoursMinutes(dateTo)}</time>
          </p>
          <p class="event__duration">${getDurationFromDates(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${getOffers(routePoint, offersData)}
        </ul>
        <button class="event__favorite-btn ${setIsFavoriteButton(isFavorite)}" type="button">
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

export default class RoutePointView extends AbstractView {

  #routePoints = null;
  #destinations = null;
  #offersData = null;

  constructor(routePoints, destinations, offersData) {
    super();

    this.#routePoints = routePoints;
    this.#destinations = destinations;
    this.#offersData = offersData;
  }

  get template() {
    return createNewRoutePointTemplate(this.#routePoints, this.#destinations, this.#offersData);
  }

  setEditClickHandler = (cb) => {
    this._callback.editClick = cb;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  setFavoriteClickHandler = (cb) => {
    this._callback.favoriteClick = cb;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
