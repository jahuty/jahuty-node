import Axios from 'axios';
import BadResponse from '../error/bad-response';
import Problem from '../resource/problem';
import Jahuty from '../jahuty';

import 'regenerator-runtime/runtime';

/**
 * Executes API requests and returns responses.
 */
export default class Client {
  constructor({ apiKey, baseUrl = Jahuty.BASE_URL }) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async send(request) {
    if (this.client === undefined) {
      this.client = Axios.create({
        baseURL: this.baseUrl,
        headers: this.headers(),
      });
    }

    try {
      const response = await this.client.request({
        method: request.method,
        url: request.path,
        params: request.params,
      });

      return response;
    } catch (error) {
      if (error.response) {
        throw new BadResponse(new Problem(error.response.data));
      } else {
        throw error;
      }
    }
  }

  headers() {
    return {
      Accept: 'application/json;q=0.9,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json; charset=utf-8',
      'User-Agent': `Jahuty Node SDK v${Jahuty.VERSION}`,
      Authorization: `Bearer ${this.apiKey}`,
    };
  }
}
