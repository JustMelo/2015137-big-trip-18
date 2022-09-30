import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { changeFormatToDateTime, changeFormatToUtc } from '../utils/date.js';
import { getTargetDestination } from '../utils/filter.js';
import { priceValidation, checkDestination } from '../utils/validation.js';
import { getNewOfferStatus, isOptionChecked, getPointAllOffersData, getOffersId, getOfferData } from '../utils/offers.js';
import { INVALID_DESTINATION_TEXT } from '../const.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

dayjs.extend(isBetween);

const pickButtonName = (state) => state ? 'Delete' : 'Cancel';

const getInputPattern = (destinations) => {
  let destinationsPattern = '';

  destinations.map( (elem) => {
    destinationsPattern += `${elem.name}|`;
  });

  return destinationsPattern;
};

const checkButtonState = (state) => {
  if (state) {
    return `<button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>`;
  }
  return '';
};

const getDestinations = (pointType, pointName, allDestinations) => (
  `
  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${pointType}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" 
    name="event-destination" value="${he.encode(pointName)}" list="destination-list-1" required pattern="${getInputPattern(allDestinations)}">
    <datalist id="destination-list-1">
      ${allDestinations.map( (elem) => `<option hidden value="${elem.name}"></option>`).join('')}
    </datalist>
  </div>
  `
);

const getPictures = (allPictures) => allPictures.map( (picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');

const getOffers = (pointOffersData, currentPoint) => currentPoint.offers.map( (offer) => {

  const [offerId, offerStatus] = offer;
  const [offerTitle, offerPrice] = getOfferData(pointOffersData, offerId);

  return (
    `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerTitle}-${offerId}" type="checkbox" name="event-offer-${offerTitle}" ${isOptionChecked(offerStatus)}>
      <label class="event__offer-label" for="event-offer-${offerTitle}-${offerId}">
        <span class="event__offer-title">${offerTitle}</span>
          +€&nbsp;
        <span class="event__offer-price">${offerPrice}</span>
      </label>
    </div>
    `
  );
}).join('');

const getOffersTypes = (allOffers, currentPointType) => allOffers.map( (elem) => {
  const offerType = elem.type;

  return (
    `
    <div class="event__type-item">
      <input id="event-type-${offerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offerType}" ${currentPointType === offerType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${offerType}" for="event-type-${offerType}-1">${offerType}</label>
    </div>
    `
  );
}).join('');

const createNewRouteEditorTemplate = (routePoint, destinations, offersData) => {

  const {type, dateTo, dateFrom, basePrice} = routePoint;

  let editState = true;

  if (!routePoint.destination) {
    editState = false;
    routePoint.destination = destinations[0].id;

  }

  const currentDestination = destinations.filter((data) => data.id === routePoint.destination);

  const {description, name, pictures} = currentDestination[0];

  const pointOffersData = getPointAllOffersData(offersData, routePoint.type);

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

                ${getOffersTypes(offersData, type)}

              </fieldset>
            </div>
          </div>

          ${getDestinations(type, name, destinations)}

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
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${pickButtonName(editState)}</button>
          ${checkButtonState(editState)}
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            
            <div class="event__available-offers">

            ${getOffers(pointOffersData, routePoint)}

            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">

                ${getPictures(pictures)}

              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class RouteEditorView extends AbstractStatefulView {
  #datePickerFrom = null;
  #datePickerTo = null;
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

  removeElement = () => {
    super.removeElement();

    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }

    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  };

  reset = (routePoint) => {
    this.updateElement(RouteEditorView.parseRoutePointDataToState(routePoint));
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCancelClickHandler(this._callback.cancelClick);
    this.setEditSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  setEditSubmitHandler = (cb) => {
    this._callback.formSubmit = cb;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setCancelClickHandler = (cb) => {
    this._callback.cancelClick = cb;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editCancelHandler);
  };

  setDeleteClickHandler = (cb) => {
    this._callback.deleteClick = cb;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#routeDeleteClickHandler);
  };

  #dateFromChangeHandler = ([userDataFrom]) => {
    this.updateElement({
      dateFrom: changeFormatToUtc(userDataFrom),
    });
  };

  #dateToChangeHandler = ([userDateTo]) => {
    this.updateElement({
      dateTo: changeFormatToUtc(userDateTo),
    });
  };

  #setDatePicker = () => {
    const { dateFrom, dateTo } = this._state;
    const startDate = this.element.querySelector('#event-start-time-1');
    const endDate = this.element.querySelector('#event-end-time-1');

    this.#datePickerFrom = flatpickr(
      startDate,
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        defaultDate: changeFormatToDateTime(dateFrom),
        onChange: this.#dateFromChangeHandler,
        minDate: 'today',
      },
    );

    this.#datePickerTo = flatpickr(
      endDate,
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        defaultDate: changeFormatToDateTime(dateTo),
        onChange: this.#dateToChangeHandler,
        minDate: this.#datePickerFrom.selectedDates[0],
      },
    );

    this.#datePickerFrom.config.onChange.push( () => {
      this.#datePickerTo.set('minDate', this.#datePickerFrom.selectedDates[0] );
    } );

    if (dayjs(this.#datePickerFrom.selectedDates[0] ).isAfter(dayjs(this.#datePickerTo.selectedDates[0] ) ) ) {
      this.#datePickerTo.setDate(this.#datePickerFrom.selectedDates[0] );
    }

  };

  #priceFieldlistener = (evt) => {
    this.value = priceValidation(evt.target.value);
    this.updateElement( {
      basePrice: priceValidation(evt.target.value),
    } );
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(RouteEditorView.parseStateToRoutePoint(this._state));
  };

  #editCancelHandler = (evt) => {
    evt.preventDefault();
    this._callback.cancelClick();
  };

  #routeDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(RouteEditorView.parseStateToRoutePoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    this.updateElement(
      {
        type: evt.target.value,
        offers: getOffersId(this.#offers, evt.target.value),
      });
  };

  #destinationChangeHandler = (evt) => {
    if (!checkDestination(evt.target.value, this.#destinations)) {
      this.element.querySelector('.event__input--destination').setCustomValidity(INVALID_DESTINATION_TEXT);
      this.value = evt.target.defaultValue;
      return;
    }
    this.element.querySelector('.event__input--destination').setCustomValidity('');
    this.updateElement( { destination: getTargetDestination(evt.target.value, this.#destinations)[0].id });
  };

  #offersChangeHandler = (evt) => {
    evt.target.toggleAttribute('checked');
    this.updateElement({ offers: getNewOfferStatus(evt.target.id, this._state.offers) });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('blur', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceFieldlistener);
    this.#setDatePicker();
  };

  static parseRoutePointDataToState = (routePoint) => (
    {...routePoint}
  );

  static parseStateToRoutePoint = (state) => {
    const routPoint = {...state};
    return routPoint;
  };
}
