import Factory from './../../src/resource/factory';
import Render from './../../src/resource/render';
import Show from './../../src/action/show';

describe('Factory', () => {
  let factory  = new Factory();
  let action   = new Show({ resource: 'render', id: 1 });
  let response = { data: { "content": "foo" } }

  describe('.create', () => {
    it('returns resource', () => {
      expect(factory.create({ action, response })).toBeInstanceOf(Render);
    });
  });
});
