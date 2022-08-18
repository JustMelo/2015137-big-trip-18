import { AllOffers } from './offersData.js';
import dayjs from 'dayjs';
import { customAlphabet } from 'nanoid';
import { getRandomNumberInRange } from '../utils.js';

const OFFERS_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const TIME_COUNT = 2;
const DIVIDE_BY = 3;

const destinationsIds = [];

const nanoid = customAlphabet('1234567890');

let currentPointType;

const generateDateFrom = () => dayjs(new Date()).add(-nanoid(1), 'day').add(-nanoid(TIME_COUNT), 'hour').add(-nanoid(TIME_COUNT), 'minute').toDate();
const generateDateTo = () => dayjs(new Date()).add(nanoid(1), 'day').add(nanoid(TIME_COUNT), 'hour').add(nanoid(TIME_COUNT), 'minute').toDate();

const generateDestinationId = () => {
  const someDestinationId = nanoid(4);
  destinationsIds.push(someDestinationId);
  return someDestinationId;
};

const generateStatus = () => {
  const randomStatus = (!getRandomNumberInRange(-1, 1));
  return randomStatus;
};

const generateType = () => {
  currentPointType = OFFERS_TYPES[getRandomNumberInRange(0, OFFERS_TYPES.length - 1)];
  return currentPointType;
};

const getRandomOffersCount = () => Math.ceil(nanoid(1) / DIVIDE_BY);

const getOffers = (currentType) => {
  const offersId = [];
  const pointType = AllOffers.filter((offers) => offers.type === currentType);
  for (let i = 0; i < getRandomOffersCount(); i++) {
    if (pointType[0].offers[i]) {
      offersId.push(pointType[0].offers[i].id);
    }
  }
  return offersId;
};

export const generateRoutePoint = () => (
  {
    basePrice: getRandomNumberInRange(nanoid(1), nanoid(DIVIDE_BY)),
    dateFrom: generateDateFrom(),
    dateTo: generateDateTo(),
    destination: generateDestinationId(),
    id: nanoid(10),
    isFavorite: generateStatus(),
    type: generateType(),
    offers: getOffers(currentPointType)
  }
);

export {destinationsIds};
