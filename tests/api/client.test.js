import Axios from 'axios';
import BadResponse from '../../src/error/bad-response';
import Client from '../../src/api/client';
import Request from '../../src/request/request';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(Axios);

describe('Client', () => {
  const apiKey = 'foo';
  const client = new Client({ apiKey: apiKey });

  describe('.headers()', () => {
    it('has application/json content-type', () => {
      expect(client.headers()).toMatchObject({
        'Content-Type': 'application/json; charset=utf-8'
      });
    });

    it('has bearer authorization', () => {
      expect(client.headers()).toMatchObject({
        Authorization: `Bearer ${apiKey}`
      });
    })
  });

  describe('.send()', () => {
    const request = new Request({ method: 'get', path: 'foo' });
    const payload = { content: 'bar' };

    beforeEach(() => mock.reset());

    describe('when the response is a success', () => {
      beforeEach(() => {
        mock.onGet('/foo').reply(200, payload);
      });

      it('returns response', async () => {
        await expect(
          client.send(request)
        ).resolves.toMatchObject({ data: payload });
      });
    });

    describe('when the response is an error', () => {
      const payload = { status: 404, type: 'foo', detail: 'bar' };

      beforeEach(() => {
        mock.onGet('/foo').reply(404, payload);
      });

      it('raises error', async () => {
        await expect(client.send(request)).rejects.toThrow(BadResponse);
      });
    });

    describe('when set up produces an error', () => {
      beforeEach(() => {
        mock.onGet("/foo").networkError();
      });

      it('raises error', async () => {
        await expect(client.send(request)).rejects.toThrow(Error);
      });
    });
  });
});
