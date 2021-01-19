import Show from '../action/show';
import Base from './base';

import 'regenerator-runtime/runtime';

/**
 * Executes requests on snippet resources.
 */
export default class Snippet extends Base {
  constructor({ client }) {
    super({ client });
  }

  render(id, options = {}) {
    const params = 'params' in options ? options.params : {};

    const action = new Show({ id, resource: 'render', params });

    return this.client.request(action);
  }
}
