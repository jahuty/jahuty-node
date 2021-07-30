import crypto from 'crypto';
import merge from 'deepmerge';

import Base from './base';
import Index from '../action/index';
import Show from '../action/show';

import 'regenerator-runtime/runtime';

/**
 * Executes requests on snippet resources.
 */
export default class Snippet extends Base {
  constructor({
    client,
    cache,
    ttl = null,
    preferLatest = false,
  }) {
    super({ client });

    this.cache = cache;
    this.ttl = ttl;
    this.preferLatest = preferLatest;
  }

  async allRenders(tag, options = {}) {
    const { params, ttl, preferLatest } = this.unpackOptions(options);

    const requestParams = { tag };
    if (params) {
      requestParams.params = JSON.stringify(params);
    }
    if (preferLatest) {
      requestParams.latest = 1;
    }

    const action = new Index({ resource: 'render', params: requestParams });

    const renders = await this.client.request(action);

    if (ttl === null || ttl > 0) {
      this.cacheRenders({ renders, params, ttl });
    }

    return renders;
  }

  async render(snippetId, options = {}) {
    const {
      params,
      ttl,
      preferLatest,
      location,
    } = this.unpackOptions(options);

    const key = Snippet.getRenderCacheKey({ snippetId, params });

    let render = await this.cache.get(key);

    if (!render) {
      const requestParams = {};
      if (params) {
        requestParams.params = JSON.stringify(params);
      }
      if (preferLatest) {
        requestParams.latest = 1;
      }
      if (location) {
        requestParams.location = location;
      }

      const action = new Show({
        id: snippetId,
        resource: 'render',
        params: requestParams,
      });

      render = await this.client.request(action);

      if (ttl === null || ttl > 0) {
        this.cache.set(key, render, ttl);
      }
    }

    return render;
  }

  static getRenderCacheKey({ snippetId, params }) {
    const stringParams = JSON.stringify(params);

    const slug = `snippets/${snippetId}/render/${stringParams}`;

    const hash = crypto.createHash('md5').update(slug).digest('hex');

    return `jahuty_${hash}`;
  }

  cacheRenders({ renders, params, ttl }) {
    const globalParams = '*' in params ? params['*'] : {};

    renders.forEach((render) => {
      const paramsKey = `${render.snippetId}`;

      const localParams = paramsKey in params ? params[paramsKey] : {};

      const renderParams = merge(globalParams, localParams);

      const cacheKey = Snippet.getRenderCacheKey({
        snippetId: render.snippetId,
        params: renderParams,
      });

      this.cache.set(cacheKey, render, ttl);
    });
  }

  unpackOptions(options) {
    const defaults = {
      params: {},
      ttl: this.ttl,
      preferLatest: this.preferLatest,
      location: null,
    };

    return Object.assign(defaults, options);
  }
}
