
const updateOffer = (target, stateOffers) => {

  const index = stateOffers.findIndex( (elem) => elem === target);

  if (stateOffers.includes(target)) {
    stateOffers.splice(index, 1);

    return stateOffers;
  }

  stateOffers.push(target);

  return stateOffers;
};

const getOfferData = (offersData, offerId) => {
  const offerData = offersData.find( (data) => data.id === offerId);

  return [offerData.title, offerData.price];
};

const getPointAllOffersData = (offersData, pointType) => {

  let pointData = offersData.find( (data) => data.type === pointType);
  pointData = pointData.offers;

  return pointData;
};

const getOffersId = (offersData, pointType) => {
  const pointData = getPointAllOffersData(offersData, pointType);
  const newOffers = [];

  pointData.forEach( (elem) => newOffers.push([elem.id]) );

  return newOffers;
};

export {
  getPointAllOffersData,
  updateOffer,
  getOfferData,
  getOffersId
};
