import Keyv from 'keyv';

import Client from '../../src/client';
import Show from '../../src/action/show';
import Snippet from '../../src/service/snippet';
import Render from '../../src/resource/render';

jest.mock('keyv');
jest.mock('./../../src/client');

describe('Snippet', () => {
  describe('.render', () => {
    describe('when the render is cached', () => {
      const render = new Render({ snippetId: 1, content: 'foo' });

      // mock a cache hit
      const cache = new Keyv();
      cache.get.mockResolvedValue(render);

      const client = new Client({ apiKey: 'foo' });
      const service = new Snippet({ client, cache });

      beforeEach(async () => { await service.render(1); });

      it('does not request action', async () => {
        expect(client.request.mock.calls).toHaveLength(0);
      });

      it('does not write to cache', async () => {
        expect(cache.set.mock.calls).toHaveLength(0);
      });
    });

    describe('when the render is not cached', () => {
      // mock a cache miss
      const cache = new Keyv();
      const client = new Client({ apiKey: 'foo' });
      const service = new Snippet({ client, cache });

      beforeEach(async () => { await service.render(1); });

      it('requests action', async () => {
        expect(client.request.mock.calls).toHaveLength(1);
      });

      it('caches render', async () => {
        expect(cache.set.mock.calls).toHaveLength(1);
      });
    });

    describe('when params do not exist', () => {
      // mock a cache miss
      const cache = new Keyv();
      const client = new Client({ apiKey: 'foo' });
      const service = new Snippet({ client, cache });

      beforeEach(async () => { await service.render(1); });

      it('requests action', () => {
        expect(client.request.mock.calls).toHaveLength(1);
      });

      it('uses empty params', () => {
        const action = new Show({ id: 1, resource: 'render', params: {} });

        expect(client.request.mock.calls[0][0]).toMatchObject(action);
      });
    });

    describe('when params do exist', () => {
      const cache = new Keyv();
      const client = new Client({ apiKey: 'foo' });
      const service = new Snippet({ client, cache });

      beforeEach(() => { service.render(1, { params: { foo: 'bar' } }); });

      it('requests action', () => {
        expect(client.request.mock.calls).toHaveLength(1);
      });

      it('uses passed params', () => {
        const action = new Show({ id: 1, resource: 'render', params: { foo: 'bar' } });

        expect(client.request.mock.calls[0][0]).toMatchObject(action);
      });
    });
  });

  describe('::getRenderCacheKey', () => {
    it('returns string', () => {
      const cacheKey = Snippet.getRenderCacheKey({ snippetId: 1, params: { foo: 'bar' } });

      expect(cacheKey).toMatch(/^jahuty_[a-f0-9]{32}$/i);
    });

    it('returns deterministic value', () => {
      const cacheKey1 = Snippet.getRenderCacheKey({ snippetId: 1, params: { foo: 'bar' } });
      const cacheKey2 = Snippet.getRenderCacheKey({ snippetId: 1, params: { foo: 'bar' } });

      expect(cacheKey1).toBe(cacheKey2);
    });

    it('returns unique value', () => {
      const cacheKey1 = Snippet.getRenderCacheKey({ snippetId: 1, params: { foo: 'bar' } });
      const cacheKey2 = Snippet.getRenderCacheKey({ snippetId: 1, params: { foo: 'baz' } });

      expect(cacheKey1).not.toBe(cacheKey2);
    });
  });
});
