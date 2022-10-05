const getRandomNumberInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const checkInitState = (obj) => {
  const data = [...Object.values(obj)];

  return data.every( (elem) => elem === true);
};

export {
  getRandomNumberInRange,
  isEscapeKey,
  checkInitState
};
