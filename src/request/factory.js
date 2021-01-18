import Request from './request';

/**
 * Builds a request from an action.
 */
export default class Factory {
  create({ action }) {
    return new Request({
      method: 'get',
      path: `/snippets/${action.id}/render`,
      params: action.params
    });
  }
}
