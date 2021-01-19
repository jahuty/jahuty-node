import Render from './render';
import Show from '../action/show';

/**
 * Builds a resource given an action and response.
 */
export default class Factory {
  static create({ action, response }) {
    if (!(action instanceof Show) || action.resource !== 'render') {
      throw new TypeError('Action expected to be show render');
    }

    return new Render(response.data);
  }
}
