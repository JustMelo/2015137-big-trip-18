import Observable from '../framework/observable.js';
import { UpdateType, InitData } from '../const.js';

export default class OffersModel extends Observable {
  #offers = [];
  #routeApiService = null;

  constructor (routeApiService) {
    super();
    this.#routeApiService = routeApiService;
  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try
    {
      const offers = await this.#routeApiService.offers;
      this.#offers = offers;
    }
    catch (err)
    {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT, InitData.OFFERS);
  };
}
