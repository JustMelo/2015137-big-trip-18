import { ALL_OFFERS } from '../mock/offersData.js';

export default class OffersModel {
  #offers = ALL_OFFERS.slice();

  get offers() {
    return this.#offers;
  }
}
