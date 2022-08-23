import { ALL_OFFERS } from './offersData.js';
import { customAlphabet } from 'nanoid';
import { getRandomNumberInRange } from '../utils.js';
import dayjs from 'dayjs';
import { MAX_POINTS, DESTINATIONS_MID as MIN_POINTS } from '../const.js';

import {
  OFFERS_TYPES,
  DIVIDE_BY,
  destinationsIds,
  MAX_DAYS,
  MAX_HOURS,
  MAX_MINUTES,
  POINT_ID_LENGTH,
  DESTINATION_ID_LENGTH
} from './const.js';

const nanoid = customAlphabet('1234567890');

let currentPointType;

const generateDateFrom = () => dayjs(new Date()).subtract(getRandomNumberInRange(0, MAX_HOURS), 'hour').subtract(getRandomNumberInRange(0, MAX_MINUTES), 'minute').toDate();
const generateDateTo = () => dayjs(new Date()).add(getRandomNumberInRange(0, MAX_DAYS), 'day').add(getRandomNumberInRange(0, MAX_MINUTES), 'minute').toDate();

const generateDestinationId = () => {
  const someDestinationId = nanoid(DESTINATION_ID_LENGTH);
  destinationsIds.push(someDestinationId);
  return someDestinationId;
};

const generateStatus = () => (!getRandomNumberInRange(-1, 1));

const generateType = () => {
  currentPointType = OFFERS_TYPES[ getRandomNumberInRange(0, OFFERS_TYPES.length - 1) ];
  return currentPointType;
};

const getOffersCount = () => Math.ceil(nanoid(1) / DIVIDE_BY);

const getOffersByType = () => {
  let pointType = ALL_OFFERS.filter((offers) => offers.type === currentPointType);
  pointType = pointType[0];

  if (pointType.offers) {
    return getRandomNumberInRange(1, pointType.offers.length);
  }
};

const getOffers = () => new Set(
  new Array(getOffersCount()).fill(null).map( () => (
    getOffersByType()
  ))
);

const generateRoutePoint = () => (
  {
    basePrice: getRandomNumberInRange( nanoid(1), nanoid(DIVIDE_BY) ),
    dateFrom: generateDateFrom(),
    dateTo: generateDateTo(),
    destination: generateDestinationId(),
    id: nanoid(POINT_ID_LENGTH),
    isFavorite: generateStatus(),
    type: generateType(),
    offers: getOffers()
  }
);

export const createRoutePoints = () => {

  if (generateStatus()) {
    return Array.from({length: getRandomNumberInRange(MIN_POINTS, MAX_POINTS)}, generateRoutePoint);

  } else {
    return [];
  }
};
