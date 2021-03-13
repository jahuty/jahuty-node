import Keyv from 'keyv';

import Snippet from './service/snippet';
import ApiClient from './api/client';
import RequestFactory from './request/factory';
import ResourceFactory from './resource/factory';

import 'regenerator-runtime/runtime';

export default class Client {
  constructor({ apiKey, cache = null, ttl = null }) {
    this.apiKey = apiKey;
    this.cache = cache || new Keyv({ namespace: 'jahuty' });
    this.ttl = ttl;
  }

  get snippets() {
    if (this.services === undefined) {
      this.services = new Snippet({ client: this, cache: this.cache, ttl: this.ttl });
    }

    return this.services;
  }

  async request(action) {
    const request = RequestFactory.create({ action });

    if (this.client === undefined) {
      this.client = new ApiClient({ apiKey: this.apiKey });
    }

    const response = await this.client.send(request);

    return ResourceFactory.create({ action, response });
  }
}
