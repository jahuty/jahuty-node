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
    if (this.requests === undefined) this.requests = new RequestFactory();

    const request = this.requests.create({ action });

    if (this.client === undefined) this.client = new ApiClient({ apiKey: this.apiKey });

    const response = await this.client.send(request);

    if (this.resources === undefined) this.resources = new ResourceFactory();

    return this.resources.create({ action, response });
  }
}
