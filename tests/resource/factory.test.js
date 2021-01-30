import Base from '../../src/action/base';
import Factory from '../../src/resource/factory';
import Render from '../../src/resource/render';
import Show from '../../src/action/show';

describe('Factory', () => {
  const response = { data: { content: 'foo' } };

  describe('::create', () => {
    describe('when action is not show-render', () => {
      const action = new Base({ resource: 'foo' });

      it('raises error', () => {
        expect(() => {
          Factory.create({ action, response });
        }).toThrow(TypeError);
      });
    });

    describe('when action is show-render', () => {
      const action = new Show({ resource: 'render', id: 1 });

      it('returns resource', () => {
        expect(Factory.create({ action, response })).toBeInstanceOf(Render);
      });
    });
  });
});
