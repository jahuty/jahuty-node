import axios from 'axios';
import Client from '../../src/api/client';
import Request from '../../src/request/request';

jest.mock('axios');
beforeEach(() => { jest.clearAllMocks(); });

describe('Client', () => {
  describe('.send()', () => {
    const client = new Client({ apiKey: 'foo' });
    const request = new Request({ method: 'foo', path: 'bar' });

    beforeEach(() => { axios.create.mockImplementationOnce(() => axios); });

    describe('when the response is valid', () => {
      it('returns response', async () => {
        const response = { data: { content: 'foo' } };

        axios.request.mockImplementationOnce(() => Promise.resolve(response));

        await expect(client.send(request)).resolves.toEqual(response);
      });
    });
  });
});
