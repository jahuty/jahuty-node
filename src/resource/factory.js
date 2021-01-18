import Render from './render'

/**
 * Builds a resource given an action and response.
 */
export default class Factory {
  create({ action, response }) {
    return new Render(response.data);
  }
}
