import Factory from '../../src/request/factory';
import Request from '../../src/request/request';
import Show from '../../src/action/show';

describe('Factory', () => {
  describe('::create', () => {
    describe('when action and resource are supported', () => {
      const action = new Show({ resource: 'render', id: 1 });

      it('returns request', () => {
        expect(Factory.create({ action })).toBeInstanceOf(Request);
      });
    });

    describe('when resource is not supported', () => {
      const action = new Show({ resource: 'foo', id: 1 });

      it('throws error', () => {
        expect(() => Factory.create({ action })).toThrow(TypeError);
      });
    });

    describe('when action is not supported', () => {
      const action = { resource: 'foo', id: 1 };

      it('throws error', () => {
        expect(() => Factory.create({ action })).toThrow(TypeError);
      });
    });
  });
});
