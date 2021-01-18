import Client from './../../src/client';
import Show from './../../src/action/show';
import Snippet from './../../src/service/snippet';

jest.mock('./../../src/client');
beforeEach(() => { jest.clearAllMocks(); });

describe('Snippet', () => {
  describe('.render', () => {
    const client  = new Client({ apiKey: 'foo' });
    const service = new Snippet({ client: client });

    describe('when params do not exist', () => {
      beforeEach(() => { service.render(1); });

      it('requests action', () => {
        expect(client.request.mock.calls.length).toBe(1);
      });

      it('uses empty params', () => {
        const action = new Show({ id: 1, resource: 'render', params: {} });

        expect(client.request.mock.calls[0][0]).toMatchObject(action);
      });
    });

    describe('when params do not exist', () => {
      beforeEach(() => { service.render(1, { params: { foo: 'bar' } }); });

      it('requests action', () => {
        expect(client.request.mock.calls.length).toBe(1);
      });

      it('uses passed params', () => {
        const action = new Show({ id: 1, resource: 'render', params: { foo: 'bar' } });

        expect(client.request.mock.calls[0][0]).toMatchObject(action);
      });
    });
  });
})
