/**
 * A generic API request.
 */
export default class Request {
  constructor({ method, path, params }) {
    this.method = method;
    this.path = path;
    this.params = params;
  }
}
