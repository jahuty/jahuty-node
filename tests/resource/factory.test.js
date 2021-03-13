import Factory from '../../src/resource/factory';
import Render from '../../src/resource/render';
import Index from '../../src/action/index';
import Show from '../../src/action/show';

describe('Factory', () => {
  describe('::create', () => {
    describe('when resource is not render', () => {
      const action = { resource: 'foo' };
      const response = { data: { content: 'foo' } };

      it('raises error', () => {
        expect(() => {
          Factory.create({ action, response });
        }).toThrow(TypeError);
      });
    });

    describe('when response is render', () => {
      const action = new Show({ resource: 'render', id: 1 });
      const response = { data: { snippet_id: 1, content: 'foo' } };

      it('returns resource', () => {
        expect(Factory.create({ action, response })).toBeInstanceOf(Render);
      });
    });

    describe('when response is renders', () => {
      const action = new Index({ resource: 'render', id: 1 });
      const response = {
        data: [
          { snippet_id: 1, content: 'foo' },
          { snippet_id: 2, content: 'bar' },
        ],
      };

      it('returns array', () => {
        expect(Factory.create({ action, response })).toBeInstanceOf(Array);
      });
    });
  });
});
