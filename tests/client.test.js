import Axios from 'axios';
import Client from '../src/client';
import MockAdapter from 'axios-mock-adapter';
import Render from '../src/resource/render';
import Show from '../src/action/show';
import Snippet from '../src/service/snippet';

const mock = new MockAdapter(Axios);

describe('Client', () => {
  const client = new Client({ apiKey: 'foo' });

  describe('.request', () => {
    describe('when the response is success', () => {
      const action = new Show({ resource: 'render', id: 1 });
      const payload = { content: '<p>foo</p>' };

      beforeEach(() => {
        mock.onGet('/snippets/1/render').reply(200, payload);
      });

      it('returns render', async () => {
        await expect(client.request(action)).resolves.toBeInstanceOf(Render);
      });
    });
  });

  describe('.snippets', () => {
    it('returns snippet service', () => {
      expect(client.snippets).toBeInstanceOf(Snippet);
    });
  });
});
