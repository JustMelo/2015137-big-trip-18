import { getRandomNumberInRange } from '../utils.js';

import {
  DESCRIPTIONS,
  DESTINATION_NAMES,
  destinationsIds,
  MAX_HOURS as DESTINATION_PICTURE_COUNT,
} from './const.js';

const generateDestinationPointDescription = () => new Array(DESTINATION_PICTURE_COUNT).fill(DESCRIPTIONS[getRandomNumberInRange(0, DESCRIPTIONS.length - 1)]);

const generateDestinationPointName = () => DESTINATION_NAMES[getRandomNumberInRange(0, DESTINATION_NAMES.length - 1)];

const getDestinationPicture = () => `http://picsum.photos/300/200?r=${getRandomNumberInRange(0,10)}`;

const getPictureDescription = () => DESCRIPTIONS[getRandomNumberInRange(0, DESCRIPTIONS.length - 1)];

const generateDestinationPictures = () => new Array(DESTINATION_PICTURE_COUNT).fill(null).map(() => (
  {
    src: getDestinationPicture(),
    description: getPictureDescription()
  }
));

const getDestinationId = () => destinationsIds.pop();

export const createAllDestinations = () => new Array(destinationsIds.length).fill(null).map(() => (
  {
    id: getDestinationId(),
    description: generateDestinationPointDescription(),
    name: generateDestinationPointName(),
    pictures: generateDestinationPictures()
  }
));
