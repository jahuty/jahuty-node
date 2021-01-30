import Base from './base';

/**
 * Retrieves a single resource.
 */
export default class Show extends Base {
  constructor({ resource, id, params = {} }) {
    super({ resource, params });

    this.id = id;
  }
}
