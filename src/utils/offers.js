const getNewOfferStatus = (target, stateOffers) => {
  const offerId = Number([...target].pop());
  const originOffers = stateOffers.slice();

  const newStateOffers = [];

  originOffers.forEach( (offer) => {

    if (offer[0] === offerId) {
      offer = [offer[0], !offer[1]];
    }

    newStateOffers.push(offer);
  });

  return newStateOffers;
};

const isOptionChecked = (state) => state === true ? 'checked' : '';

export {
  getNewOfferStatus,
  isOptionChecked
};
