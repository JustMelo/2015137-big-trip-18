import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const INVALID_DESTINATION_TEXT = 'Please select a destination from the following list';

const INPUT_PRICE_PATTERN = /[\D]+/g;

const DESTINATIONS_MAX = 3;
const DESTINATIONS_MID = 2;
const MAX_POINTS = 10;

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const RequestHandlers = {

  Method: {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
  },

  Type: {
    POINTS_SEND: 'points/',
    POINTS_GET: '/points',
    DESTINATIONS: '/destinations',
    OFFERS: '/offers',
  },

  RequestData: {
    AUTHORIZATION: `Basic ${nanoid()}`,
    END_POINT: 'https://18.ecmascript.pages.academy/big-trip',
  },
};


const UserAction = {
  UPDATE_ROUTE: 'UPDATE_ROUTE',
  ADD_ROUTE: 'ADD_ROUTE',
  DELETE_ROUTE: 'DELETE_ROUTE',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const InitData = {
  POINT: 'POINT',
  DESTINATIONS: 'DESTINATIONS',
  OFFERS: 'OFFERS',
};

const ButtonStateName = {
  SaveBtn: {
    SAVE: 'Save',
    SAVING: 'Saving...'
  },
  DeleteBtn: {
    CANCEL: 'Cancel',
    DELETE: 'Delete',
    DELETING: 'Deleting...'
  },
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
  id: '',
  isFavorite: false,
  type: PointType.FLIGHT,
  offers: [],
};

export {
  DESTINATIONS_MAX,
  DESTINATIONS_MID,
  MAX_POINTS,
  DISABLED_ELEMENT,
  ROUTE_BLANK,
  INPUT_PRICE_PATTERN,
  INVALID_DESTINATION_TEXT,
  ButtonStateName,
  InitData,
  TimeLimit,
  RequestHandlers,
  Mode,
  FilterType,
  FilterText,
  SortType,
  UserAction,
  UpdateType
};
