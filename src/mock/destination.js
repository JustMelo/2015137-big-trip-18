import { getRandomNumberInRange } from '../utils.js';

import {
  DESCRIPTIONS,
  DESTINATION_NAMES,
  destinationsIds,
  MAX_HOURS as DESTINATION_PICTURE_COUNT,
} from './const.js';

const generateDestinationPointDescription = () => {
  const generatedDescriptions = [];
  for (let i = 0; i < getRandomNumberInRange(1, DESCRIPTIONS.length); i++) {
    generatedDescriptions.push(DESCRIPTIONS[getRandomNumberInRange(0, DESCRIPTIONS.length - 1)]);
  }
  return generatedDescriptions;
};

const generateDestinationPointName = () => DESTINATION_NAMES[getRandomNumberInRange(0, DESTINATION_NAMES.length - 1)];

const getDestinationPointPicture = () => {
  const destinationPicture = `http://picsum.photos/300/200?r=${getRandomNumberInRange(0,10)}`;
  const pictureAlt = DESCRIPTIONS[getRandomNumberInRange(0, DESCRIPTIONS.length - 1)];
  return {
    src: destinationPicture,
    description: pictureAlt
  };
};

const generateDestinationPictures = () => {
  const pictureContainer = [];
  for (let i = 0; i < DESTINATION_PICTURE_COUNT; i++) {
    pictureContainer.push(getDestinationPointPicture());
  }
  return pictureContainer;
};

const generateDestinationPoint = (destinationId) => (
  {
    id: destinationId,
    description: generateDestinationPointDescription(),
    name: generateDestinationPointName(),
    pictures: generateDestinationPictures()
  }
);

export const createAllDestinations = () => {
  const destinationsArray = [];
  destinationsIds.forEach((destinationId) => {
    destinationsArray.push(generateDestinationPoint(destinationId));
  });
  return destinationsArray;
};
