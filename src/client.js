import Snippet from './service/snippet';
import ApiClient from './api/client';
import RequestFactory from './request/factory';
import ResourceFactory from './resource/factory';

import 'regenerator-runtime/runtime';

export default class Client {
  constructor({ apiKey }) {
    this.apiKey = apiKey;
  }

  get snippets() {
    if (this.services === undefined) this.services = new Snippet({ client: this });

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
