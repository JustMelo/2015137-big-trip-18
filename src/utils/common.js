const getRandomNumberInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {
  getRandomNumberInRange,
  isEscapeKey
};
