import { createAllDestinations } from '../mock/destination.js';

export default class DestinationModel {
  #destinations = createAllDestinations();

  get destinations() {
    return this.#destinations;
  }
}
