import Axios from 'axios';
import Snippet from './snippet'

export default class Jahuty
{
  static getClient() {
    if (!Jahuty.hasKey()) {
      throw new Error('API key not set. Did you call Jahuty.setKey()?');
    }

    if (!Jahuty._client) {
      Jahuty._client = Axios.create({
        baseURL: Jahuty.ORIGIN,
        timeout: 1000,
        headers: {
          'Accept':          'application/json;q=0.9,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type':    'application/json; charset=utf-8',
          'User-Agent':      `Jahuty JS ${Jahuty.VERSION}`,
          'Authorization':   `Bearer ${Jahuty.getKey()}`
        }
      });
    }

    return Jahuty._client;
  }

  static getKey() {
    return Jahuty._key || null;
  }

  static hasKey() {
    return !!Jahuty._key;
  }

  static initialize() {
    const attribute = 'data-snippet-id';
    const snippets  = document.querySelectorAll(`[${attribute}]`);
    let   requests  = [];

    if (snippets.length) {
      snippets.forEach((snippet) => {
        const id      = snippet.getAttribute(attribute);
        const request = Snippet.render(id);

        requests.push(request);

        request.then((render) => {
          snippet.innerHTML = render.content;
        });
      });
    }

    return Promise.all(requests);
  }

  static setKey(key) {
    Jahuty._key = key;
  }
}

Jahuty.ORIGIN  = 'https://api.jahuty.com'
Jahuty.VERSION = '0.1.1'
