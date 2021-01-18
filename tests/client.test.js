import axios from 'axios';
import Client from './../src/client';
import Render from './../src/resource/render';
import Show from './../src/action/show';
import Snippet from './../src/service/snippet';

jest.mock('axios');
beforeEach(() => { jest.clearAllMocks(); });

describe('Client', () => {
  const client = new Client({ apiKey: 'foo'});

  beforeEach(() => { axios.create.mockImplementationOnce(() => axios) });

  describe('.request', () => {
    describe('when the response is success', () => {
      const action   = new Show({ resource: 'render', id: 1 });
      const response = { data: { content: 'foo' } };

      beforeEach(() => {
        axios.request.mockImplementationOnce(() => Promise.resolve(response))
      });

      it('returns render', () => {
        expect(client.request(action)).resolves.toBeInstanceOf(Render);
      });
    });
  });

  describe('.snippets', () => {
    it('returns snippet service', () => {
      expect(client.snippets).toBeInstanceOf(Snippet);
    });
  });
});
