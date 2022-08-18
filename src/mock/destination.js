import { destinationsIds } from '../mock/route-point.js';
import { getRandomNumberInRange } from '../utils.js';

const DESTINATION_PICTURE_COUNT = 5;

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const DESTINATION_NAMES = [
  'Wraudence',
  'Vleadtol',
  'Bluodiff',
  'Vreuhgan',
  'Midale',
  'Sadena',
  'Shonio',
  'Dolk',
  'Adenamouth',
  'Ansport'
];

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
