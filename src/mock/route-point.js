import { ALL_OFFERS } from './offersData.js';
import { customAlphabet } from 'nanoid';
import { getRandomNumberInRange } from '../utils/common.js';
import { MAX_POINTS, DESTINATIONS_MID as MIN_POINTS } from '../const.js';
import dayjs from 'dayjs';

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

let startDate;

const generateStatus = () => (!getRandomNumberInRange(-1, 1));

const generateDateFrom = () => {
  let generatedDate = '';

  if (generateStatus()) {
    generatedDate = dayjs(new Date()).
      subtract(getRandomNumberInRange(0, MAX_DAYS), 'day').
      subtract(getRandomNumberInRange(0, MAX_HOURS), 'hour').
      subtract(getRandomNumberInRange(0, MAX_MINUTES), 'minute').
      toDate();

    startDate = generatedDate;
    return generatedDate;
  }

  generatedDate = dayjs(new Date()).
    add(getRandomNumberInRange(0, MAX_DAYS), 'day').
    add(getRandomNumberInRange(0, MAX_HOURS), 'hour').
    add(getRandomNumberInRange(0, MAX_MINUTES), 'minute').
    toDate();
  startDate = generatedDate;
  return generatedDate;
};

const generateDateTo = (fromDate) => dayjs(fromDate).
  add(getRandomNumberInRange(0, MAX_DAYS), 'day').
  add(getRandomNumberInRange(0, MAX_HOURS), 'hour').
  add(getRandomNumberInRange(0, MAX_MINUTES), 'minute');

const generateDestinationId = () => {
  const destinationId = nanoid(DESTINATION_ID_LENGTH);
  destinationsIds.push(destinationId);
  return destinationId;
};

const generateType = () => {
  currentPointType = OFFERS_TYPES[ getRandomNumberInRange(0, OFFERS_TYPES.length - 1) ];
  return currentPointType;
};

const getOffersByType = () => {
  const pointOffers = [];
  let pointType = ALL_OFFERS.filter((offers) => offers.type === currentPointType);
  pointType = pointType[0];

  if (pointType.offers) {
    pointType.offers.forEach((elem) => {
      pointOffers.push([elem.id, generateStatus()]);
    });
    return pointOffers;
  }
};

const generateRoutePoint = () => (
  {
    basePrice: getRandomNumberInRange( nanoid(1), nanoid(DIVIDE_BY) ),
    dateFrom: generateDateFrom(),
    dateTo: generateDateTo(startDate),
    destination: generateDestinationId(),
    id: nanoid(POINT_ID_LENGTH),
    isFavorite: generateStatus(),
    type: generateType(),
    offers: getOffersByType()
  }

);

export const createRoutePoints = () => {

  if (generateStatus()) {
    return Array.from({length: getRandomNumberInRange(MIN_POINTS, MAX_POINTS)}, generateRoutePoint);
  }

  return [];
};
