import Base from './base';

/**
 * Retrieves a collection of resources.
 */
export default class Index extends Base {
  constructor({ resource, params = {} }) {
    super({ resource, params });
  }
}
