const getNewOfferStatus = (target, stateOffers) => {
  const offerId = Number([...target].pop());
  const offersList = stateOffers.slice();

  const newStateOffers = [];

  offersList.forEach( (offer) => {

    if (offer[0] === offerId) {
      offer = [offer[0], !offer[1]];
    }

    newStateOffers.push(offer);
  });

  return newStateOffers;
};

const isOptionChecked = (state) => state ? 'checked' : '';

const getOfferData = (OffersData, offerId) => {
  const offerData = OffersData.filter( (data) =>
    data.id === offerId
  );

  return [offerData[0].title, offerData[0].price];
};

const getPointAllOffersData = (offersData, pointType) => {

  let pointData = offersData.filter( (data) => data.type === pointType);
  pointData = pointData[0].offers;

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
  getNewOfferStatus,
  isOptionChecked,
  getOfferData,
  getOffersId
};
