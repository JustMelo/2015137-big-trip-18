const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const checkInitState = (obj) => {
  const data = [...Object.values(obj)];

  return data.every( (elem) => elem === true);
};

export {
  isEscapeKey,
  checkInitState
};
