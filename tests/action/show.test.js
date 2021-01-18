import Show from './../../src/action/show';

describe('Show', () => {
  const resource = 'foo';
  const id       = 1;
  const params   = { bar: 'baz' };

  const action = new Show({ resource, id, params });

  describe('.id', () => {
    it('returns id', () => {
      expect(action.id).toBe(id);
    });
  });

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
