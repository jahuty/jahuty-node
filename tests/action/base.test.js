import Base from '../../src/action/base';

describe('Base', () => {
  const resource = 'foo';
  const params = { bar: 'baz' };

  const base = new Base({ resource, params });

  describe('.resource', () => {
    it('returns resource', () => {
      expect(base.resource).toEqual(resource);
    });
  });

  describe('.params', () => {
    it('returns params', () => {
      expect(base.params).toEqual(params);
    });
  });
});
