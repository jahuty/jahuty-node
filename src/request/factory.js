import Request from './request';
import Show from '../action/show';

/**
 * Builds a request from an action.
 */
export default class Factory {
  static create({ action }) {
    if (!(action instanceof Show) || action.resource !== 'render') {
      throw new TypeError('Action expected to be show render');
    }

    return new Request({
      method: 'get',
      path: `/snippets/${action.id}/render`,
      params: action.params,
    });
  }
}
