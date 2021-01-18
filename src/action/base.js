/**
 * A base action requested by a service.
 */
export default class Base {
  constructor({ resource, params = {} }) {
    this.resource = resource;
    this.params   = params;
  }
}
