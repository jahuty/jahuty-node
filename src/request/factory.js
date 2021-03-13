import Request from './request';
import Show from '../action/show';
import Index from '../action/index';

/**
 * Builds a request from an action.
 */
export default class Factory {
  static create({ action }) {
    if (action.resource !== 'render') {
      throw new TypeError('Resource is not render');
    }

    let path;

    if (action instanceof Show) {
      path = `/snippets/${action.id}/render`;
    } else if (action instanceof Index) {
      path = '/snippets/render';
    } else {
      throw new TypeError('Action is not show or index');
    }

    return new Request({ method: 'get', path, params: action.params });
  }
}
