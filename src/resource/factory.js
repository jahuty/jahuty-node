import Render from './render';

/**
 * Builds a resource (or collection) given an action and response.
 */
export default class Factory {
  static create({ action, response }) {
    if (action.resource !== 'render') {
      throw new TypeError('Resource is not render');
    }

    let result;

    if (Array.isArray(response.data)) {
      result = response.data.map((data) => Render.from(data));
    } else {
      result = Render.from(response.data);
    }

    return result;
  }
}
