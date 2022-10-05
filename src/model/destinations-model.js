import Observable from '../framework/observable.js';
import { UpdateType, InitData, InitDataError } from '../const.js';

export default class DestinationModel extends Observable {
  #destinations = [];
  #routeApiService = null;

  constructor (routeApiService) {
    super();
    this.#routeApiService = routeApiService;

  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try
    {
      const destinations = await this.#routeApiService.destinations;
      this.#destinations = destinations;
      this._notify(UpdateType.INIT, InitData.DESTINATIONS);
    }
    catch(err)
    {
      this.#destinations = [];
      this._notify(UpdateType.INIT, InitDataError.DESTINATIONS);
    }
  };
}
