import Factory from './../../src/request/factory';
import Request from './../../src/request/request';
import Show from './../../src/action/show';

describe('Factory', () => {
  const factory = new Factory();

  describe('.create', () => {
    const action = new Show({ resource: 'render', id: 1 });

    it('returns request', () => {
      expect(factory.create({ action: action })).toBeInstanceOf(Request);
    });
  });
});
