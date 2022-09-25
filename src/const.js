const DESTINATIONS_MAX = 3;
const DESTINATIONS_MID = 2;
const MAX_POINTS = 10;

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

export {DESTINATIONS_MAX, DESTINATIONS_MID, MAX_POINTS, DISABLED_ELEMENT, Mode, FilterType, FilterText, SortType};
