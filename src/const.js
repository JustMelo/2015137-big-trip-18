import { getOffersByType} from './mock/route-point.js';
import dayjs from 'dayjs';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890');

const INPUT_PRICE_PATTERN = /[\D]+/g;

const INVALID_DESTINATION_TEXT = 'Please select a destination from the following list';

const DESTINATIONS_MAX = 3;
const DESTINATIONS_MID = 2;
const MAX_POINTS = 10;

const UserAction = {
  UPDATE_ROUTE: 'UPDATE_ROUTE',
  ADD_ROUTE: 'ADD_ROUTE',
  DELETE_ROUTE: 'DELETE_ROUTE',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const DISABLED_ELEMENT = 'disabled';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  FUTURE: 'future',
};

const FilterText = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  FUTURE: 'There are no future events now',
};

const SortType = {
  DAY: 'sort-day',
  EVENT: 'sort-event',
  TIME: 'sort-time',
  PRICE: 'sort-price',
  OFFER: 'sort-offer',
};

const PointType = {
  FLIGHT: 'flight',
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
};

const ROUTE_BLANK = {
  basePrice: '',
  dateFrom: dayjs(new Date()),
  dateTo: dayjs(new Date()),
  destination: '',
  id: nanoid(),
  isFavorite: false,
  type: PointType.FLIGHT,
  offers: getOffersByType(PointType.FLIGHT),
};

export {
  DESTINATIONS_MAX,
  DESTINATIONS_MID,
  MAX_POINTS,
  DISABLED_ELEMENT,
  ROUTE_BLANK,
  INPUT_PRICE_PATTERN,
  INVALID_DESTINATION_TEXT,
  Mode,
  FilterType,
  FilterText,
  SortType,
  UserAction,
  UpdateType
};
