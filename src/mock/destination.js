import { getRandomNumberInRange } from '../utils/common.js';

import {
  DESCRIPTIONS,
  DESTINATION_NAMES,
  THEMES,
  destinationsIds,
  DESTINATION_ID_LENGTH as DESTINATION_PICTURE_COUNT,
} from './const.js';

const getDescription = () => DESCRIPTIONS[getRandomNumberInRange(0, DESCRIPTIONS.length - 1)];

const generateDestinationPointDescription = () => new Array(DESTINATION_PICTURE_COUNT).fill(getDescription());

const generateDestinationPointName = () => DESTINATION_NAMES[getRandomNumberInRange(0, DESTINATION_NAMES.length - 1)];

const getDestinationPicture = () => `https://source.unsplash.com/random/300x200/?${THEMES[getRandomNumberInRange(0, THEMES.length - 1)]}`;

const generateDestinationPictures = () => [...new Array(DESTINATION_PICTURE_COUNT)].map(() => (
  {
    src: getDestinationPicture(),
    description: getDescription()
  }
));

const getDestinationId = () => destinationsIds.pop();

export const createAllDestinations = () => [...new Array(destinationsIds.length)].map(() => (
  {
    id: getDestinationId(),
    description: generateDestinationPointDescription(),
    name: generateDestinationPointName(),
    pictures: generateDestinationPictures()
  }
));
