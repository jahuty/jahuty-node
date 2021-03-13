import crypto from 'crypto';

import Show from '../action/show';
import Base from './base';

import 'regenerator-runtime/runtime';

/**
 * Executes requests on snippet resources.
 */
export default class Snippet extends Base {
  constructor({ client, cache, ttl = null }) {
    super({ client });

    this.cache = cache;
    this.ttl = ttl;
  }

  async render(snippetId, options = {}) {
    const params = 'params' in options ? options.params : {};

    const key = Snippet.getRenderCacheKey({ snippetId, params });

    let render = await this.cache.get(key);

    if (!render) {
      const action = new Show({ id: snippetId, resource: 'render', params });

      render = this.client.request(action);

      const ttl = 'ttl' in options ? options.ttl : this.ttl;

      this.cache.set(key, render, ttl);
    }

    return render;
  }

  static getRenderCacheKey({ snippetId, params }) {
    const stringParams = JSON.stringify(params);

    const slug = `snippets/${snippetId}/render/${stringParams}`;

    const hash = crypto.createHash('md5').update(slug).digest('hex');

    return `jahuty_${hash}`;
  }
}
