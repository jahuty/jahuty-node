/**
 * A base service for interacting with API resources.
 */
export default class Base {
  constructor({ client }) {
    this.client = client;
  }
}
