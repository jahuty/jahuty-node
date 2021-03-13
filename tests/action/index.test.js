import Index from '../../src/action/index';

describe('Index', () => {
  const resource = 'foo';
  const params = { bar: 'baz' };

  const action = new Index({ resource, params });

  describe('.params', () => {
    it('returns params', () => {
      expect(action.params).toBe(params);
    });
  });

  describe('.resource', () => {
    it('returns resource', () => {
      expect(action.resource).toBe(resource);
    });
  });
});
