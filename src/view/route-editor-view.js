import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { changeFormatToDateTime } from '../utils/date.js';
import { getTargetDestination } from '../utils/filter.js';
import { getNewOfferStatus, isOptionChecked } from '../utils/offers.js';
import dayjs from 'dayjs';

const createNewRouteEditorTemplate = (routePoint = {}, destinations, offersData) => {

  const {
    basePrice = '',
    dateFrom = dayjs(new Date()),
    dateTo = dayjs(new Date()),
    type = 'flight',
  } = routePoint;

  const currentDestination = destinations.filter((data) => data.id === routePoint.destination);

  const {description, name, pictures} = currentDestination[0];

  const getAvailableDestination = () => {
    let destinationsContainer;

    destinations.forEach( (elem) => {
      destinationsContainer += (
        `<option value="${elem.name}"></option>`
      );
    });
    return destinationsContainer;
  };

  const getOffers = () => {
    let offersContainer = '';

    let offerType = offersData.filter((data) => data.type === routePoint.type);
    offerType = offerType[0].offers;

    const offersMap = new Map(Object.entries(offerType));

    routePoint.offers.forEach( (currentOffer) => {
      let currentOfferTitle;
      let currentOfferPrice;

      for (const offer of offersMap) {
        if (offer[1].id === currentOffer[0]) {

          currentOfferTitle = offer[1].title;
          currentOfferPrice = offer[1].price;

          offersContainer += (
            `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${currentOfferTitle}-${currentOffer[0]}" type="checkbox" name="event-offer-${currentOfferTitle}" ${isOptionChecked(currentOffer[1])}>
              <label class="event__offer-label" for="event-offer-${currentOfferTitle}-${currentOffer[0]}">
                <span class="event__offer-title">${currentOfferTitle}</span>
                +€&nbsp;
                <span class="event__offer-price">${currentOfferPrice}</span>
              </label>
            </div>`
          );
        }
      }
    });
    return offersContainer;
  };

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
            <datalist id="destination-list-1">
            ${getAvailableDestination()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${changeFormatToDateTime(dateFrom)}">
            —
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${changeFormatToDateTime(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            
            <div class="event__available-offers">
            ${getOffers()}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                <img class="event__photo" src="${pictures[0].src}" alt="${pictures[0].description}">
                <img class="event__photo" src="${pictures[1].src}" alt="${pictures[1].description}">
                <img class="event__photo" src="${pictures[2].src}" alt="${pictures[2].description}">
                <img class="event__photo" src="${pictures[3].src}" alt="${pictures[3].description}">
                <img class="event__photo" src="${pictures[4].src}" alt="${pictures[4].description}">
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class RouteEditorView extends AbstractStatefulView {

  #destinations = null;
  #offers = null;

  constructor(routePoint, destinations, offers) {
    super();

    this.#destinations = destinations;
    this.#offers = offers;

    this._state = RouteEditorView.parseRoutePointDataToState(routePoint);
    this.#setInnerHandlers();
  }

  get template() {
    return createNewRouteEditorTemplate(this._state, this.#destinations, this.#offers);
  }

  reset = (routePoint) => {
    this.updateElement(RouteEditorView.parseRoutePointDataToState(routePoint));
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCancelClickHandler(this._callback.cancelClick);
    this.setEditSubmitHandler(this._callback.formSubmit);
  };

  setEditSubmitHandler = (cb) => {
    this._callback.formSubmit = cb;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setCancelClickHandler = (cb) => {
    this._callback.cancelClick = cb;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#editCancelHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
  };

  #editCancelHandler = (evt) => {
    evt.preventDefault();
    this._callback.cancelClick();
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({ type: evt.target.value });
  };

  #destinationChangeHandler = (evt) => {
    this.updateElement({ destination: getTargetDestination(evt.target.value, this.#destinations)[0].id});
  };

  #offersChangeHandler = (evt) => {
    evt.target.toggleAttribute('checked');
    this.updateElement({ offers: getNewOfferStatus(evt.target.id, this._state.offers) });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
  };

  static parseRoutePointDataToState = (routePoint) => (
    {
      ...routePoint,
      destination: routePoint.destination,
      type: routePoint.type,
      offers: routePoint.offers
    }
  );
}
